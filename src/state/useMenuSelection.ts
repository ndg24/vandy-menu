"use client";

import { useMemo, useState } from "react";
import type { MealPeriodName, MenuData } from "@/lib/types";
import { DEFAULT_HALL_ID, currentMealPeriod, getHall, todayIso } from "@/lib/menu";
import { useNowMs } from "./useNow";

export function useMenuSelection(data: MenuData) {
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

  const defaultDate = useMemo(() => {
    if (nowMs === null) return "";
    const today = todayIso(new Date(nowMs));
    if (allDays.some((d) => d.date === today)) return today;
    return allDays[0]?.date ?? today;
  }, [allDays, nowMs]);

  const defaultMeal: MealPeriodName =
    nowMs === null ? "BREAKFAST" : currentMealPeriod(new Date(nowMs));

  const [selectedHallId, setSelectedHallId] = useState(DEFAULT_HALL_ID);
  const [pickedDate, setSelectedDate] = useState<string | null>(null);
  const [pickedMeal, setSelectedMeal] = useState<MealPeriodName | null>(null);
  const selectedDate = pickedDate ?? defaultDate;
  const selectedMeal = pickedMeal ?? defaultMeal;

  const selectedHall = getHall(data, selectedHallId);

  return {
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
