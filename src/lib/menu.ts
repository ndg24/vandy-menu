import type { DayMenu, DiningHall, MealPeriodName, MenuData } from "./types";

export const HALL_ORDER = [
  "rand",
  "ebi",
  "roth",
  "zeppos",
  "carmichael",
  "kissam",
  "commons",
  "pub",
] as const;

export const DEFAULT_HALL_ID = "rand";

export const QUICK_STOPS_ID = "quick-stops";

export const FAVORITES_ID = "favorites";

export function orderedHalls(data: MenuData): DiningHall[] {
  return HALL_ORDER.map((id) => data.halls.find((h) => h.id === id)).filter(
    (h): h is DiningHall => h !== undefined,
  );
}

export function getHall(data: MenuData, hallId: string): DiningHall | undefined {
  return data.halls.find((h) => h.id === hallId);
}

export function getDay(hall: DiningHall, date: string): DayMenu | undefined {
  return hall.days.find((d) => d.date === date);
}

export function getDishes(hall: DiningHall, date: string, period: MealPeriodName) {
  const day = getDay(hall, date);
  return day?.meals.find((m) => m.period === period)?.dishes ?? [];
}

// Roth and Carmichael don't run a separate Breakfast on Sundays — the site
// publishes a single "Brunch" service instead, which we store under the
// existing BREAKFAST slot and relabel here for display.
const BRUNCH_HALLS = ["roth", "carmichael"];

export function mealLabel(period: MealPeriodName, hallId: string, weekday: string): string {
  if (period === "BREAKFAST" && weekday === "SUN" && BRUNCH_HALLS.includes(hallId)) {
    return "BRUNCH";
  }
  return period;
}

export function currentMealPeriod(now: Date = new Date()): MealPeriodName {
  const hour = now.getHours();
  if (hour < 11) return "BREAKFAST";
  if (hour < 16) return "LUNCH";
  return "DINNER";
}

export function todayIso(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
