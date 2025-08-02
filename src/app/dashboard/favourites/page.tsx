import { FavouritesHeader, FavouritesGrid, EmptyFavourites } from "@/components/favourites"
import { favourites } from "@/lib/data/favourites"

export default function FavouritesPage() {
  return (
    <>
      <FavouritesHeader count={favourites.length} />
      
      {favourites.length > 0 ? (
        <FavouritesGrid favourites={favourites} />
      ) : (
        <EmptyFavourites />
      )}
    </>
  )
} 