import { MemoriesHeader, MemoriesGrid, EmptyMemories } from "@/components/memories"
import { favourites } from "@/lib/data/favourites"

export default function MemoriesPage() {
  return (
    <>
      <MemoriesHeader count={favourites.length} />
      
      {favourites.length > 0 ? (
        <MemoriesGrid favourites={favourites} />
      ) : (
        <EmptyMemories />
      )}
    </>
  )
} 