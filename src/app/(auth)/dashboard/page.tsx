import { PostSection } from "@/components/post-section"
import { DashboardSection } from "@/components/client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient } from "@/utils/query"
import { feedsOptions } from "@/query/feeds"

export default async function Page() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(feedsOptions)

  return (
    <>
      {/* HOME PAGE SECTION */}
      <div className="text-muted-foreground flex flex-col gap-4 text-sm">
        <PostSection />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <DashboardSection />
        </HydrationBoundary>
      </div>
    </>
  )
}
