import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient } from "@/utils/query"
import { postOptions } from "@/query/posts"
import { MemorySection, MemoryHeader } from "@/components/client"
import { Metadata } from "next"

type Props = {
  params: Promise<{
    id: string
  }>
}

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Memory",
  description: "Memory details",
}

export default async function MemoryPage({ params }: Props) {
  const decodedId = decodeURIComponent((await params).id)

  const queryClient = getQueryClient()
  queryClient.prefetchQuery(postOptions(decodedId))

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MemoryHeader postId={decodedId} />
      </HydrationBoundary>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MemorySection postId={decodedId} />
      </HydrationBoundary>
    </>
  )
}
