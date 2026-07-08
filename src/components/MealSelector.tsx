"use client";

import SelectorButton from "./SelectorButton";
import type { MealPeriodName } from "@/lib/types";

const MEALS: MealPeriodName[] = ["BREAKFAST", "LUNCH", "DINNER"];

interface MealSelectorProps {
  selectedMeal: MealPeriodName;
  onSelect: (meal: MealPeriodName) => void;
}

export default function MealSelector({ selectedMeal, onSelect }: MealSelectorProps) {
  return (
    <div className="flex gap-2 px-4 py-2">
      {MEALS.map((meal) => (
        <SelectorButton
          key={meal}
          selected={meal === selectedMeal}
          onClick={() => onSelect(meal)}
          label={meal}
          className="flex-1"
        />
      ))}
    </div>
  );
}
