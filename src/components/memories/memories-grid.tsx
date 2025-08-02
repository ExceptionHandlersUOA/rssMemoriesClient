import { MemoryCard } from "./memory-card"
import type { FavouriteItem } from "@/lib/data/favourites"

type MemoriesGridProps = {
  favourites: FavouriteItem[]
}

export function MemoriesGrid({ favourites }: MemoriesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {favourites.map((item) => (
        <MemoryCard key={item.name} item={item} />
      ))}
    </div>
  )
} 