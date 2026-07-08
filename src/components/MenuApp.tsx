"use client";

import Header from "./Header";
import StickySelectorBar from "./StickySelectorBar";
import DaySelector from "./DaySelector";
import DiningHallSelector from "./DiningHallSelector";
import MealSelector from "./MealSelector";
import MenuSection from "./MenuSection";
import type { MenuData } from "@/lib/types";
import { getDishes, orderedHalls } from "@/lib/menu";
import { useMenuSelection } from "@/state/useMenuSelection";

export default function MenuApp({ data }: { data: MenuData }) {
  const halls = orderedHalls(data);
  const {
    allDays,
    selectedHallId,
    setSelectedHallId,
    selectedDate,
    setSelectedDate,
    selectedMeal,
    setSelectedMeal,
    selectedHall,
  } = useMenuSelection(data);

  const dishes = selectedHall ? getDishes(selectedHall, selectedDate, selectedMeal) : [];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col border-x-0 sm:border-x-2 border-border-black">
      <Header lastSyncedAt={data.scrapedAt} />
      <StickySelectorBar>
        <DaySelector days={allDays} selectedDate={selectedDate} onSelect={setSelectedDate} />
        <DiningHallSelector
          halls={halls}
          selectedHallId={selectedHallId}
          onSelect={setSelectedHallId}
        />
        <MealSelector selectedMeal={selectedMeal} onSelect={setSelectedMeal} />
      </StickySelectorBar>
      <main className="flex-1">
        <MenuSection period={selectedMeal} dishes={dishes} />
      </main>
    </div>
  );
}
