"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="site">
      <header className="border-b border-rule">
        <div className="wrap flex h-[58px] items-center">
          <Link href="/" className="text-[19px] italic leading-none">
            {site.name}
          </Link>
        </div>
      </header>
      <main id="main" className="wrap flex-1 pb-28 pt-20 md:pb-40 md:pt-32">
        <div className="folio gap-y-6">
          <p className="folio-label sc text-muted lg:pt-[1.4em]">Erratum</p>
          <h1 className="folio-wide text-[clamp(44px,6.4vw,96px)] font-light leading-none tracking-[-0.028em] text-balance">
            Something went <em>wrong.</em>
          </h1>
          <p className="folio-text text-[21px] italic leading-[1.45] text-pretty text-muted md:text-[24px]">
            An unexpected error stopped this page from loading. Trying again usually
            helps.
          </p>
          <div className="folio-text flex flex-wrap items-center gap-x-8 gap-y-4">
            <button type="button" onClick={() => unstable_retry()} className="btn sc">
              Try again
            </button>
            <Link href="/" className="sc link">
              Return home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
