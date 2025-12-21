"use client";

import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
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

  if (process.env.NODE_ENV !== "development") {
    return (
      <div className="flex align-items-center justify-content-center">
        <a
          href={DATA.contact.social.LinkedIn.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold text-lg"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Connect on LinkedIn
        </a>
      </div>
    );
  }

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
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Choose Theme
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModal(false)}
                className="hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              Select your preferred theme for the PDF resume
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => downloadResume("light")}
                className="flex-1 py-6 bg-primary hover:bg-primary/90 text-white rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Light Theme
              </Button>
              <Button
                onClick={() => downloadResume("dark")}
                variant="outline"
                className="flex-1 py-6 border-2 border-primary text-primary dark:text-white rounded-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
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
