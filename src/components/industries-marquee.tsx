export function IndustriesMarquee({ items }: { items: readonly string[] }) {
  const doubled = [...items, ...items];
  return (
    <section
      aria-label="Industries shipped in"
      className="relative w-full overflow-hidden py-10 sm:py-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent"
      />
      <div className="marquee-track flex w-max gap-12 sm:gap-16">
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-12 sm:gap-16 font-mono text-2xl sm:text-4xl uppercase tracking-[-0.01em] text-muted-foreground/25 whitespace-nowrap select-none"
          >
            {item}
            <span aria-hidden className="text-muted-foreground/20">
              ·
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
