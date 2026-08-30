import type { MenuData } from "@/lib/types";
import { findFavoriteOccurrences, groupOccurrencesByDish } from "@/lib/favorites";

interface FavoritesSectionProps {
  data: MenuData;
  favorites: Set<string>;
  onToggleFavorite: (dish: string) => void;
}

export default function FavoritesSection({
  data,
  favorites,
  onToggleFavorite,
}: FavoritesSectionProps) {
  const occurrences = findFavoriteOccurrences(data, favorites);
  const grouped = groupOccurrencesByDish(occurrences);

  return (
    <section className="px-4 py-3">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="font-display text-sm tracking-widest">FAVORITES</h2>
        <div className="h-0.5 flex-1 bg-border-black" />
      </div>
      {favorites.size === 0 ? (
        <p className="font-mono text-sm text-neutral-600">
          NO FAVORITES YET — TAP THE STAR ON A DISH TO SAVE IT.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {Array.from(favorites).map((dish) => {
            const occs = grouped.get(dish) ?? [];
            return (
              <div key={dish} className="panel px-3 py-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-mono text-base font-semibold leading-snug">{dish}</div>
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(dish)}
                    aria-label="Remove favorite"
                    className="shrink-0 border-2 border-border-black bg-accent px-2 py-1 font-mono text-sm text-black"
                  >
                    ★
                  </button>
                </div>
                {occs.length === 0 ? (
                  <p className="mt-1 font-mono text-xs text-neutral-600">
                    NOT ON THE MENU THIS WEEK
                  </p>
                ) : (
                  <ul className="mt-1 flex flex-col gap-0.5 font-mono text-xs text-neutral-600">
                    {occs.map((o, i) => (
                      <li key={i}>
                        {o.weekday} {o.hallName.toUpperCase()} {o.period} — {o.station}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
