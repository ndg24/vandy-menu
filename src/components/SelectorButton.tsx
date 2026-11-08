"use client";

interface SelectorButtonProps {
  label: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  className?: string;
  tint?: "open" | "closed";
}

export default function SelectorButton({
  label,
  selected,
  onClick,
  className = "",
  tint,
}: SelectorButtonProps) {
  const background = selected
    ? "bg-accent text-black"
    : tint === "open"
      ? "bg-tint-open text-black active:bg-border-black active:text-card"
      : tint === "closed"
        ? "bg-tint-closed text-black active:bg-border-black active:text-card"
        : "bg-card text-black active:bg-border-black active:text-card";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`border-2 border-border-black px-3 py-2 font-mono text-sm uppercase tracking-wide transition-[background-color,color,scale] duration-150 ease-out active:scale-[0.96] ${background} ${className}`}
    >
      {label}
      {/* Open/closed is otherwise shown by tint color alone. */}
      {tint && <span className="sr-only"> ({tint})</span>}
    </button>
  );
}
