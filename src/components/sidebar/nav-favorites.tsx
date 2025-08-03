"use client"

import {
  ArrowUpRight,
  MoreHorizontal,
  StarOff,
  Trash2,
  Star,
} from "lucide-react"
import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useActivePath } from "@/hooks/use-active-path"
import { useFeeds } from "@/query/feeds"
import { NavFavoritesSkeleton } from "@/components/skeletons"

// THIS IS ACTUALLY supposed to be NavFeeds and has a list of all feeds, but decided to play safe
// and leave all names the same to avoid any import problems
export function NavFavorites() {
  const { data: feeds, isLoading } = useFeeds()
  const favorites = feeds?.map(({ title, feedId }) => ({
    id: feedId,
    name: title ?? "Untitled",
    url: `/dashboard/memories/${feedId}`,
    emoji: "⭐",
  }))
  const { isMobile } = useSidebar()
  const { isActive } = useActivePath()

  if (isLoading) {
    return <NavFavoritesSkeleton />
  }

  return (
    <SidebarGroup className="flex flex-col group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Feeds</SidebarGroupLabel>
      <div className="flex min-h-0 flex-1 flex-col">
        <ScrollArea className="max-h-48 flex-1">
          <SidebarMenu>
            {favorites?.map(item => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild isActive={isActive(item.url)}>
                  <Link
                    href={item.url}
                    title={item.name}
                    className="grid grid-cols-[auto_1fr] gap-2"
                  >
                    <span className="inline-flex w-4 items-center justify-center">
                      {item.emoji}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    <DropdownMenuItem>
                      <StarOff className="text-muted-foreground" />
                      <span>Remove from Favorites</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <ArrowUpRight className="text-muted-foreground" />
                      <span>Copy Link</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ArrowUpRight className="text-muted-foreground" />
                      <span>Open in New Tab</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Trash2 className="text-muted-foreground" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
        <SidebarMenu className="mt-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/dashboard/favorites"
                className="text-sidebar-foreground grid grid-cols-[auto_1fr] gap-2"
              >
                <Star className="h-4 w-4" />
                <span>View All</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </SidebarGroup>
  )
}
