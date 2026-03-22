const fs = require("fs");
const path = require("path");

const pluginPath = path.join(
  process.cwd(),
  "node_modules",
  "@opennextjs",
  "cloudflare",
  "dist",
  "cli",
  "build",
  "patches",
  "plugins",
  "load-manifest.js"
);

if (!fs.existsSync(pluginPath)) {
  console.warn("[patch-opennext-load-manifest] plugin not found, skipping");
  process.exit(0);
}

const source = fs.readFileSync(pluginPath, "utf8");
const from = "**/{*-manifest,required-server-files}.json";
const to = "**/{*-manifest,required-server-files,prefetch-hints}.json";

if (source.includes(to)) {
  console.log("[patch-opennext-load-manifest] already patched");
  process.exit(0);
}

if (!source.includes(from)) {
  console.warn("[patch-opennext-load-manifest] target pattern not found, skipping");
  process.exit(0);
}

const patched = source.replace(from, to);
fs.writeFileSync(pluginPath, patched, "utf8");
console.log("[patch-opennext-load-manifest] patched manifest glob to include prefetch-hints.json");
