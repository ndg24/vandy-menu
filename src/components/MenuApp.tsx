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
import type { HoursData, MealPeriodName, MenuData, QuickStopsData } from "@/lib/types";
import type { FavoriteOccurrence } from "@/lib/favorites";
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
    ready,
    today,
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

  // Switching what's shown should start the new list from the top, not
  // wherever the previous (possibly longer) list was scrolled to.
  const scrollToTop = () => window.scrollTo({ top: 0 });
  const selectDate = (date: string) => {
    setSelectedDate(date);
    scrollToTop();
  };
  const selectHall = (hallId: string) => {
    setSelectedHallId(hallId);
    scrollToTop();
  };
  const selectMeal = (meal: MealPeriodName) => {
    setSelectedMeal(meal);
    scrollToTop();
  };
  const selectOccurrence = (o: FavoriteOccurrence) => {
    setSelectedHallId(o.hallId);
    setSelectedDate(o.date);
    setSelectedMeal(o.period);
    scrollToTop();
  };

  // The page is prerendered without knowing today's date; show a loading
  // screen until the client fills it in rather than an empty menu.
  if (!ready) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col border-x-0 sm:border-x-2 border-border-black">
        <Header lastSyncedAt={data.scrapedAt} />
        <main className="flex flex-1 flex-col items-center justify-center gap-3 py-24">
          <div className="font-display text-lg tracking-widest">LOADING</div>
          <div className="flex gap-1.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-3 w-3 animate-pulse border-2 border-border-black bg-accent"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }

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
        <DaySelector
          days={allDays}
          selectedDate={selectedDate}
          today={today}
          onSelect={selectDate}
        />
        <DiningHallSelector
          halls={halls}
          hoursData={hoursData}
          selectedHallId={selectedHallId}
          onSelect={selectHall}
        />
        {!isQuickStops && !isFavorites && (
          <MealSelector
            meals={validMeals}
            selectedMeal={effectiveMeal}
            onSelect={selectMeal}
            hallId={selectedHallId}
            weekday={selectedWeekday}
          />
        )}
      </StickySelectorBar>
      {isFavorites ? (
        <main className="flex-1">
          <FavoritesSection
            data={data}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelectOccurrence={selectOccurrence}
          />
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
