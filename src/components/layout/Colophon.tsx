import { site } from "@/lib/site";

export default function Colophon() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-rule">
      <div className="wrap grid gap-x-12 gap-y-3 py-8 md:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,200px)_minmax(0,640px)_minmax(0,260px)]">
        <p className="sc text-muted md:col-span-2 lg:col-span-1">Colophon</p>
        <p className="note">
          Set in Newsreader and Instrument Sans. Built with Next.js and Prisma.
          © {year} {site.name}.
        </p>
        <p className="note md:col-start-2 lg:col-start-3 lg:text-right">
          <a href="#top" className="link text-bone">
            Back to top ↑
          </a>
        </p>
      </div>
    </footer>
  );
}
