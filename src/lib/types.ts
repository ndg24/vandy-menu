export type MealPeriodName = "BREAKFAST" | "LUNCH" | "DINNER";

export interface DishCard {
  station: string;
  dish: string;
}

export interface MealPeriod {
  period: MealPeriodName;
  dishes: DishCard[];
}

export interface DayMenu {
  date: string;
  weekday: string;
  meals: MealPeriod[];
}

export interface DiningHall {
  id: string;
  name: string;
  days: DayMenu[];
}

export interface MenuData {
  scrapedAt: string;
  halls: DiningHall[];
}
