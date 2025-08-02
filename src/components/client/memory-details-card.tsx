"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar, MapPin, Users } from "lucide-react"
import { usePost } from "@/query/posts"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Skeleton } from "@/components/ui/skeleton"

dayjs.extend(relativeTime)

type MemoryDetailsCardProps = {
  postId: string
}

export const MemoryDetailsCard = ({ postId }: MemoryDetailsCardProps) => {
  const { data: post, isLoading } = usePost(postId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Memory Details</CardTitle>
        <CardDescription>
          This is where your cherished memory lives
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4" />
          <span>
            Last updated{" "}
            {isLoading ? (
              <Skeleton className="inline-block h-4 w-20" />
            ) : (
              post?.lastUpdated && dayjs(post.lastUpdated).fromNow()
            )}
          </span>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4" />
          <span>
            Published{" "}
            {isLoading ? (
              <Skeleton className="inline-block h-4 w-20" />
            ) : (
              post?.publishedAt && dayjs(post.publishedAt).fromNow()
            )}
          </span>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4" />
          <span>
            Source:{" "}
            {isLoading ? (
              <Skeleton className="inline-block h-4 w-32" />
            ) : (
              post?.sourceUrl || "No source available"
            )}
          </span>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Users className="h-4 w-4" />
          <span>
            Media count:{" "}
            {isLoading ? (
              <Skeleton className="inline-block h-4 w-8" />
            ) : (
              `${post?.media?.length || 0} items`
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
