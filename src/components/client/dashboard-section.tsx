"use client"

import { MemoryCard } from "@/components/generic/MemoryCard"
import { useFeeds } from "@/query/feeds"
import type { Post } from "@/lib/schemas"
import type { Platform } from "@/lib/schemas/enums"
import dayjs from "dayjs"

type PostWithPlatform = Post & {
  platform: Platform
}

export const DashboardSection = () => {
  const { data: feedsData, isLoading, error } = useFeeds()

  const allPosts: PostWithPlatform[] = []
  feedsData?.forEach(feed => {
    if (feed.posts) {
      const postsWithPlatform = feed.posts.map(post => ({
        ...post,
        platform: feed.platform || "Unknown Platform",
      }))
      allPosts.push(...postsWithPlatform)
    }
  })
  allPosts.sort((a, b) => dayjs(b.publishedAt).diff(dayjs(a.publishedAt)))
  allPosts.forEach(post => console.log(post.publishedAt))

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-col gap-4">
          <div className="text-center">Loading feeds...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-col gap-4">
          <div className="text-destructive text-center">
            Error loading feeds. Please try again.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex flex-col gap-4">
        {allPosts && allPosts.length > 0 ? (
          allPosts.map(post => <MemoryCard key={post.postId} {...post} />)
        ) : (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">No feeds found</h1>
          </div>
        )}
      </div>
    </div>
  )
}
