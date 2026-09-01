import { mkdir, readFile, writeFile } from "node:fs/promises";

const data = await readFile(new URL("../src/tvData.ts", import.meta.url), "utf8");
const titles = [...data.matchAll(/title: ("(?:[^"\\]|\\.)*")/g)].map((match) => JSON.parse(match[1]));
const directory = new URL("../public/posters/", import.meta.url);
await mkdir(directory, { recursive: true });

for (const [index, title] of titles.entries()) {
  const output = new URL(`${index + 1}.jpg`, directory);
  try {
    const response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(title)}`);
    if (!response.ok) throw new Error(`show search: ${response.status}`);
    const show = await response.json();
    const image = show.image?.medium ?? show.image?.original;
    if (!image) throw new Error("no poster image");
    const poster = await fetch(image);
    if (!poster.ok) throw new Error(`poster: ${poster.status}`);
    await writeFile(output, Buffer.from(await poster.arrayBuffer()));
    console.log(`${index + 1}/${titles.length} ${title}`);
  } catch (error) {
    console.warn(`SKIP ${index + 1} ${title}: ${error.message}`);
  }
  await new Promise((resolve) => setTimeout(resolve, 600));
}
