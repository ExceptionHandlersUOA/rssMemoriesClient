import {
  MemoriesHeader,
  MemoriesGrid,
  EmptyMemories,
} from "@/components/memories"
import { favourites } from "@/lib/data/favourites"
import { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Categories",
  description: "Categories of your memories",
}

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
