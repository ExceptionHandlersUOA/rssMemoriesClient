import { PostSection } from "@/components/post-section";
import { fetchFeeds } from "@/lib/actions";

export default async function Page() {
	const feedsData = await fetchFeeds(1, 10);

  return (
        <>
          {/* HOME PAGE SECTION */}
          <div className="text-sm text-muted-foreground">
            <PostSection />
            <div className="max-w-3xl mx-auto"><p>Fetched {feedsData.length} feeds</p></div>
          </div>
        </>
  )
}
