"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Edit } from "lucide-react"
import Link from "next/link"
import { usePost } from "@/query/posts"
import { Skeleton } from "@/components/ui/skeleton"

type MemoryHeaderProps = {
  postId: string
}

export const MemoryHeader = ({ postId }: MemoryHeaderProps) => {
  const { data: post, isLoading } = usePost(postId)

  const title = post?.title || "Memory Details"
  const description =
    post?.description || "View and manage your cherished memory"

  return (
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
              {isLoading ? <Skeleton className="h-9 w-48" /> : title}
            </h1>
            {isLoading ? (
              <Skeleton className="h-5 w-64" />
            ) : (
              <p className="text-muted-foreground max-w-md truncate">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div> */}
    </div>
  )
}
