"use client";

import SelectorButton from "./SelectorButton";
import type { DiningHall, HoursData } from "@/lib/types";
import { FAVORITES_ID, QUICK_STOPS_ID } from "@/lib/menu";
import { getHallHours, isOpenNow } from "@/lib/hours";
import { useNowMs } from "@/state/useNow";

interface DiningHallSelectorProps {
  halls: DiningHall[];
  hoursData: HoursData;
  selectedHallId: string;
  onSelect: (hallId: string) => void;
}

export default function DiningHallSelector({
  halls,
  hoursData,
  selectedHallId,
  onSelect,
}: DiningHallSelectorProps) {
  const nowMs = useNowMs();
  const now = nowMs === null ? null : new Date(nowMs);

  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2">
      <SelectorButton
        selected={selectedHallId === FAVORITES_ID}
        onClick={() => onSelect(FAVORITES_ID)}
        label="FAVORITES"
      />
      <SelectorButton
        selected={selectedHallId === QUICK_STOPS_ID}
        onClick={() => onSelect(QUICK_STOPS_ID)}
        label="QUICK STOPS"
      />
      {halls.map((hall) => {
        const hallHours = getHallHours(hoursData, hall.id);
        const tint = now && hallHours ? (isOpenNow(hallHours, now) ? "open" : "closed") : undefined;
        return (
          <SelectorButton
            key={hall.id}
            selected={hall.id === selectedHallId}
            onClick={() => onSelect(hall.id)}
            label={hall.name}
            tint={tint}
          />
        );
      })}
    </div>
  );
}
