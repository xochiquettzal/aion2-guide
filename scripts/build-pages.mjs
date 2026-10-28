import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, copyFileSync, writeFileSync } from "node:fs";
import path from "node:path";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
if (basePath && !/^\/[A-Za-z0-9._-]+$/.test(basePath))
  throw new Error("NEXT_PUBLIC_BASE_PATH boş veya /depo-adi biçiminde olmalı.");
const result = spawnSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      STATIC_EXPORT: "true",
      NEXT_PUBLIC_BASE_PATH: basePath,
    },
  },
);
if (result.status !== 0) process.exit(result.status || 1);
// Windows can export segment prefetch files into nested folders while the
// browser requests dot-separated names. Keep both forms on every host.
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)],
  );
}
let aliases = 0;
for (const file of files("out")) {
  const parts = path.relative("out", file).split(path.sep);
  const segment = parts.findIndex((p) => p.startsWith("__next."));
  if (segment >= 0 && segment < parts.length - 1) {
    const target = path.join(
      "out",
      ...parts.slice(0, segment),
      parts.slice(segment).join("."),
    );
    if (!existsSync(target)) {
      copyFileSync(file, target);
      aliases++;
    }
  }
}
writeFileSync("out/.nojekyll", "");
writeFileSync("out/pages-preview.json", JSON.stringify({ basePath }));
console.log(
  `GitHub Pages çıktısı hazır: out/ (${aliases} segment yolu düzeltildi).`,
);
