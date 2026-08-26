"use client";

import { useState } from "react";
import type { HallHours } from "@/lib/types";
import { statusLabel } from "@/lib/hours";
import { useNowMs } from "@/state/useNow";
import HoursPanel from "./HoursPanel";

interface HallStatusBadgeProps {
  hall?: HallHours;
}

export default function HallStatusBadge({ hall }: HallStatusBadgeProps) {
  const [expanded, setExpanded] = useState(false);
  const nowMs = useNowMs();

  if (!hall || nowMs === null) return null;

  const { open, detail } = statusLabel(hall, new Date(nowMs));

  return (
    <div className="px-4 pb-2">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className={`border-2 border-border-black px-2 py-1 font-mono text-xs uppercase tracking-wide ${
          open ? "bg-accent text-black" : "bg-border-black text-card"
        }`}
      >
        {open ? "OPEN" : "CLOSED"}
        {detail ? ` · ${detail}` : ""}
      </button>
      {expanded && (
        <div className="mt-2">
          <HoursPanel hall={hall} />
        </div>
      )}
    </div>
  );
}
