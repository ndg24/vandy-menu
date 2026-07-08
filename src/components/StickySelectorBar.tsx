export default function StickySelectorBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-0 z-10 border-b-2 border-border-black bg-background">
      {children}
    </div>
  );
}
