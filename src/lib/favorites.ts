import type { MealPeriodName, MenuData } from "./types";
import { HALL_ORDER } from "./menu";

export interface FavoriteOccurrence {
  dish: string;
  station: string;
  hallId: string;
  hallName: string;
  date: string;
  weekday: string;
  period: MealPeriodName;
}

const MEAL_ORDER: MealPeriodName[] = ["BREAKFAST", "LUNCH", "DINNER"];

export function findFavoriteOccurrences(
  data: MenuData,
  favorites: Set<string>,
): FavoriteOccurrence[] {
  const results: FavoriteOccurrence[] = [];
  for (const hall of data.halls) {
    for (const day of hall.days) {
      for (const meal of day.meals) {
        for (const dish of meal.dishes) {
          if (favorites.has(dish.dish)) {
            results.push({
              dish: dish.dish,
              station: dish.station,
              hallId: hall.id,
              hallName: hall.name,
              date: day.date,
              weekday: day.weekday,
              period: meal.period,
            });
          }
        }
      }
    }
  }
  return results.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    const hallDiff = HALL_ORDER.indexOf(a.hallId as (typeof HALL_ORDER)[number]) -
      HALL_ORDER.indexOf(b.hallId as (typeof HALL_ORDER)[number]);
    if (hallDiff !== 0) return hallDiff;
    return MEAL_ORDER.indexOf(a.period) - MEAL_ORDER.indexOf(b.period);
  });
}

export function groupOccurrencesByDish(
  occurrences: FavoriteOccurrence[],
): Map<string, FavoriteOccurrence[]> {
  const map = new Map<string, FavoriteOccurrence[]>();
  for (const occ of occurrences) {
    const list = map.get(occ.dish) ?? [];
    list.push(occ);
    map.set(occ.dish, list);
  }
  return map;
}
