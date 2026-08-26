"use client";

import { useSyncExternalStore } from "react";

let cachedNowMs = Date.now();

function subscribeToClock(onTick: () => void) {
  const id = setInterval(() => {
    cachedNowMs = Date.now();
    onTick();
  }, 60_000);
  return () => clearInterval(id);
}

function getSnapshot(): number {
  return cachedNowMs;
}

function getServerSnapshot(): null {
  return null;
}

export function useNowMs(): number | null {
  return useSyncExternalStore(subscribeToClock, getSnapshot, getServerSnapshot);
}
