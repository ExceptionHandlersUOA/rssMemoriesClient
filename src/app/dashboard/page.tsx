import { PostSection } from "@/components/post-section"
import { fetchFeeds } from "@/lib/actions"

export default async function Page() {
  const feedsData = await fetchFeeds(1, 10)

  return (
    <>
      {/* HOME PAGE SECTION */}
      <div className="text-muted-foreground text-sm">
        <PostSection />
        <div className="mx-auto max-w-3xl">
          <p>Fetched {feedsData.length} feeds</p>
        </div>
      </div>
    </>
  )
}
