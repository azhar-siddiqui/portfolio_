import { promises as fs } from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { DATA } from "../src/data/resume";
import { ResumeTemplate } from "../src/components/ResumeTemplate";

type Theme = "light" | "dark";

const PROJECT_ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "public", "resumes");

async function loadAvatarDataUri(): Promise<string | null> {
  if (!DATA.avatarUrl) return null;
  try {
    const avatarPath = path.join(
      PROJECT_ROOT,
      "public",
      DATA.avatarUrl.replace(/^\//, "")
    );
    const buffer = await fs.readFile(avatarPath);
    const ext = path.extname(DATA.avatarUrl).toLowerCase();
    const mimeType = ext === ".png" ? "image/png" : "image/jpeg";
    return `data:${mimeType};base64,${buffer.toString("base64")}`;
  } catch (error) {
    console.warn("Could not load avatar image:", error);
    return null;
  }
}

async function generatePdf(
  browser: Awaited<ReturnType<typeof puppeteer.launch>>,
  theme: Theme,
  avatarBase64: string | null
) {
  const page = await browser.newPage();
  try {
    const html = ResumeTemplate({ theme, avatarBase64 });

    await page.setContent(html, { waitUntil: "load" });
    await page.emulateMediaType("print");
    await page.setViewport({ width: 794, height: 2000, deviceScaleFactor: 1 });

    const contentHeight = await page.evaluate(() => document.body.scrollHeight);
    const pdfHeight = contentHeight + 40;

    const pdfBuffer = await page.pdf({
      width: "210mm",
      height: `${pdfHeight}px`,
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
      pageRanges: "1",
      preferCSSPageSize: false,
      displayHeaderFooter: false,
      scale: 1,
      tagged: false,
      outline: false,
    });

    const resumeBaseName = `${DATA.name.replace(/\s+/g, "-")}-Resume`;
    const outPath = path.join(OUTPUT_DIR, `${resumeBaseName}-${theme}.pdf`);
    await fs.writeFile(outPath, pdfBuffer);
    console.log(`Wrote ${path.relative(PROJECT_ROOT, outPath)}`);
  } finally {
    await page.close();
  }
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const avatarBase64 = await loadAvatarDataUri();

  const browser = await puppeteer.launch({ headless: true });
  try {
    for (const theme of ["light", "dark"] as const) {
      await generatePdf(browser, theme, avatarBase64);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("Resume generation failed:", err);
  process.exit(1);
});
