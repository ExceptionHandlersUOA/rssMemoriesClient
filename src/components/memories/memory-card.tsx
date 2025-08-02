import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Star,
  ExternalLink,
  MoreHorizontal,
  Trash2,
  Copy,
  StarOff,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import type { WebFeed } from "@/lib/schemas/feeds"

type MemoryCardProps = {
  item: WebFeed
}

export function MemoryCard({ item }: MemoryCardProps) {
  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div className="min-w-0 flex-1">
              <CardTitle className="line-clamp-2 text-base leading-tight">
                <Link href={item.url ?? ""} className="hover:underline">
                  {item.title}
                </Link>
              </CardTitle>
              <div className="mt-1 flex flex-wrap gap-1">
                {item.categories?.slice(0, 2).map(category => (
                  <Badge key={category} variant="outline" className="text-xs">
                    {category}
                  </Badge>
                ))}
                {item.categories?.length && item.categories.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{item.categories.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href={item.url ?? ""}>
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
                Remove from memories
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
        <CardDescription className="mb-3 line-clamp-2">
          {item.description}
        </CardDescription>
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <span>
            Last updated{" "}
            {new Date(item.posts?.[0]?.lastUpdated ?? "").toLocaleDateString()}
          </span>
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
        </div>
      </CardContent>
    </Card>
  )
}
