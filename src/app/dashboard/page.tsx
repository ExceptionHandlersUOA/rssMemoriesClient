import { PostSection } from "@/components/post-section"
import { fetchFeeds } from "@/lib/actions"
import { MemoriesGrid } from "@/components/memories/memories-grid"
import { MemoryCard } from "@/components/generic/MemoryCard"

export default async function Page() {
  const feedsData = await fetchFeeds(1, 10)

  return (
    <>
      {/* HOME PAGE SECTION */}
      <div className="text-muted-foreground flex flex-col gap-4 text-sm">
        <PostSection />
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex flex-col gap-4">
            {feedsData.length > 0 ? (
              feedsData.map(feed => <MemoryCard key={feed.feedId} {...feed} />)
            ) : (
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">No feeds found</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
