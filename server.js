const https = require("https");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

let PORT = 3001;

args.forEach((arg, index) => {
  if (arg === '--port' && args[index + 1]) {
    PORT = parseInt(args[index + 1], 10);
  }
});

const publicDir = path.join(__dirname, "public");

const options = {
  key: fs.readFileSync(path.join(__dirname, "cert/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert/cert.pem")),
};

const server = https.createServer(options, (req, res) => {
  let filePath = path.join(publicDir, req.url === "/" ? "index.html" : req.url);
  const ext = path.extname(filePath).toLowerCase();

  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
  };

  const contentType = mimeTypes[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Server Error");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`HTTPS server running at https://localhost:${PORT}`);
});
