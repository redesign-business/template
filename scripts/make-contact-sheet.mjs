import { spawn } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [manifestPath, outputStem] = process.argv.slice(2);
if (!manifestPath || !outputStem) {
  throw new Error("Usage: node scripts/make-contact-sheet.mjs <manifest.json> <output-stem>");
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
if (!Array.isArray(manifest.images) || manifest.images.length === 0) {
  throw new Error(`${manifestPath} must contain a non-empty images array`);
}

const pageSize = 48;
const outputPaths = [];
for (let offset = 0; offset < manifest.images.length; offset += pageSize) {
  const page = Math.floor(offset / pageSize) + 1;
  const images = await Promise.all(manifest.images.slice(offset, offset + pageSize).map(loadImage));
  const htmlPath = resolve(`${outputStem}-${page}.html`);
  const outputPath = resolve(`${outputStem}-${page}.png`);
  await mkdir(dirname(htmlPath), { recursive: true });
  await writeFile(htmlPath, contactSheetHtml(images));
  await screenshot(htmlPath, outputPath);
  await rm(htmlPath);
  outputPaths.push(outputPath);
}

console.log(outputPaths.join("\n"));

async function loadImage(image, index) {
  const id = String(image.id ?? image.slug ?? `item_${index + 1}`);
  const label = String(image.label ?? image.name ?? image.nearestHeading ?? image.alt ?? id);
  if (image.sourceUrl && !image.localPath) {
    const response = await fetch(image.sourceUrl);
    if (!response.ok) throw new Error(`Could not download ${id}: ${response.status}`);
    const contentType = response.headers.get("content-type")?.split(";")[0] || "image/png";
    return { id, label, dataUrl: `data:${contentType};base64,${Buffer.from(await response.arrayBuffer()).toString("base64")}` };
  }
  if (!image.localPath) throw new Error(`${id} needs localPath or sourceUrl`);
  const path = resolve(image.localPath);
  const contentType = image.contentType || mimeType(path);
  return { id, label, dataUrl: `data:${contentType};base64,${(await readFile(path)).toString("base64")}` };
}

function contactSheetHtml(images) {
  const tiles = images.map(({ id, label, dataUrl }) => `
    <figure>
      <div class="image"><img src="${dataUrl}" alt=""></div>
      <figcaption><strong>${escapeHtml(id)}</strong><span>${escapeHtml(label)}</span></figcaption>
    </figure>`).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    *{box-sizing:border-box}body{margin:0;padding:16px;background:#eee;font:14px/1.25 Arial,sans-serif;color:#111}
    main{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}figure{margin:0;overflow:hidden;background:#fff;border:2px solid #111;border-radius:6px}
    .image{height:180px;display:flex;align-items:center;justify-content:center;background:#ddd}img{width:100%;height:100%;object-fit:contain}
    figcaption{display:flex;gap:8px;min-height:44px;padding:7px 8px;border-top:2px solid #111}strong{flex:none}span{overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
  </style></head><body><main>${tiles}</main></body></html>`;
}

function screenshot(htmlPath, outputPath) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn("playwright", ["screenshot", "--browser", "chromium", "--viewport-size", "1800,1200", "--full-page", pathToFileURL(htmlPath).href, outputPath], { stdio: "inherit" });
    child.on("error", reject);
    child.on("close", (code) => code === 0 ? resolvePromise() : reject(new Error(`playwright screenshot exited with ${code}`)));
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function mimeType(path) {
  return ({ ".avif": "image/avif", ".gif": "image/gif", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp" })[extname(path).toLowerCase()] || "application/octet-stream";
}
