"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePost } from "@/query/posts"
import { Skeleton } from "@/components/ui/skeleton"

type MemoryInfoCardProps = {
  postId: string
}

export const MemoryInfoCard = ({ postId }: MemoryInfoCardProps) => {
  const { data: post, isLoading } = usePost(postId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm">
          <div className="text-muted-foreground">Post ID</div>
          <div className="font-medium">
            {isLoading ? <Skeleton className="h-4 w-16" /> : post?.postId}
          </div>
        </div>
        <div className="text-sm">
          <div className="text-muted-foreground">Source URL</div>
          <div className="font-medium">
            {isLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : post?.sourceUrl ? (
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Source
              </a>
            ) : (
              "No source available"
            )}
          </div>
        </div>
        <div className="text-sm">
          <div className="text-muted-foreground">Categories</div>
          <div className="font-medium">
            {isLoading ? (
              <Skeleton className="h-4 w-32" />
            ) : post?.categories && post.categories.length > 0 ? (
              post.categories.join(", ")
            ) : (
              "No categories"
            )}
          </div>
        </div>
        <div className="text-sm">
          <div className="text-muted-foreground">Favourited</div>
          <div className="font-medium">
            {isLoading ? (
              <Skeleton className="h-4 w-8" />
            ) : post?.favourited ? (
              "Yes"
            ) : (
              "No"
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
