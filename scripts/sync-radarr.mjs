import { mkdir, readFile, writeFile } from "node:fs/promises";

const radarrUrl = process.env.RADARR_URL?.replace(/\/$/, "");
const apiKey = process.env.RADARR_API_KEY;
const dataFile = new URL("../src/movieData.ts", import.meta.url);
const posterDirectory = new URL("../public/movie-posters/", import.meta.url);

const posterUrlForWeb = (url) => url?.replace(/\/t\/p\/(?:original|w\d+)\//, "/t/p/w500/");

if (!radarrUrl || !apiKey) {
  console.error("Set RADARR_URL and RADARR_API_KEY before running this command.");
  process.exit(1);
}

const response = await fetch(`${radarrUrl}/api/v3/movie`, {
  headers: { "X-Api-Key": apiKey },
});
if (!response.ok) throw new Error(`Radarr returned ${response.status} ${response.statusText}`);

const source = await readFile(dataFile, "utf8");
const ratings = new Map(
  [...source.matchAll(/tmdbId: (\d+),[\s\S]*?rating: (null|[\d.]+)/g)].map((match) => [Number(match[1]), match[2] === "null" ? null : Number(match[2])]),
);
const radarrMovies = await response.json();
const movies = radarrMovies
  .filter((movie) => Number.isInteger(movie.tmdbId))
  .map((movie) => ({
    tmdbId: movie.tmdbId,
    title: movie.title,
    year: Number.isInteger(movie.year) ? movie.year : null,
    addedOn: movie.added ? movie.added.slice(0, 10) : null,
    rating: ratings.get(movie.tmdbId) ?? null,
    posterUrl: posterUrlForWeb(movie.images?.find((image) => image.coverType === "poster")?.remoteUrl),
  }))
  .sort((first, second) => first.title.localeCompare(second.title));

await mkdir(posterDirectory, { recursive: true });
let downloaded = 0;
for (const movie of movies) {
  if (!movie.posterUrl) continue;
  try {
    const poster = await fetch(movie.posterUrl);
    if (!poster.ok) throw new Error(String(poster.status));
    await writeFile(new URL(`${movie.tmdbId}.jpg`, posterDirectory), Buffer.from(await poster.arrayBuffer()));
    downloaded += 1;
  } catch (error) {
    console.warn(`Could not download poster for ${movie.title}: ${error.message}`);
  }
}

const entries = movies.map(({ posterUrl, ...movie }) => `  ${JSON.stringify(movie)},`).join("\n");
await writeFile(dataFile, `export type Movie = {\n  tmdbId: number;\n  title: string;\n  year: number | null;\n  addedOn: string | null;\n  rating: number | null;\n};\n\n// Generated locally from Radarr with \`npm run radarr:sync\`.\n// Personal ratings are retained when the catalogue is synced again.\nexport const movies: Movie[] = [\n${entries}\n];\n`);
console.log(`Synced ${movies.length} Radarr films; downloaded ${downloaded} posters.`);
