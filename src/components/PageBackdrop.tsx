import BackgroundPattern from '@/components/BackgroundPattern';

// The classic design's fixed page background. Rendered per page rather than in the root
// layout so /concept doesn't ship (and animate) markup it never shows.
export default function PageBackdrop() {
  return (
    <div aria-hidden="true">
      <BackgroundPattern variant="page" className="fixed inset-0 -z-50" />
      <div className="fixed inset-0 -z-40 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_48%)]" />
    </div>
  );
}
