"use client";

interface SelectorButtonProps {
  label: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export default function SelectorButton({
  label,
  selected,
  onClick,
  className = "",
}: SelectorButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-2 border-border-black px-3 py-2 font-mono text-sm uppercase tracking-wide transition-colors duration-150 ${
        selected ? "bg-accent text-black" : "bg-card text-black active:bg-border-black active:text-card"
      } ${className}`}
    >
      {label}
    </button>
  );
}
