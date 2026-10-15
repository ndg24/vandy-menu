"use client";

import { useCallback, useSyncExternalStore } from "react";
import { ACCENT_STORAGE_KEY, type Accent } from "@/lib/accent";

const listeners = new Set<() => void>();

// The <html data-accent> attribute is the source of truth: an inline script in
// the layout sets it from localStorage before first paint, so there's no flash.
function getSnapshot(): Accent {
  return document.documentElement.dataset.accent === "pink" ? "pink" : "green";
}

function getServerSnapshot(): Accent {
  return "green";
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function useAccent() {
  const accent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleAccent = useCallback(() => {
    const next: Accent = getSnapshot() === "pink" ? "green" : "pink";
    document.documentElement.dataset.accent = next;
    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, next);
    } catch {}
    listeners.forEach((l) => l());
  }, []);

  return { accent, toggleAccent };
}
