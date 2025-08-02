import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Heart,
  Share2,
  Edit,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchPostById } from "@/lib/actions"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function MemoryPage({ params }: Props) {
  const decodedId = decodeURIComponent((await params).id)

  const post = await fetchPostById(decodedId)

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
                {post.title || "Untitled Post"}
              </h1>
              <p className="text-muted-foreground">
                {post.description || "No description available"}
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
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
                  {post.lastUpdated && dayjs(post.lastUpdated).fromNow()}
                </span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>
                  Published{" "}
                  {post.publishedAt && dayjs(post.publishedAt).fromNow()}
                </span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Source: {post.sourceUrl || "No source available"}</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Users className="h-4 w-4" />
                <span>Media count: {post.media?.length || 0} items</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Memory Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground">
                  {post.description || "No content available for this memory."}
                </p>

                {post.media && post.media.length > 0 && (
                  <div className="mt-4 space-y-4">
                    <h4 className="font-medium">Media</h4>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                      {post.media.map((media, index) => (
                        <div key={index} className="rounded-lg border p-2">
                          <div className="text-muted-foreground mb-1 text-xs">
                            {media.type}
                          </div>
                          {media.fileUrl && (
                            <div className="bg-muted flex aspect-square items-center justify-center rounded">
                              {media.type === "Image" ? (
                                <img
                                  src={media.fileUrl}
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
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Heart className="mr-2 h-4 w-4" />
                Add to Favourites
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share Memory
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Memory
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Post Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <div className="text-muted-foreground">Post ID</div>
                <div className="font-medium">{post.postId}</div>
              </div>
              {post.sourceUrl && (
                <div className="text-sm">
                  <div className="text-muted-foreground">Source URL</div>
                  <div className="font-medium">
                    <a
                      href={post.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Source
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
