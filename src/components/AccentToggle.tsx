"use client";

import { useAccent } from "@/state/useAccent";

export default function AccentToggle() {
  const { accent, toggleAccent } = useAccent();
  const isPink = accent === "pink";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isPink}
      aria-label="Pink accent color"
      onClick={toggleAccent}
      className="round relative h-6 w-11 shrink-0 border-2 border-border-black bg-card"
    >
      <span
        aria-hidden
        className={`round absolute top-0.5 left-0.5 block h-4 w-4 border-2 border-border-black bg-accent transition-all duration-200 ease-out ${
          isPink ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
