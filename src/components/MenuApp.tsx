"use client";

import Header from "./Header";
import StickySelectorBar from "./StickySelectorBar";
import DaySelector from "./DaySelector";
import DiningHallSelector from "./DiningHallSelector";
import MealSelector from "./MealSelector";
import MenuSection from "./MenuSection";
import HallStatusBadge from "./HallStatusBadge";
import QuickStopsSection from "./QuickStopsSection";
import type { HoursData, MenuData, QuickStopsData } from "@/lib/types";
import { QUICK_STOPS_ID, getDishes, orderedHalls } from "@/lib/menu";
import { getHallHours } from "@/lib/hours";
import { useMenuSelection } from "@/state/useMenuSelection";

export default function MenuApp({
  data,
  hoursData,
  quickStopsData,
}: {
  data: MenuData;
  hoursData: HoursData;
  quickStopsData: QuickStopsData;
}) {
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

  const isQuickStops = selectedHallId === QUICK_STOPS_ID;
  const dishes = selectedHall ? getDishes(selectedHall, selectedDate, selectedMeal) : [];
  const selectedHallHours = getHallHours(hoursData, selectedHallId);

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
        {!isQuickStops && <MealSelector selectedMeal={selectedMeal} onSelect={setSelectedMeal} />}
      </StickySelectorBar>
      {isQuickStops ? (
        <main className="flex-1">
          <QuickStopsSection data={quickStopsData} />
        </main>
      ) : (
        <>
          <HallStatusBadge hall={selectedHallHours} />
          <main className="flex-1">
            <MenuSection period={selectedMeal} dishes={dishes} />
          </main>
        </>
      )}
    </div>
  );
}
