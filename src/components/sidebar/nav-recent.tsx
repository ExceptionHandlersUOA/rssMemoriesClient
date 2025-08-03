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
import { motion } from "framer-motion"
import { useState } from "react"

type PostWithPlatform = Post & {
  platform: Platform
}

export function NavRecent() {
  const [expanded, setExpanded] = useState(true)
  const { data: feeds, isLoading } = useFeeds()
  // const favorites = feeds?.map(({ title, feedId }) => ({
  //   id: feedId,
  //   name: title ?? "Untitled",
  //   url: `/dashboard/memories/${feedId}`,
  //   emoji: "⭐",
  // }))
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
  const recentPosts = allPosts.slice(0, 5)
  const favouritePosts = allPosts.filter(post => post.favourited)

  if (isLoading) {
    return <NavFavoritesSkeleton />
  }

  return (
    <SidebarGroup className="flex flex-col group-data-[collapsible=icon]:hidden">
      {/* <Collapsible> */}
      <SidebarGroupLabel
        onClick={() => setExpanded(prev => !prev)}
        className="select-none"
      >
        Recent
      </SidebarGroupLabel>
      {/* <AnimatePresence> */}
      <motion.div
        animate={{ maxHeight: expanded ? "224px" : "0px" }}
        // exit={{ height: 0, opacity: 0, "--mask-stop": "0%" }}

        className="flex min-h-0 flex-1 flex-col overflow-y-clip"
      >
        <ScrollArea className="h-full max-h-48 flex-1">
          <SidebarMenu>
            {recentPosts.map(item => (
              <SidebarMenuItem key={item.postId}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.sourceUrl ?? "")}
                >
                  <Link
                    href={`/dashboard/memories/${item.postId}`}
                    title={item.title ?? "Untitled"}
                    className="grid grid-cols-[auto_1fr] gap-2"
                  >
                    {/* <span className="inline-flex w-4 items-center justify-center">
                          {item.emoji}
                        </span> */}
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
            ))}
          </SidebarMenu>
        </ScrollArea>
        <SidebarMenu className="mt-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/dashboard"
                className="text-sidebar-foreground grid grid-cols-[auto_1fr] gap-2"
              >
                <Star className="h-4 w-4" />
                <span>View All</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </motion.div>

      {/* </AnimatePresence> */}
    </SidebarGroup>
  )
}
