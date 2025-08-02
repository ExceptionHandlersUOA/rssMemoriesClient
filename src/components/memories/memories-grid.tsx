import { MemoryCard } from "./memory-card"
import type { Feed } from "@/lib/schemas/feeds"

type MemoriesGridProps = {
  favourites: Feed[]
}

export function MemoriesGrid({ favourites }: MemoriesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {favourites.map(item => (
        <MemoryCard key={item.feedId} item={item} />
      ))}
    </div>
  )
}
