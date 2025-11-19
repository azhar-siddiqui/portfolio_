// app/api/pdf/route.tsx
import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import { ResumeTemplate } from "@/components/ResumeTemplate";
import { promises as fs } from "fs";
import path from "path";
import { DATA } from "@/data/resume";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = (searchParams.get("theme") as "light" | "dark") || "light";

  let browser = null;
  try {
    // Read and convert avatar to base64 (unchanged)
    let avatarBase64 = null;
    if (DATA.avatarUrl) {
      try {
        const avatarPath = path.join(
          process.cwd(),
          "public",
          DATA.avatarUrl.replace("/", "")
        );
        const avatarBuffer = await fs.readFile(avatarPath);
        const mimeType =
          path.extname(DATA.avatarUrl).toLowerCase() === ".png"
            ? "image/png"
            : "image/jpeg";
        avatarBase64 = `data:${mimeType};base64,${avatarBuffer.toString(
          "base64"
        )}`;
      } catch (error) {
        console.warn("Could not load avatar image:", error);
      }
    }

    // Launch options: Use tarball in prod, system Chrome locally
    const isVercel = !!process.env.VERCEL;
    let launchOptions: any = {
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
      headless: (chromium as any).headless,
      ignoreHTTPSErrors: true,
      defaultViewport: (chromium as any).defaultViewport,
    };

    if (isVercel) {
      // Use self-hosted tarball URL (served from /public/chromium.tar)
      const tarUrl = `${new URL(request.url).origin}/chromium.tar`;
      launchOptions.executablePath = await chromium.executablePath(tarUrl);
      console.log("Using Vercel tarball for Chromium");
    } else {
      // Local fallback (full system Chrome)
      launchOptions.executablePath =
        process.platform === "win32"
          ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
          : process.platform === "darwin"
          ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
          : "/usr/bin/google-chrome";
      console.log("Using local Chrome");
    }

    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // Generate HTML content (unchanged)
    const htmlContent = ResumeTemplate({ theme, avatarBase64 });

    // Set content and wait (unchanged)
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Configure page for PDF (unchanged, but add scale for sharpness)
    await page.emulateMediaType("print");
    await page.setViewport({ width: 794, height: 2000, deviceScaleFactor: 1 });

    const contentHeight = await page.evaluate(() => document.body.scrollHeight);
    const pdfHeight = contentHeight + 40;

    const pdf = await page.pdf({
      width: "210mm",
      height: `${pdfHeight}px`,
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
      pageRanges: "1",
      preferCSSPageSize: false,
      displayHeaderFooter: false,
      scale: 1, // Ensures crisp text/images
    });

    await browser.close();

    return new NextResponse(pdf as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Zaheed-Resume-${theme}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    if (browser) await browser.close();
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
