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
      className={`border-2 border-border-black px-3 py-2 font-mono text-sm uppercase tracking-wide transition-colors duration-150 ${background} ${className}`}
    >
      {label}
    </button>
  );
}
