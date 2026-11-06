import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DATA } from "@/data/resume";

export function SiteFooter() {
  return (
    <footer className="mt-24 sm:mt-32 border-t border-primary/30 pt-12 sm:pt-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
              Let&apos;s build something together.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm">
              If you&apos;re building something where engineering decisions meet
              business outcomes, I&apos;d like to hear about it.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fill group h-10"
              >
                Connect on LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={`mailto:${DATA.contact.email}`}
                className="btn-line group h-10"
              >
                Send email
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <nav className="flex gap-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors duration-150">
                Home
              </Link>
              <Link href="/projects" className="hover:text-foreground transition-colors duration-150">
                Projects
              </Link>
              <Link href="/blog" className="hover:text-foreground transition-colors duration-150">
                Writing
              </Link>
            </nav>
            <p className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-[0.14em]">
              © {new Date().getFullYear()} {DATA.name} · IST UTC+5:30
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
