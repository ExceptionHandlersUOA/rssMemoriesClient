import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Edit } from "lucide-react"
import Link from "next/link"
import { MemorySection } from "@/components/client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient } from "@/utils/query"
import { postOptions } from "@/query/posts"

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
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Memories
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">⭐</span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Memory Details
              </h1>
              <p className="text-muted-foreground">
                View and manage your cherished memory
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MemorySection postId={decodedId} />
      </HydrationBoundary>
    </>
  )
}
