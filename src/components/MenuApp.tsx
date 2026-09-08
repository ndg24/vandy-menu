"use client";

import Header from "./Header";
import StickySelectorBar from "./StickySelectorBar";
import DaySelector from "./DaySelector";
import DiningHallSelector from "./DiningHallSelector";
import MealSelector from "./MealSelector";
import MenuSection from "./MenuSection";
import HallStatusBadge from "./HallStatusBadge";
import QuickStopsSection from "./QuickStopsSection";
import FavoritesSection from "./FavoritesSection";
import type { HoursData, MenuData, QuickStopsData } from "@/lib/types";
import {
  FAVORITES_ID,
  QUICK_STOPS_ID,
  getDishes,
  mealPeriodsForHall,
  orderedHalls,
} from "@/lib/menu";
import { getHallHours } from "@/lib/hours";
import { useMenuSelection } from "@/state/useMenuSelection";
import { useFavorites } from "@/state/useFavorites";

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
  const { favorites, toggleFavorite } = useFavorites();

  const isQuickStops = selectedHallId === QUICK_STOPS_ID;
  const isFavorites = selectedHallId === FAVORITES_ID;
  const validMeals = mealPeriodsForHall(selectedHallId);
  const effectiveMeal = validMeals.includes(selectedMeal) ? selectedMeal : validMeals[0];
  const dishes = selectedHall ? getDishes(selectedHall, selectedDate, effectiveMeal) : [];
  const selectedHallHours = getHallHours(hoursData, selectedHallId);
  const selectedWeekday = allDays.find((d) => d.date === selectedDate)?.weekday ?? "";

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col border-x-0 sm:border-x-2 border-border-black">
      <Header lastSyncedAt={data.scrapedAt} />
      <StickySelectorBar>
        <DaySelector days={allDays} selectedDate={selectedDate} onSelect={setSelectedDate} />
        <DiningHallSelector
          halls={halls}
          hoursData={hoursData}
          selectedHallId={selectedHallId}
          onSelect={setSelectedHallId}
        />
        {!isQuickStops && !isFavorites && (
          <MealSelector
            meals={validMeals}
            selectedMeal={effectiveMeal}
            onSelect={setSelectedMeal}
            hallId={selectedHallId}
            weekday={selectedWeekday}
          />
        )}
      </StickySelectorBar>
      {isFavorites ? (
        <main className="flex-1">
          <FavoritesSection data={data} favorites={favorites} onToggleFavorite={toggleFavorite} />
        </main>
      ) : isQuickStops ? (
        <main className="flex-1">
          <QuickStopsSection data={quickStopsData} />
        </main>
      ) : (
        <>
          <HallStatusBadge hall={selectedHallHours} />
          <main className="flex-1">
            <MenuSection
              period={effectiveMeal}
              hallId={selectedHallId}
              weekday={selectedWeekday}
              dishes={dishes}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </main>
        </>
      )}
    </div>
  );
}
