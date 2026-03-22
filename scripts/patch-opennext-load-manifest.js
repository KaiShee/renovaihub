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

let source = fs.readFileSync(pluginPath, "utf8");
let patched = source;

const globFrom = "**/{*-manifest,required-server-files}.json";
const globTo = "**/{*-manifest,required-server-files,prefetch-hints}.json";

if (patched.includes(globFrom)) {
  patched = patched.replace(globFrom, globTo);
  console.log("[patch-opennext-load-manifest] patched manifest glob to include prefetch-hints.json");
}

const throwNeedleA = "throw new Error(`Unexpected loadManifest(${$PATH}) call!`);";
const throwNeedleB = "throw new Error(\\`Unexpected loadManifest(\\${$PATH}) call!\\`);";

if (!patched.includes("if (handleMissing) return {};")) {
  if (patched.includes(throwNeedleA)) {
    patched = patched.replace(
      throwNeedleA,
      "if (handleMissing) return {};\\n  throw new Error(`Unexpected loadManifest(${$PATH}) call!`);"
    );
    console.log("[patch-opennext-load-manifest] patched loadManifest to honor handleMissing");
  } else if (patched.includes(throwNeedleB)) {
    patched = patched.replace(
      throwNeedleB,
      "if (handleMissing) return {};\\n  throw new Error(\\`Unexpected loadManifest(\\${$PATH}) call!\\`);"
    );
    console.log("[patch-opennext-load-manifest] patched loadManifest to honor handleMissing");
  }
}

if (patched.includes("$$ARGS[3]")) {
  patched = patched.split("$$ARGS[3]").join("handleMissing");
  console.log("[patch-opennext-load-manifest] replaced legacy $$ARGS[3] token");
}

if (patched.includes("$$$ARGS[3]")) {
  patched = patched.split("$$$ARGS[3]").join("handleMissing");
  console.log("[patch-opennext-load-manifest] replaced legacy $$$ARGS[3] token");
}

if (patched === source) {
  console.log("[patch-opennext-load-manifest] already patched");
  process.exit(0);
}

fs.writeFileSync(pluginPath, patched, "utf8");
