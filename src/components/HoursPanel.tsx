import type { HallHours, Weekday } from "@/lib/types";
import { WEEKDAYS, formatDayHours } from "@/lib/hours";

interface HoursPanelProps {
  hall: HallHours;
  highlightDay?: Weekday;
}

export default function HoursPanel({ hall, highlightDay }: HoursPanelProps) {
  return (
    <div className="panel px-3 py-2 font-mono text-xs">
      {WEEKDAYS.map((day) => {
        const isHighlighted = day === highlightDay;
        return (
          <div
            key={day}
            className={`flex items-baseline justify-between gap-2 py-0.5 ${isHighlighted ? "font-semibold" : ""}`}
            aria-current={isHighlighted ? "date" : undefined}
          >
            <span
              className={`tracking-wide ${
                isHighlighted ? "-mx-1 bg-border-black px-1 text-card" : "text-neutral-600"
              }`}
            >
              {day}
            </span>
            <span className="text-right">{formatDayHours(hall, day)}</span>
          </div>
        );
      })}
    </div>
  );
}
