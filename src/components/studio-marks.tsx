/** Crop marks for the studio frame. Decorative only. */
export function StudioMarks() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-2 z-50 hidden lg:block no-print"
    >
      <span className="absolute left-0 top-0 h-3.5 w-3.5 border-l border-t border-primary/45" />
      <span className="absolute right-0 top-0 h-3.5 w-3.5 border-r border-t border-primary/45" />
      <span className="absolute bottom-0 left-0 h-3.5 w-3.5 border-b border-l border-primary/45" />
      <span className="absolute bottom-0 right-0 h-3.5 w-3.5 border-b border-r border-primary/45" />
    </div>
  );
}
