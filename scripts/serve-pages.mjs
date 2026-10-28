import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("out");
const { basePath } = JSON.parse(
  await readFile(path.join(root, "pages-preview.json"), "utf8"),
);
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
};
http
  .createServer(async (req, res) => {
    try {
      let url = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      if (url === basePath) {
        res.writeHead(308, { Location: basePath + "/" });
        res.end();
        return;
      }
      if (basePath && !url.startsWith(basePath + "/"))
        throw new Error("Outside base path");
      url = url.slice(basePath.length);
      let file = path.resolve(root, "." + url);
      if (file !== root && !file.startsWith(root + path.sep))
        throw new Error("Outside output");
      if ((await stat(file)).isDirectory()) {
        if (!url.endsWith("/")) {
          res.writeHead(308, { Location: basePath + url + "/" });
          res.end();
          return;
        }
        file = path.join(file, "index.html");
      }
      const body = await readFile(file);
      res.writeHead(200, {
        "Content-Type": mime[path.extname(file)] || "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
      });
      res.end(body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        await readFile(path.join(root, "404.html")).catch(() =>
          Buffer.from("404"),
        ),
      );
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Pages önizleme: http://127.0.0.1:${port}${basePath}/`),
  );
