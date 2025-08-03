"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Heart } from "lucide-react"
import { type Post } from "@/lib/schemas/post"
import { format } from "date-fns"
import { FileType } from "@/lib/schemas"

type SearchResultCardProps = {
  post: Post
}

export const SearchResultCard = ({ post }: SearchResultCardProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch {
      return "Invalid date"
    }
  }

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-2 text-lg">
            <a
              className="text-2xl hover:underline"
              href={`/dashboard/memories/${post.postId}`}
            >
              {post.title || "Untitled"}
            </a>
          </CardTitle>
          {post.favourited && (
            <Heart className="h-5 w-5 fill-current text-red-500" />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex h-full flex-col justify-between gap-4">
        <div className="space-y-4">
          {post.description && (
            <p
              className="prose prose-h2:mt-1 prose-h1:text-muted-foreground prose-h1:text-lg prose-h2:text-muted-foreground text-muted-foreground prose-a:text-muted-foreground line-clamp-3 text-sm leading-tight"
              dangerouslySetInnerHTML={{
                __html: post.description ?? "",
              }}
            >
              {/* {post.description} */}
            </p>
          )}

          <div className="flex w-xs flex-row items-center justify-center gap-2">
            {post.media
              ?.filter(media => media.type === FileType.Video)
              .map(video => (
                <video
                  key={video.fileName}
                  className="h-fit w-fit rounded-xl"
                  playsInline
                  controls
                >
                  <source
                    src={`${process.env.NEXT_PUBLIC_API_URL}/api/file/${video.fileName}`}
                  />
                </video>
              ))}
          </div>

          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span>Published: {formatDate(post.publishedAt)}</span>
              {post.lastUpdated !== post.publishedAt && (
                <span>Updated: {formatDate(post.lastUpdated)}</span>
              )}
            </div>
          </div>

          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.categories.map(category => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {post.sourceUrl && (
          <Button variant="outline" size="sm" asChild className="w-fit">
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              View Source
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
