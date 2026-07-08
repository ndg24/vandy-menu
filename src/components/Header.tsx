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
    <header className="flex items-baseline justify-between border-b-2 border-border-black px-4 py-3">
      <h1 className="font-display text-xl tracking-widest">DINING.SYS</h1>
      <div className="text-right font-mono text-xs text-neutral-600">
        <div>v1.0</div>
        {syncedLabel && <div>SYNCED {syncedLabel}</div>}
      </div>
    </header>
  );
}
