"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "vandy-menu:favorites";

function parse(raw: string | null): Set<string> {
  if (!raw) return new Set();
  try {
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

const EMPTY_SET: Set<string> = new Set();

let cachedSnapshot: Set<string> | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): Set<string> {
  if (cachedSnapshot === null) {
    cachedSnapshot = parse(localStorage.getItem(STORAGE_KEY));
  }
  return cachedSnapshot;
}

function getServerSnapshot(): Set<string> {
  return EMPTY_SET;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cachedSnapshot = null;
      onChange();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function writeFavorites(next: Set<string>) {
  cachedSnapshot = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
  } catch {}
  listeners.forEach((l) => l());
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleFavorite = useCallback((dish: string) => {
    const next = new Set(getSnapshot());
    if (next.has(dish)) {
      next.delete(dish);
    } else {
      next.add(dish);
    }
    writeFavorites(next);
  }, []);

  return { favorites, toggleFavorite };
}
