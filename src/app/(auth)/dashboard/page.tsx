import { ContentTabs } from "@/components/content-tabs"
import { DashboardSection } from "@/components/client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient } from "@/utils/query"
import { feedsOptions } from "@/query/feeds"
import { Suspense } from "react"
import { ContentTabsSkeleton } from "@/components/skeletons"
import { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard of your memories",
}

export default async function Page() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(feedsOptions)

  return (
    <>
      {/* HOME PAGE SECTION */}
      <div className="text-muted-foreground flex flex-col gap-4 text-sm">
        <Suspense fallback={<ContentTabsSkeleton />}>
          <ContentTabs />
        </Suspense>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <DashboardSection />
        </HydrationBoundary>
      </div>
    </>
  )
}
