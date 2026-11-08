"use client";

import { useCallback, useMemo, useState } from "react";
import type { HoursData, MealPeriodName, MenuData } from "@/lib/types";
import {
  DEFAULT_HALL_ID,
  currentMealPeriod,
  getHall,
  orderedHalls,
  pickDefaultHall,
  todayIso,
} from "@/lib/menu";
import { useNowMs } from "./useNow";

const LAST_HALL_KEY = "vandy-menu:last-hall";

export function useMenuSelection(data: MenuData, hoursData: HoursData) {
  const allDays = useMemo(() => {
    const map = new Map<string, string>();
    for (const hall of data.halls) {
      for (const day of hall.days) map.set(day.date, day.weekday);
    }
    return Array.from(map.entries())
      .map(([date, weekday]) => ({ date, weekday }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [data]);

  // Null during the static prerender, so "today" is never baked into the HTML
  // at build time; the client fills it in right after hydration.
  const nowMs = useNowMs();

  const today = nowMs === null ? null : todayIso(new Date(nowMs));

  const defaultDate = useMemo(() => {
    if (today === null) return "";
    if (allDays.some((d) => d.date === today)) return today;
    return allDays[0]?.date ?? today;
  }, [allDays, today]);

  const defaultMeal: MealPeriodName =
    nowMs === null ? "BREAKFAST" : currentMealPeriod(new Date(nowMs));

  // Chosen once on the client, then frozen so the view doesn't jump when a
  // hall closes while the app is open.
  const [defaultHallId, setDefaultHallId] = useState<string | null>(null);
  if (nowMs !== null && defaultHallId === null) {
    let lastHallId: string | null = null;
    try {
      lastHallId = localStorage.getItem(LAST_HALL_KEY);
    } catch {}
    const hallIds = orderedHalls(data).map((h) => h.id);
    setDefaultHallId(pickDefaultHall(hoursData, hallIds, lastHallId, new Date(nowMs)));
  }

  const [pickedHallId, setPickedHallId] = useState<string | null>(null);
  const [pickedDate, setSelectedDate] = useState<string | null>(null);
  const [pickedMeal, setSelectedMeal] = useState<MealPeriodName | null>(null);
  const selectedHallId = pickedHallId ?? defaultHallId ?? DEFAULT_HALL_ID;
  const selectedDate = pickedDate ?? defaultDate;
  const selectedMeal = pickedMeal ?? defaultMeal;

  const setSelectedHallId = useCallback(
    (hallId: string) => {
      setPickedHallId(hallId);
      // Only real halls are remembered, not the Favorites/Quick Stops views.
      if (getHall(data, hallId)) {
        try {
          localStorage.setItem(LAST_HALL_KEY, hallId);
        } catch {}
      }
    },
    [data],
  );

  const selectedHall = getHall(data, selectedHallId);

  return {
    ready: today !== null && defaultHallId !== null,
    today,
    allDays,
    selectedHallId,
    setSelectedHallId,
    selectedDate,
    setSelectedDate,
    selectedMeal,
    setSelectedMeal,
    selectedHall,
  };
}
