"use client";

import SelectorButton from "./SelectorButton";
import type { MealPeriodName } from "@/lib/types";
import { mealLabel } from "@/lib/menu";

const MEALS: MealPeriodName[] = ["BREAKFAST", "LUNCH", "DINNER"];

interface MealSelectorProps {
  selectedMeal: MealPeriodName;
  onSelect: (meal: MealPeriodName) => void;
  hallId: string;
  weekday: string;
}

export default function MealSelector({
  selectedMeal,
  onSelect,
  hallId,
  weekday,
}: MealSelectorProps) {
  return (
    <div className="flex gap-2 px-4 py-2">
      {MEALS.map((meal) => (
        <SelectorButton
          key={meal}
          selected={meal === selectedMeal}
          onClick={() => onSelect(meal)}
          label={mealLabel(meal, hallId, weekday)}
          className="flex-1"
        />
      ))}
    </div>
  );
}
