// scripts/download-chromium.js
const https = require("https");
const fs = require("fs");
const path = require("path");

const CHROMIUM_VERSION = "r129"; // Match your @sparticuz/chromium-min version
const TAR_URL = `https://github.com/Sparticuz/chromium/releases/download/v${CHROMIUM_VERSION}/chromium-${CHROMIUM_VERSION}-pack.tar`;
const OUTPUT_PATH = path.join(__dirname, "..", "public", "chromium.tar");

console.log("Downloading Chromium tarball for Vercel...");

const file = fs.createWriteStream(OUTPUT_PATH);
https
  .get(TAR_URL, (response) => {
    response.pipe(file);
    file.on("finish", () => {
      file.close();
      console.log(`Chromium tarball saved to ${OUTPUT_PATH} (~50MB)`);
    });
  })
  .on("error", (err) => {
    console.error("Download failed:", err);
    process.exit(1);
  });
