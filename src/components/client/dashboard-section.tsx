"use client"

import { MemoryCard } from "@/components/generic/MemoryCard"
import { useFeeds } from "@/query/feeds"

export const DashboardSection = () => {
  const { data: feedsData, isLoading, error } = useFeeds()

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
        {feedsData && feedsData.length > 0 ? (
          feedsData.map(feed => <MemoryCard key={feed.feedId} {...feed} />)
        ) : (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">No feeds found</h1>
          </div>
        )}
      </div>
    </div>
  )
}
