"use client";

import SelectorButton from "./SelectorButton";
import type { MealPeriodName } from "@/lib/types";
import { mealLabel } from "@/lib/menu";

interface MealSelectorProps {
  meals: MealPeriodName[];
  selectedMeal: MealPeriodName;
  onSelect: (meal: MealPeriodName) => void;
  hallId: string;
  weekday: string;
}

export default function MealSelector({
  meals,
  selectedMeal,
  onSelect,
  hallId,
  weekday,
}: MealSelectorProps) {
  return (
    <div className="flex gap-2 px-4 py-2">
      {meals.map((meal) => (
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
