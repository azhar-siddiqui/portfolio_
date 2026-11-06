import { DATA } from "@/data/resume";
import { isBlogEnabled } from "@/lib/feature-flags";
import { NavbarClient, type NavItem } from "./navbar-client";

/**
 * Server-side navbar wrapper. Resolves feature flags (e.g. whether the
 * "Writing" link should be shown) and forwards a filtered item list to the
 * client navbar that owns active-state highlighting.
 *
 * Icon components live in server-side data (`@/data/resume`). They can't be
 * passed as bare component references across the server/client boundary, so
 * we render them here and forward the resulting React element.
 */
export default async function Navbar() {
  const blogEnabled = await isBlogEnabled();

  const items: NavItem[] = DATA.navbar
    .filter((item) => {
      if (item.href.startsWith("/blog")) return blogEnabled;
      return true;
    })
    .map((item) => {
      const Icon = item.icon;
      return {
        href: item.href,
        label: item.label,
        icon: <Icon className="size-5 sm:size-4 shrink-0" />,
      };
    });

  return <NavbarClient items={items} name={DATA.name} />;
}
