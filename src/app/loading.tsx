export default function Loading() {
  return (
    <div className="site" aria-busy="true">
      <div className="h-[58px] border-b border-rule" />
      <div className="wrap pt-16 md:pt-28">
        <p role="status" className="sc text-muted">
          Loading…
        </p>
      </div>
    </div>
  );
}
