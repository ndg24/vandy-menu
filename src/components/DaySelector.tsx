"use client";

import SelectorButton from "./SelectorButton";

interface DayOption {
  date: string;
  weekday: string;
}

interface DaySelectorProps {
  days: DayOption[];
  selectedDate: string;
  today: string | null;
  onSelect: (date: string) => void;
}

export default function DaySelector({ days, selectedDate, today, onSelect }: DaySelectorProps) {
  if (days.length === 0) return null;

  return (
    <div className="flex gap-1 px-4 py-2">
      {days.map((day) => {
        const dayNum = Number(day.date.slice(-2));
        return (
          <SelectorButton
            key={day.date}
            selected={day.date === selectedDate}
            onClick={() => onSelect(day.date)}
            className="flex flex-1 flex-col items-center px-1! leading-tight"
            label={
              <>
                <span className="block text-xs">{day.weekday}</span>
                <span className="block font-display text-lg">{dayNum}</span>
                {/* Today marker; the invisible bar on other days keeps heights equal. */}
                <span
                  aria-hidden
                  className={`mt-0.5 block h-1 w-4 ${
                    day.date === today ? "bg-border-black" : "bg-transparent"
                  }`}
                />
              </>
            }
          />
        );
      })}
    </div>
  );
}
