"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePost } from "@/query/posts"
import { Skeleton } from "@/components/ui/skeleton"

type MemoryContentCardProps = {
  postId: string
}

export const MemoryContentCard = ({ postId }: MemoryContentCardProps) => {
  const { data: post, isLoading } = usePost(postId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Memory Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <p className="text-muted-foreground">
              {post?.description || "No content available for this memory."}
            </p>
          )}

          {isLoading ? (
            <div className="mt-4 space-y-4">
              <h4 className="font-medium">Media</h4>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {[1, 2, 3].map(index => (
                  <div key={index} className="rounded-lg border p-2">
                    <Skeleton className="mb-1 h-3 w-12" />
                    <div className="bg-muted flex aspect-square items-center justify-center rounded">
                      <Skeleton className="h-16 w-16 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            post?.media &&
            post.media.length > 0 && (
              <div className="mt-4 space-y-4">
                <h4 className="font-medium">Media</h4>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {post.media.map((media, index) => (
                    <div key={index} className="rounded-lg border p-2">
                      <div className="text-muted-foreground mb-1 text-xs">
                        {media.type}
                      </div>
                      {media.fileName && (
                        <div className="bg-muted flex aspect-square items-center justify-center rounded">
                          {media.type === "Image" ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}/api/getFile/${media.fileName}`}
                              alt={`Media ${index + 1}`}
                              className="h-full w-full rounded object-cover"
                            />
                          ) : (
                            <div className="text-muted-foreground text-sm">
                              {media.type} file
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  )
}
