import AccentToggle from "./AccentToggle";

interface HeaderProps {
  lastSyncedAt?: string;
}

export default function Header({ lastSyncedAt }: HeaderProps) {
  const syncedLabel = lastSyncedAt
    ? new Date(lastSyncedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <header className="flex items-center justify-between gap-2 border-b-2 border-border-black px-4 py-3">
      <h1 className="font-display text-xl tracking-widest">DINING.SYS</h1>
      <div className="flex items-center gap-3">
        {syncedLabel && (
          <div className="font-mono text-xs text-neutral-600">SYNCED {syncedLabel}</div>
        )}
        <AccentToggle />
      </div>
    </header>
  );
}
