"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";

export function DownloadResumeButton() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    setIsLocal(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  }, []);

  if (!isLocal) {
    return null;
  }

  const downloadResume = async (selectedTheme: 'light' | 'dark') => {
    try {
      setLoading(true);
      setShowModal(false);
      const response = await fetch(`/api/pdf?theme=${selectedTheme}`);
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Zaheed-Resume-${selectedTheme}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center no-print">
        <Button onClick={() => setShowModal(true)} variant="outline" size="lg" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </>
          )}
        </Button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Choose Resume Theme</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => downloadResume('light')} className="flex-1">
                Light Theme
              </Button>
              <Button onClick={() => downloadResume('dark')} variant="outline" className="flex-1">
                Dark Theme
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}