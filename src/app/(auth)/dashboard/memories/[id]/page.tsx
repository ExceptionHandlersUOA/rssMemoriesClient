import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient } from "@/utils/query"
import { postOptions } from "@/query/posts"
import { MemorySection, MemoryHeader } from "@/components/client"

type Props = {
  params: Promise<{
    id: string
  }>
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
