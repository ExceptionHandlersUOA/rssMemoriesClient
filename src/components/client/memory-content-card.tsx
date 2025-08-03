"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePost } from "@/query/posts"
import { Skeleton } from "@/components/ui/skeleton"
import { FileType } from "@/lib/schemas"
import { Media } from "@/lib/schemas/post"
import {
  FileAudio,
  FileImage,
  FileVideo,
  FileText,
  FileQuestion,
  XIcon,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { useState } from "react"

type MemoryContentCardProps = {
  postId: string
}

export const MemoryContentCard = ({ postId }: MemoryContentCardProps) => {
  const { data: post, isLoading } = usePost(postId)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const renderMediaContent = (media: Media, index: number) => {
    const fileUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/file/${media.fileName}`

    switch (media.type) {
      case FileType.Image:
        return (
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="focus:ring-primary h-full w-full rounded object-cover transition-transform hover:scale-105 focus:ring-2 focus:outline-none"
                onClick={() => setSelectedImage(fileUrl)}
              >
                <img
                  src={fileUrl}
                  alt={`Image ${index + 1}`}
                  className="h-full w-full rounded object-cover"
                />
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-[90vw] overflow-clip p-0">
              <img
                src={fileUrl}
                alt={`Image ${index + 1}`}
                className="h-full w-full object-contain"
              />
            </DialogContent>
          </Dialog>
        )

      case FileType.Video:
        return (
          <video className="h-fit w-fit" playsInline controls>
            <source src={fileUrl} />
            Your browser does not support the video tag.
          </video>
        )

      case FileType.Audio:
        return (
          <audio className="w-full" controls>
            <source src={fileUrl} />
            Your browser does not support the audio tag.
          </audio>
        )

      case FileType.Document:
        return (
          <div className="flex items-center justify-center p-4">
            <div className="text-center">
              <FileText className="text-muted-foreground mx-auto mb-2 h-12 w-12" />
              <p className="text-muted-foreground text-sm">{media.fileName}</p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm hover:underline"
              >
                Download Document
              </a>
            </div>
          </div>
        )

      case FileType.Unknown:
      default:
        return (
          <div className="flex items-center justify-center p-4">
            <div className="text-center">
              <FileQuestion className="text-muted-foreground mx-auto mb-2 h-12 w-12" />
              <p className="text-muted-foreground text-sm">{media.fileName}</p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm hover:underline"
              >
                Download File
              </a>
            </div>
          </div>
        )
    }
  }

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
            <p className="text-muted-foreground">{post?.description || ""}</p>
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {post.media.map((media, index) => (
                    <div key={index} className="rounded-lg border p-3">
                      <div className="text-muted-foreground mb-2 text-xs font-medium">
                        {media.type}
                      </div>
                      {media.fileName && (
                        <div className="bg-muted/50 flex min-h-[120px] items-center justify-center rounded">
                          {renderMediaContent(media, index)}
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
