import type { DayMenu, DiningHall, HoursData, MealPeriodName, MenuData } from "./types";
import { TIME_ZONE, getHallHours, isOpenNow } from "./hours";

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

// Opening hall: the last-viewed hall if it's open now, else the first open
// hall, else the last-viewed hall, else the first hall.
export function pickDefaultHall(
  hoursData: HoursData,
  hallIds: string[],
  lastHallId: string | null,
  now: Date,
): string {
  const last = lastHallId && hallIds.includes(lastHallId) ? lastHallId : null;
  const isOpen = (id: string) => {
    const hours = getHallHours(hoursData, id);
    return hours !== undefined && isOpenNow(hours, now);
  };
  if (last && isOpen(last)) return last;
  return hallIds.find(isOpen) ?? last ?? hallIds[0] ?? DEFAULT_HALL_ID;
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

// Most halls run Breakfast/Lunch/Dinner, but a hall's meal-period tab set
// isn't guaranteed to match that — Pub's site page now runs a single
// "Daily Offerings" catalog restructured here into Mains/Sides/Drinks.
const DEFAULT_MEAL_PERIODS: MealPeriodName[] = ["BREAKFAST", "LUNCH", "DINNER"];
const HALL_MEAL_PERIODS: Record<string, MealPeriodName[]> = {
  pub: ["MAINS", "SIDES", "DRINKS"],
};

export function mealPeriodsForHall(hallId: string): MealPeriodName[] {
  return HALL_MEAL_PERIODS[hallId] ?? DEFAULT_MEAL_PERIODS;
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

// Campus wall-clock, so "today" and the default meal match the hours logic
// (which is Chicago-based) even if the device is set to another time zone.
export function currentMealPeriod(now: Date = new Date()): MealPeriodName {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, hour: "numeric", hourCycle: "h23" }).format(now),
  );
  if (hour < 11) return "BREAKFAST";
  if (hour < 16) return "LUNCH";
  return "DINNER";
}

export function todayIso(now: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
