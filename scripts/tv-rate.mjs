import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";

const host = "127.0.0.1";
const port = 5175;
const dataFile = new URL("../src/tvData.ts", import.meta.url);
const posterDirectory = new URL("../public/posters/", import.meta.url);

const readShows = async () => {
  const source = await readFile(dataFile, "utf8");
  return [...source.matchAll(/\{ id: (\d+), watchedOn: "([^"]+)", title: ("(?:[^"\\]|\\.)*"), rating: (null|[\d.]+) \}/g)].map((match) => ({
    id: Number(match[1]),
    watchedOn: match[2],
    title: JSON.parse(match[3]),
    rating: match[4] === "null" ? null : Number(match[4]),
  }));
};

const send = (response, status, body, type = "application/json") => {
  response.writeHead(status, { "content-type": `${type}; charset=utf-8`, "cache-control": "no-store" });
  response.end(typeof body === "string" ? body : JSON.stringify(body));
};

const page = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>TV rating mode</title><style>
*{box-sizing:border-box}body{margin:0;background:#14181c;color:#d8e0e8;font:16px Arial,sans-serif}.app{max-width:760px;margin:auto;padding:32px 20px}.top{display:flex;justify-content:space-between;color:#9aa5b1;font-size:13px;text-transform:uppercase}.card{margin-top:24px;display:grid;grid-template-columns:220px 1fr;gap:28px}.poster{width:100%;aspect-ratio:2/3;object-fit:cover;background:#2b333b}.date{color:#9aa5b1;font-size:13px}.title{font-size:clamp(2rem,8vw,4rem);line-height:.95;margin:12px 0 22px;color:#fff}.rating{display:flex;gap:4px}.rating button{background:none;border:0;color:#59636d;cursor:pointer;font-size:42px;line-height:1;padding:0}.rating button.full{color:#00e054}.rating button.half{background:linear-gradient(90deg,#00e054 50%,#59636d 50%);background-clip:text;color:transparent}.rating button:focus-visible,.nav button:focus-visible{outline:2px solid #fff;outline-offset:3px}.controls{display:flex;gap:10px;margin-top:28px}.nav{display:flex;justify-content:space-between;margin-top:28px}.nav button,.clear{background:#20272d;border:1px solid #4a545e;color:#d8e0e8;cursor:pointer;padding:10px 14px}.clear{margin-top:15px}.saved{color:#00e054;font-size:13px;height:16px;margin-top:14px}@media(max-width:560px){.card{grid-template-columns:1fr}.poster{max-width:240px}.app{padding-top:20px}}
</style></head><body><main class="app"><div class="top"><span>local rating mode</span><span id="count"></span></div><section class="card"><img id="poster" class="poster"><div><div id="date" class="date"></div><h1 id="title" class="title"></h1><div id="rating" class="rating"></div><button class="clear" id="clear">Not rated</button><div class="saved" id="saved"></div></div></section><div class="nav"><button id="previous">← Previous</button><button id="next">Next →</button></div></main><script>
let shows=[],position=0;const $=id=>document.getElementById(id);const rating=$('rating');
function render(){const show=shows[position];$('count').textContent=(position+1)+' / '+shows.length;$('date').textContent=show.watchedOn;$('title').textContent=show.title;$('poster').src='/posters/'+show.id+'.jpg';$('saved').textContent='';rating.innerHTML='';for(let star=1;star<=5;star++){const b=document.createElement('button'),value=show.rating??0;b.textContent='★';b.className=value>=star?'full':value===star-.5?'half':'';b.setAttribute('aria-label','Rate '+star+' stars');b.onclick=e=>{const rect=b.getBoundingClientRect();save(star-(e.clientX-rect.left<rect.width/2?.5:0))};rating.append(b)}}
async function save(value){const show=shows[position];const r=await fetch('/api/rating',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({id:show.id,rating:value})});if(!r.ok){$('saved').textContent='Could not save';return}show.rating=value;$('saved').textContent='Saved to src/tvData.ts';render()}
$('previous').onclick=()=>{position=(position+shows.length-1)%shows.length;render()};$('next').onclick=()=>{position=(position+1)%shows.length;render()};$('clear').onclick=()=>save(null);document.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')$('previous').click();if(e.key==='ArrowRight')$('next').click()});
fetch('/api/shows').then(r=>r.json()).then(data=>{shows=data;render()});
</script></body></html>`;

createServer(async (request, response) => {
  const url = new URL(request.url, `http://${host}:${port}`);
  if (request.method === "GET" && url.pathname === "/") return send(response, 200, page, "text/html");
  if (request.method === "GET" && url.pathname === "/api/shows") return send(response, 200, await readShows());
  if (request.method === "GET" && /^\/posters\/\d+\.jpg$/.test(url.pathname)) {
    try { return send(response, 200, await readFile(new URL(url.pathname.split("/").pop(), posterDirectory)), "image/jpeg"); }
    catch { return send(response, 404, "Not found", "text/plain"); }
  }
  if (request.method === "POST" && url.pathname === "/api/rating") {
    let raw = "";
    for await (const chunk of request) raw += chunk;
    try {
      const { id, rating } = JSON.parse(raw);
      if (!Number.isInteger(id) || !(rating === null || (rating >= 0.5 && rating <= 5 && rating * 2 === Math.round(rating * 2)))) throw new Error("Invalid rating");
      const source = await readFile(dataFile, "utf8");
      const pattern = new RegExp(`(id: ${id},[^\\n]+rating: )(null|[\\d.]+)`);
      if (!pattern.test(source)) throw new Error("Show not found");
      await writeFile(dataFile, source.replace(pattern, `$1${rating === null ? "null" : rating}`));
      return send(response, 200, { ok: true });
    } catch (error) { return send(response, 400, { error: error.message }); }
  }
  send(response, 404, "Not found", "text/plain");
}).listen(port, host, () => console.log(`TV rating mode: http://${host}:${port}`));
