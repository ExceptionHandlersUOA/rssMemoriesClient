"use client"

import { MemoryCard } from "@/components/generic/MemoryCard"
import { useFeeds } from "@/query/feeds"
import { useAddFeed } from "@/lib/mutations/feeds"
import { Button } from "@/components/ui/button"

export const DashboardSection = () => {
  const { data: feedsData, isLoading, error } = useFeeds()
  const addFeedMutation = useAddFeed()

  const handleTestAddFeed = () => {
    const testFeedData = {
      url: "https://www.hoverth.net/index.xml",
    }

    addFeedMutation.mutate(testFeedData, {
      onSuccess: () => {
        console.log("Feed added successfully!")
        // Optionally reload feeds here
      },
      onError: error => {
        console.error("Failed to add feed:", error)
      },
    })
  }

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex flex-col gap-4">
          <div className="text-center">Loading feeds...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex flex-col gap-4">
          <div className="text-destructive text-center">
            Error loading feeds. Please try again.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="flex flex-col gap-4">
        {/* Test Add Feed Button */}
        <div className="mb-4">
          <Button
            onClick={handleTestAddFeed}
            disabled={addFeedMutation.isPending}
            variant="outline"
            className="mb-4"
          >
            {addFeedMutation.isPending ? "Adding Feed..." : "Test Add Feed"}
          </Button>

          {addFeedMutation.isError && (
            <div className="bg-destructive/10 text-destructive mb-4 rounded p-2">
              Error: {addFeedMutation.error?.message || "Failed to add feed"}
            </div>
          )}

          {addFeedMutation.isSuccess && (
            <div className="mb-4 rounded bg-green-100 p-2 text-green-800">
              Feed added successfully!
            </div>
          )}
        </div>

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
