"use client";

import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import html2pdf from 'html2pdf.js';

const downloadResume = () => {
  const element = document.getElementById('resume-content');
  if (!element) return;

  const opt = {
    margin: 0.5,
    filename: `${DATA.name.replace(' ', '_')}_Resume.pdf`,
    html2canvas: { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff' },
    jsPDF: { unit: 'in', format: [8.5, 20] as [number, number], orientation: 'portrait' as 'portrait' },
    pagebreak: { avoid: '*' } // Avoid all page breaks for single page
  };

  html2pdf().set(opt).from(element).save().catch(error => {
    console.error('Error generating PDF:', error);
  });
};

export function DownloadResumeButton() {
  return (
    <div className="flex justify-center no-print">
      <Button onClick={downloadResume} variant="outline" size="lg">
        Download Resume
      </Button>
    </div>
  );
}