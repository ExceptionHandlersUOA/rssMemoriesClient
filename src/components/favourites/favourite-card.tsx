import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, MoreHorizontal, Trash2, Copy, StarOff } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import type { FavouriteItem } from "@/lib/data/favourites"

type FavouriteCardProps = {
  item: FavouriteItem
}

export function FavouriteCard({ item }: FavouriteCardProps) {
  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{item.emoji}</span>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base line-clamp-2 leading-tight">
                <Link href={item.url} className="hover:underline">
                  {item.name}
                </Link>
              </CardTitle>
              <Badge variant="outline" className="mt-1 text-xs">
                {item.category}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href={item.url}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Memory
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Copy link
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <StarOff className="mr-2 h-4 w-4" />
                Remove from favourites
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="line-clamp-2 mb-3">
          {item.description}
        </CardDescription>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last accessed {item.lastAccessed}</span>
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
        </div>
      </CardContent>
    </Card>
  )
} 