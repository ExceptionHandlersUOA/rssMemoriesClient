import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export function EmptyFavourites() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        <Star className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No favourites yet</h3>
      <p className="text-muted-foreground mb-4 max-w-sm">
        Start adding pages to your favourites to see them here for quick access.
      </p>
      <Button>
        <Star className="mr-2 h-4 w-4" />
        Add your first favourite
      </Button>
    </div>
  )
} 