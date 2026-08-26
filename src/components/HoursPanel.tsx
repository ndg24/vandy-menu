import type { HallHours } from "@/lib/types";
import { WEEKDAYS, formatTime } from "@/lib/hours";

interface HoursPanelProps {
  hall: HallHours;
}

export default function HoursPanel({ hall }: HoursPanelProps) {
  return (
    <div className="panel px-3 py-2 font-mono text-xs">
      {WEEKDAYS.map((day) => {
        const windows = hall.windows.filter((w) => w.weekday === day);
        return (
          <div key={day} className="flex items-baseline justify-between gap-2 py-0.5">
            <span className="tracking-wide text-neutral-600">{day}</span>
            <span className="text-right">
              {windows.length === 0
                ? "CLOSED"
                : windows.map((w) => `${formatTime(w.open)}–${formatTime(w.close)}`).join(", ")}
            </span>
          </div>
        );
      })}
    </div>
  );
}
