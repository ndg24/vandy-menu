"use client";

import SelectorButton from "./SelectorButton";
import type { DiningHall } from "@/lib/types";

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
