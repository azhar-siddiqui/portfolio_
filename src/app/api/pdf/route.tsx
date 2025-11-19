// app/api/pdf/route.tsx
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { ResumeTemplate } from '@/components/ResumeTemplate';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = (searchParams.get('theme') as 'light' | 'dark') || 'light';

  let browser = null;
  try {
    // Launch browser with proper configuration for Vercel/serverless
    browser = await puppeteer.launch(
      process.env.VERCEL
        ? {
            args: chromium.args,
            defaultViewport: (chromium as any).defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: (chromium as any).headless,
          }
        : {
            executablePath:
              process.platform === 'win32'
                ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
                : process.platform === 'darwin'
                ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
                : '/usr/bin/google-chrome',
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
          }
    );

    const page = await browser.newPage();

    // Generate HTML content
    const htmlContent = ResumeTemplate({ theme });

    // Set content and wait for everything to load
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Configure page for PDF generation
    await page.emulateMediaType('print');
    await page.setViewport({ width: 794, height: 2000, deviceScaleFactor: 1 }); // A4 width, tall height

    // Get the actual content height
    const contentHeight = await page.evaluate(() => {
      return document.body.scrollHeight;
    });

    // Add some padding
    const pdfHeight = contentHeight + 40; // Add 40px padding

    // Generate PDF with dynamic height
    const pdf = await page.pdf({
      width: '210mm',
      height: `${pdfHeight}px`,
      printBackground: true,
      margin: {
        top: '10mm',
        bottom: '10mm',
        left: '10mm',
        right: '10mm',
      },
      pageRanges: '1', // Ensure single page
      preferCSSPageSize: false,
      displayHeaderFooter: false,
    });

    await browser.close();

    return new NextResponse(pdf as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Zaheed-Resume-${theme}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    if (browser) await browser.close();
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
