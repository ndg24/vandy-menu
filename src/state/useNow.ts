"use client";

import { useSyncExternalStore } from "react";

let cachedNowMs = Date.now();

function subscribeToClock(onTick: () => void) {
  const tick = () => {
    cachedNowMs = Date.now();
    onTick();
  };
  // Mobile browsers pause timers in the background, so refresh as soon as
  // the app comes back instead of waiting up to a minute for the next tick.
  const onVisible = () => {
    if (document.visibilityState === "visible") tick();
  };
  const id = setInterval(tick, 60_000);
  document.addEventListener("visibilitychange", onVisible);
  return () => {
    clearInterval(id);
    document.removeEventListener("visibilitychange", onVisible);
  };
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
