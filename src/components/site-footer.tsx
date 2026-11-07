import Link from "next/link";
import { DATA } from "@/data/resume";
import { isBlogEnabled } from "@/lib/feature-flags";

export async function SiteFooter() {
  const blogEnabled = await isBlogEnabled();

  return (
    <footer className="mt-16 w-full min-w-0 border-t border-border pt-10">
      <h2 className="text-sm font-medium text-muted-foreground">Contact</h2>
      <p className="mt-4 max-w-md text-base leading-relaxed text-foreground">
        Open to full-time roles in India and remote.
      </p>
      <ul className="mt-6 space-y-2 text-sm">
        <li>
          <a
            href={`mailto:${DATA.contact.email}`}
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            {DATA.contact.email}
          </a>
        </li>
        <li>
          <a
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href={DATA.contact.social.GitHub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            GitHub
          </a>
        </li>
      </ul>
      <nav className="mt-8 flex gap-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <Link href="/projects" className="hover:text-foreground">
          Projects
        </Link>
        {blogEnabled ? (
          <Link href="/blog" className="hover:text-foreground">
            Writing
          </Link>
        ) : null}
      </nav>
      <p className="mt-6 text-sm text-muted-foreground">
        {DATA.name} · Aurangabad, India · IST (UTC+5:30)
      </p>
    </footer>
  );
}
