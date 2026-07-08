"use client";

import { useMemo, useState } from "react";
import type { MealPeriodName, MenuData } from "@/lib/types";
import { DEFAULT_HALL_ID, currentMealPeriod, getHall, todayIso } from "@/lib/menu";

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

  const defaultDate = useMemo(() => {
    const today = todayIso();
    if (allDays.some((d) => d.date === today)) return today;
    return allDays[0]?.date ?? today;
  }, [allDays]);

  const [selectedHallId, setSelectedHallId] = useState(DEFAULT_HALL_ID);
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [selectedMeal, setSelectedMeal] = useState<MealPeriodName>(currentMealPeriod());

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
