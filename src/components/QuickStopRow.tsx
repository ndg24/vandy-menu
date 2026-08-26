"use client";

import { useState } from "react";
import type { HallHours } from "@/lib/types";
import { statusLabel } from "@/lib/hours";
import HoursPanel from "./HoursPanel";

interface QuickStopRowProps {
  location: HallHours;
  now: Date;
}

export default function QuickStopRow({ location, now }: QuickStopRowProps) {
  const [expanded, setExpanded] = useState(false);
  const { open, detail } = statusLabel(location, now);

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="panel flex w-full items-center justify-between gap-2 px-3 py-2 text-left"
      >
        <span className="font-mono text-sm">{location.name}</span>
        <span
          className={`shrink-0 border-2 border-border-black px-2 py-1 font-mono text-xs uppercase tracking-wide ${
            open ? "bg-accent text-black" : "bg-border-black text-card"
          }`}
        >
          {open ? "OPEN" : "CLOSED"}
          {detail ? ` · ${detail}` : ""}
        </span>
      </button>
      {expanded && (
        <div className="mt-1">
          <HoursPanel hall={location} />
        </div>
      )}
    </div>
  );
}
