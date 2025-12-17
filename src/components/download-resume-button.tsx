"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2, X } from "lucide-react";
import { useState } from "react";

export function DownloadResumeButton() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const downloadResume = async (selectedTheme: "light" | "dark") => {
    try {
      setLoading(true);
      setShowModal(false);

      let response = null;

      if (process.env.NODE_ENV === "development") {
        response = await fetch(`/api/pdf?theme=${selectedTheme}`);
      } else {
        response = await fetch(`/resumes/Zaheed-Resume-${selectedTheme}.pdf`);
      }

      if (!response || !response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Zaheed-Resume-${selectedTheme}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading resume:", error);
      alert("Failed to download resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center no-print">
        <Button
          onClick={() => setShowModal(true)}
          variant="outline"
          size="lg"
          disabled={loading}
          className="px-8 py-6 text-lg font-semibold border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </>
          )}
        </Button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-background border border-border/50 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Choose Theme</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModal(false)}
                className="hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">Select your preferred theme for the PDF resume</p>
            <div className="flex gap-3">
              <Button
                onClick={() => downloadResume("light")}
                className="flex-1 py-6 bg-primary hover:bg-primary/90 text-white rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Light Theme
              </Button>
              <Button
                onClick={() => downloadResume("dark")}
                variant="outline"
                className="flex-1 py-6 border-2 border-primary text-primary dark:text-white rounded-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                Dark Theme
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
