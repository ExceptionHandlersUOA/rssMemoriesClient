import { PostSection } from "@/components/post-section";
import { fetchPosts } from "@/lib/actions";

export default async function Page() {
	const postsData = await fetchPosts(1, 10);

  return (
        <>
          {/* HOME PAGE SECTION */}
          <div className="text-sm text-muted-foreground">
            <PostSection />
            <div className="max-w-3xl mx-auto"><p>Fetched {postsData.length} posts</p></div>
          </div>
        </>
  )
}
