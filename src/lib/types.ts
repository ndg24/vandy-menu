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

export type Weekday = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";

export interface HoursWindow {
  weekday: Weekday;
  open: string; // "HH:MM" 24h, America/Chicago wall-clock
  close: string; // "HH:MM" 24h, America/Chicago wall-clock
}

export interface HallHours {
  id: string;
  name: string;
  windows: HoursWindow[];
}

export interface HoursData {
  scrapedAt: string;
  halls: HallHours[];
}

export interface QuickStopsData {
  scrapedAt: string;
  locations: HallHours[];
}
