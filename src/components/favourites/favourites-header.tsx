import { Badge } from "@/components/ui/badge"

type FavouritesHeaderProps = {
  count: number
}

export function FavouritesHeader({ count }: FavouritesHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Favourites</h1>
        <p className="text-muted-foreground">
          Your most important and frequently used pages
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-sm">
          {count} items
        </Badge>
      </div>
    </div>
  )
} 