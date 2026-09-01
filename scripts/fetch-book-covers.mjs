import { readFile, writeFile } from "node:fs/promises";

const source = await readFile(new URL("../src/booksData.ts", import.meta.url), "utf8");
const raw = source.match(/const rawBooks = `([\s\S]*?)`\.trim/)[1].trim();
const books = raw.split("\n").map((entry) => {
  const separator = entry.lastIndexOf(" — ");
  return { title: entry.slice(0, separator), author: entry.slice(separator + 3) };
});
const covers = {};

for (const [index, book] of books.entries()) {
  try {
    const author = book.author.replace(/^(edited by|translated by) /, "").split(/[,&]/)[0];
    const query = `title:"${book.title}" author:"${author}"`;
    const search = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=1&fields=cover_i`, {
      headers: { "user-agent": "nickwoods1.github.io bookshelf cover lookup" },
    });
    const result = await search.json();
    let cover = result.docs?.[0]?.cover_i;
    if (!cover) {
      const fallback = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(book.title)}&limit=1&fields=cover_i`, {
        headers: { "user-agent": "nickwoods1.github.io bookshelf cover lookup" },
      });
      cover = (await fallback.json()).docs?.[0]?.cover_i;
    }
    if (!cover) throw new Error("no cover found");
    covers[index + 1] = `https://covers.openlibrary.org/b/id/${cover}-M.jpg`;
    console.error(`${index + 1}/${books.length} ${book.title}`);
  } catch (error) {
    console.error(`SKIP ${index + 1} ${book.title}: ${error.message}`);
  }
  await new Promise((resolve) => setTimeout(resolve, 400));
}
const output = new URL("../src/bookCovers.ts", import.meta.url);
await writeFile(output, `export const bookCovers: Record<number, string> = ${JSON.stringify(covers, null, 2)};\n`);
console.log(`Saved ${Object.keys(covers).length}/${books.length} cover links.`);
