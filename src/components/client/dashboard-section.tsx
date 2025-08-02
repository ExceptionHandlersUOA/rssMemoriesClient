"use client"

import { MemoryCard } from "@/components/generic/MemoryCard"
import { useFeeds } from "@/query/feeds"
import {
  useAddFeed,
  useAddCustomFeed,
  useDeleteFeed,
} from "@/lib/mutations/feeds"
import { Button } from "@/components/ui/button"
import { WebPost } from "@/lib/schemas"
import { Platform } from "@/lib/schemas/enums"
import dayjs from "dayjs"

type WebPostWithPlatform = WebPost & {
  platform: Platform
}

export const DashboardSection = () => {
  const { data: feedsData, isLoading, error } = useFeeds()
  const addFeedMutation = useAddFeed()
  const addCustomFeedMutation = useAddCustomFeed()
  const deleteCustomFeedMutation = useDeleteFeed()

  const allPosts: WebPostWithPlatform[] = []
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

  const handleTestAddCustomFeed = () => {
    const testCustomFeedData = {
      title: "My Custom Feed",
      description: "This is a test custom feed created by the mutation",
      imageUrl: "https://picsum.photos/400/300?random=2",
      url: "https://example.com/my-custom-feed",
    }

    addCustomFeedMutation.mutate(testCustomFeedData, {
      onSuccess: () => {
        console.log("Custom feed added successfully!")
        // Optionally reload feeds here
      },
      onError: error => {
        console.error("Failed to add custom feed:", error)
      },
    })
  }

  const handleTestDeleteCustomFeed = () => {
    // Use a test feed ID - replace with actual ID from your feeds
    const testFeedId = "2"

    deleteCustomFeedMutation.mutate(testFeedId, {
      onSuccess: () => {
        console.log("Custom feed deleted successfully!")
        // Optionally reload feeds here
      },
      onError: error => {
        console.error("Failed to delete custom feed:", error)
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
        {/* Test Add Feed Buttons */}
        <div className="mb-4 space-y-4">
          <div>
            <Button
              onClick={handleTestAddFeed}
              disabled={addFeedMutation.isPending}
              variant="outline"
              className="mb-2"
            >
              {addFeedMutation.isPending ? "Adding Feed..." : "Test Add Feed"}
            </Button>

            {addFeedMutation.isError && (
              <div className="bg-destructive/10 text-destructive mb-2 rounded p-2">
                Error: {addFeedMutation.error?.message || "Failed to add feed"}
              </div>
            )}

            {addFeedMutation.isSuccess && (
              <div className="mb-2 rounded bg-green-100 p-2 text-green-800">
                Feed added successfully!
              </div>
            )}
          </div>

          <div>
            <Button
              onClick={handleTestAddCustomFeed}
              disabled={addCustomFeedMutation.isPending}
              variant="outline"
              className="mb-2"
            >
              {addCustomFeedMutation.isPending
                ? "Adding Custom Feed..."
                : "Test Add Custom Feed"}
            </Button>

            {addCustomFeedMutation.isError && (
              <div className="bg-destructive/10 text-destructive mb-2 rounded p-2">
                Error:{" "}
                {addCustomFeedMutation.error?.message ||
                  "Failed to add custom feed"}
              </div>
            )}

            {addCustomFeedMutation.isSuccess && (
              <div className="mb-2 rounded bg-green-100 p-2 text-green-800">
                Custom feed added successfully!
              </div>
            )}
          </div>

          <div>
            <Button
              onClick={handleTestDeleteCustomFeed}
              disabled={deleteCustomFeedMutation.isPending}
              variant="destructive"
              className="mb-2"
            >
              {deleteCustomFeedMutation.isPending
                ? "Deleting Custom Feed..."
                : "Test Delete Custom Feed"}
            </Button>

            {deleteCustomFeedMutation.isError && (
              <div className="bg-destructive/10 text-destructive mb-2 rounded p-2">
                Error:{" "}
                {deleteCustomFeedMutation.error?.message ||
                  "Failed to delete custom feed"}
              </div>
            )}

            {deleteCustomFeedMutation.isSuccess && (
              <div className="mb-2 rounded bg-green-100 p-2 text-green-800">
                Custom feed deleted successfully!
              </div>
            )}
          </div>
        </div>

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
