"use client";

import SelectorButton from "./SelectorButton";
import type { DiningHall } from "@/lib/types";
import { FAVORITES_ID, QUICK_STOPS_ID } from "@/lib/menu";

interface DiningHallSelectorProps {
  halls: DiningHall[];
  selectedHallId: string;
  onSelect: (hallId: string) => void;
}

export default function DiningHallSelector({
  halls,
  selectedHallId,
  onSelect,
}: DiningHallSelectorProps) {
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
      {halls.map((hall) => (
        <SelectorButton
          key={hall.id}
          selected={hall.id === selectedHallId}
          onClick={() => onSelect(hall.id)}
          label={hall.name}
        />
      ))}
    </div>
  );
}
