import { cpSync, rmSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");

const SKIP = new Set(["node_modules", "dist", ".git"]);

if (existsSync(dist)) rmSync(dist, { recursive: true });
mkdirSync(dist, { recursive: true });

for (const name of readdirSync(root)) {
  if (SKIP.has(name)) continue;
  const src = join(root, name);
  const dest = join(dist, name);
  cpSync(src, dest, { recursive: true });
}

console.log("Build complete: output in dist/");
console.log("  Preview: npm run preview");
