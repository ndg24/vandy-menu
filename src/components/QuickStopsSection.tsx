"use client";

import type { QuickStopsData } from "@/lib/types";
import { useNowMs } from "@/state/useNow";
import QuickStopRow from "./QuickStopRow";

interface QuickStopsSectionProps {
  data: QuickStopsData;
}

export default function QuickStopsSection({ data }: QuickStopsSectionProps) {
  const nowMs = useNowMs();
  if (nowMs === null) return null;
  const now = new Date(nowMs);

  return (
    <section className="px-4 py-3">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="font-display text-sm tracking-widest">QUICK STOPS</h2>
        <div className="h-0.5 flex-1 bg-border-black" />
      </div>
      <div className="flex flex-col gap-2">
        {data.locations.map((loc) => (
          <QuickStopRow key={loc.id} location={loc} now={now} />
        ))}
      </div>
    </section>
  );
}
