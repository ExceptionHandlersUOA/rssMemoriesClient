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
import { Platform, Post } from "@/lib/schemas"
import dayjs from "dayjs"
import { Collapsible } from "@radix-ui/react-collapsible"
import { CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { motion } from "framer-motion"

type PostWithPlatform = Post & {
  platform: Platform
}

export function NavFavorites() {
  const { data: feeds, isLoading } = useFeeds()
  const { isMobile } = useSidebar()
  const { isActive } = useActivePath()

  const allPosts: PostWithPlatform[] = []
  feeds?.forEach(feed => {
    if (feed.posts) {
      const postsWithPlatform = feed.posts.map(post => ({
        ...post,
        platform: feed.platform || "Unknown Platform",
      }))
      allPosts.push(...postsWithPlatform)
    }
  })
  allPosts.sort((a, b) => dayjs(b.publishedAt).diff(dayjs(a.publishedAt)))
  const favouritePosts = allPosts.filter(post => post.favourited)

  if (isLoading) {
    return <NavFavoritesSkeleton />
  }

  return (
    <SidebarGroup className="flex flex-col group-data-[collapsible=icon]:hidden">
      <Collapsible defaultOpen>
        <CollapsibleTrigger>
          <SidebarGroupLabel>Favourites</SidebarGroupLabel>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <motion.div className="flex min-h-0 flex-1 flex-col">
            <ScrollArea className="max-h-48 flex-1">
              <SidebarMenu>
                {favouritePosts.length > 0 ? (
                  favouritePosts.map(item => (
                    <SidebarMenuItem key={item.postId}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(
                          `/dashboard/memories/${item.postId}`
                        )}
                      >
                        <Link
                          href={`/dashboard/memories/${item.postId}`}
                          title={item.title ?? "Untitled"}
                          className="grid grid-cols-[auto_1fr] gap-2"
                        >
                          <span>{item.title ?? "Untitled"}</span>
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
                  ))
                ) : (
                  <SidebarMenuItem>
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <Star className="text-muted-foreground/50 mb-2 h-8 w-8" />
                      <p className="text-muted-foreground text-sm">
                        No favourites yet
                      </p>
                      <p className="text-muted-foreground/70 mt-1 text-xs">
                        Star posts to see them here
                      </p>
                    </div>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </ScrollArea>
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  )
}
