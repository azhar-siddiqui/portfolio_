// app/api/pdf/route.tsx
import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { PDFDocument } from 'pdf-lib';
import Resume from '@/components/resume-pdf';
import { DATA } from '@/data/resume';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = (searchParams.get('theme') as 'light' | 'dark') || 'light';

  try {
    // Calculate approximate height based on content
    let calculatedHeight = 300; // base padding
    
    // Header
    calculatedHeight += 100;
    
    // Summary (rough estimate: chars per line * lines)
    calculatedHeight += Math.ceil(DATA.summary.length / 80) * 20;
    
    // Work experience
    calculatedHeight += DATA.work.length * 180; // each work item
    
    // Education
    calculatedHeight += DATA.education.length * 120;
    
    // Skills (badges layout)
    calculatedHeight += Math.ceil(DATA.skills.length / 8) * 25;
    
    // Projects
    calculatedHeight += DATA.projects.length * 140;
    
    // Add buffer
    calculatedHeight += 100;

    const pdfBuffer = await renderToBuffer(<Resume theme={theme} height={calculatedHeight} />);

    return new NextResponse(pdfBuffer as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${DATA.name.replace(' ', '-')}-Resume-${theme}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
