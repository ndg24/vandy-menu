"use client";

import { useState } from "react";
import type { HallHours, Weekday } from "@/lib/types";
import { formatDayHours, statusLabel } from "@/lib/hours";
import { useNowMs } from "@/state/useNow";
import HoursPanel from "./HoursPanel";

interface HallStatusBadgeProps {
  hall?: HallHours;
  weekday: Weekday;
  // Live open/closed only makes sense for today; other days show that day's hours.
  isToday: boolean;
}

export default function HallStatusBadge({ hall, weekday, isToday }: HallStatusBadgeProps) {
  const [expanded, setExpanded] = useState(false);
  const nowMs = useNowMs();

  if (!hall || nowMs === null) return null;

  let text: string;
  let colors: string;
  if (isToday) {
    const { open, detail } = statusLabel(hall, new Date(nowMs));
    text = `${open ? "OPEN" : "CLOSED"}${detail ? ` · ${detail}` : ""}`;
    colors = open ? "bg-accent text-black" : "bg-border-black text-card";
  } else {
    text = `${weekday} HOURS · ${formatDayHours(hall, weekday)}`;
    colors = "bg-card text-black";
  }

  return (
    <div className="px-4 pb-2">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className={`border-2 border-border-black px-2 py-1 font-mono text-xs uppercase tracking-wide ${colors}`}
      >
        {text}
      </button>
      {expanded && (
        <div className="mt-2">
          <HoursPanel hall={hall} highlightDay={weekday} />
        </div>
      )}
    </div>
  );
}
