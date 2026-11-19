import Masthead from "@/components/layout/Masthead";
import Colophon from "@/components/layout/Colophon";
import type { Chapter } from "@/lib/content";

/** Page frame for the public site: masthead, main landmark, colophon. */
export default function SiteShell({
  chapters,
  children,
}: {
  chapters: Chapter[];
  children: React.ReactNode;
}) {
  return (
    <div id="top" className="site">
      <Masthead
        items={chapters.map(({ id, label, numeral }) => ({ id, label, numeral }))}
      />
      <main id="main" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <Colophon />
    </div>
  );
}
