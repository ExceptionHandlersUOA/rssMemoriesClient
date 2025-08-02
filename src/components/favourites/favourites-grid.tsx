import { FavouriteCard } from "./favourite-card"
import type { FavouriteItem } from "@/lib/data/favourites"

type FavouritesGridProps = {
  favourites: FavouriteItem[]
}

export function FavouritesGrid({ favourites }: FavouritesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {favourites.map((item) => (
        <FavouriteCard key={item.name} item={item} />
      ))}
    </div>
  )
} 