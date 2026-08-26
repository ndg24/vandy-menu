import type { HallHours, HoursData, Weekday } from "./types";

const TIME_ZONE = "America/Chicago";

export const WEEKDAYS: Weekday[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function getHallHours(data: HoursData, hallId: string): HallHours | undefined {
  return data.halls.find((h) => h.id === hallId);
}

function chicagoNow(now: Date): { weekday: Weekday; time: string } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = get("weekday").slice(0, 3).toUpperCase() as Weekday;
  let hour = get("hour");
  if (hour === "24") hour = "00";
  const time = `${hour.padStart(2, "0")}:${get("minute").padStart(2, "0")}`;

  return { weekday, time };
}

function minuteOfWeek(weekday: Weekday, time: string): number {
  const [h, m] = time.split(":").map(Number);
  return WEEKDAYS.indexOf(weekday) * 1440 + h * 60 + m;
}

export function isOpenNow(hall: HallHours, now: Date = new Date()): boolean {
  const { weekday, time } = chicagoNow(now);
  const nowMin = minuteOfWeek(weekday, time);
  return hall.windows.some((w) => {
    const openMin = minuteOfWeek(w.weekday, w.open);
    const closeMin = minuteOfWeek(w.weekday, w.close);
    return nowMin >= openMin && nowMin < closeMin;
  });
}

export type Transition =
  | { kind: "closes"; time: string }
  | { kind: "opens"; weekday: Weekday; time: string }
  | { kind: "unknown" };

export function nextTransition(hall: HallHours, now: Date = new Date()): Transition {
  const { weekday, time } = chicagoNow(now);
  const nowMin = minuteOfWeek(weekday, time);

  if (hall.windows.length === 0) return { kind: "unknown" };

  const openWindow = hall.windows.find((w) => {
    const openMin = minuteOfWeek(w.weekday, w.open);
    const closeMin = minuteOfWeek(w.weekday, w.close);
    return nowMin >= openMin && nowMin < closeMin;
  });
  if (openWindow) return { kind: "closes", time: openWindow.close };

  const WEEK_MINUTES = 7 * 1440;
  let best: { weekday: Weekday; time: string; delta: number } | null = null;
  for (const w of hall.windows) {
    const openMin = minuteOfWeek(w.weekday, w.open);
    const delta = (openMin - nowMin + WEEK_MINUTES) % WEEK_MINUTES;
    if (best === null || delta < best.delta) {
      best = { weekday: w.weekday, time: w.open, delta };
    }
  }
  return best ? { kind: "opens", weekday: best.weekday, time: best.time } : { kind: "unknown" };
}

export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12}${period}` : `${hour12}:${String(m).padStart(2, "0")}${period}`;
}

export interface StatusLabel {
  open: boolean;
  detail: string | null;
}

export function statusLabel(hall: HallHours, now: Date = new Date()): StatusLabel {
  const open = isOpenNow(hall, now);
  const transition = nextTransition(hall, now);
  const detail =
    transition.kind === "closes"
      ? `until ${formatTime(transition.time)}`
      : transition.kind === "opens"
        ? `opens ${transition.weekday} ${formatTime(transition.time)}`
        : null;
  return { open, detail };
}
