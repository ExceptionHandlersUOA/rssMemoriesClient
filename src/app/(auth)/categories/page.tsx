import {
  MemoriesHeader,
  MemoriesGrid,
  EmptyMemories,
} from "@/components/memories"
import { favourites } from "@/lib/data/favourites"

export const dynamic = "force-dynamic"

export default function CategoriesPage() {
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
