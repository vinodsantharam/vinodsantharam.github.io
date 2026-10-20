// Prints /resume from the static export into PDFs, so the downloadable
// resume always matches the page. Run after `npm run build`:
//   npm run pdf
// In CI, install the browser first: npx playwright install --with-deps chromium
// Locally you can point at an existing Chromium with CHROMIUM_PATH.
import { createServer } from "node:http";
import { readFile, stat, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";

const OUT = join(process.cwd(), "out");
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".txt": "text/plain",
};

async function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(
    /^(\.\.[/\\])+/,
    "",
  );
  let file = join(OUT, clean);
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
  } catch {
    file = `${file}.html`;
  }
  return file;
}

const server = createServer(async (req, res) => {
  try {
    const file = await resolveFile(req.url ?? "/");
    const body = await readFile(file);
    res.writeHead(200, {
      "content-type": TYPES[extname(file)] ?? "application/octet-stream",
    });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH }
    : {},
);

try {
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${port}/resume/`, {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => document.fonts.ready);

  // One download, always the full story. The _full name was linked
  // before; it keeps working as a copy.
  await page.getByRole("button", { name: /^Full story/ }).click();
  const pdf = await page.pdf({ format: "A4", preferCSSPageSize: true });
  for (const file of [
    "vinod_santharam_resume.pdf",
    "vinod_santharam_resume_full.pdf",
  ]) {
    await writeFile(join(OUT, file), pdf);
    console.log(`Wrote out/${file}`);
  }
} finally {
  await browser.close();
  server.close();
}
