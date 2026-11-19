import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SiteShell chapters={[]}>
      <section aria-labelledby="nf-title" className="wrap pb-28 pt-20 md:pb-40 md:pt-32">
        <div className="folio gap-y-6">
          <p className="folio-label sc text-muted lg:pt-[1.4em]">Erratum · 404</p>
          <h1
            id="nf-title"
            className="folio-wide text-[clamp(44px,6.4vw,96px)] font-light leading-none tracking-[-0.028em] text-balance"
          >
            This page is <em>not in the book.</em>
          </h1>
          <p className="folio-text text-[21px] italic leading-[1.45] text-pretty text-muted md:text-[24px]">
            It may have moved, or the address may be mistyped.
          </p>
          <p className="folio-text sc flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/" className="link">
              ← Return to the contents
            </Link>
            <Link href="/projects" className="link">
              All projects
            </Link>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
