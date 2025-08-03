import { FC, memo } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { FileType, Platform } from "@/lib/schemas/enums"
import { Post } from "@/lib/schemas"
import { Button } from "../ui/button"
import { ExternalLink } from "lucide-react"

dayjs.extend(relativeTime)

export interface MemoryCardProps extends Post {
  platform: Platform
}

export const MemoryCard: FC<MemoryCardProps> = memo(
  ({
    postId,
    title,
    description,
    body,
    sourceUrl,
    publishedAt,
    media,
    categories,
    favourited,
    platform,
  }) => {
    // const imageUrl = firstPost?.media?.[0]?.fileName
    //   ? `${process.env.NEXT_PUBLIC_API_URL}/api/getFile/${firstPost?.media?.[0]?.fileName}`
    //   : undefined

    return (
      <Card className="py-4">
        <CardHeader>
          <CardTitle>
            <a
              className="text-2xl hover:underline"
              href={`/dashboard/memories/${postId}`}
            >
              {title || "Untitled"}
            </a>
          </CardTitle>
          <CardDescription>
            {publishedAt && dayjs(publishedAt).fromNow()}
            {platform && ` · ${platform}`}
          </CardDescription>
          <CardDescription
            className="prose prose-h2:mt-1 prose-h2:text-foreground prose-a:text-foreground line-clamp-4 w-full max-w-none text-wrap"
            dangerouslySetInnerHTML={{
              __html: description ?? "",
            }}
          ></CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {body && body.length >= 0 && (
            <p className="line-clamp-5 whitespace-break-spaces">{body}</p>
          )}

          {/* TODO: make this cool */}
          {/* TODO: make this waay cooler */}
          <div className="flex flex-row justify-center gap-2">
            {media
              ?.filter(media => media.type === FileType.Video)
              .map((video, index) => (
                <Dialog key={index}>
                  <DialogTrigger className="max-h-full w-fit flex-shrink-0 even:hidden">
                    {/* TODO: placeholder for video*/}
                    <img
                      className="h-40 max-h-full w-fit flex-shrink-0 cursor-pointer rounded"
                      src="/mask-shape-1.svg"
                      alt="Video"
                    />
                  </DialogTrigger>
                  <DialogContent className="flex w-fit min-w-5xl flex-col items-center">
                    <DialogHeader>
                      <DialogTitle>Video</DialogTitle>
                    </DialogHeader>
                    <video
                      autoPlay
                      className="aspect-video rounded"
                      key={index}
                      controls
                      width="320"
                      height="160"
                      preload="none"
                    >
                      <source
                        src={`${process.env.NEXT_PUBLIC_API_URL}/api/getFile/${video.fileName}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </DialogContent>
                </Dialog>
              ))}
          </div>

          <div className="flex flex-col gap-2 overflow-x-auto overflow-y-hidden">
            <div className="flex flex-row gap-2">
              {media
                ?.filter(media => media.type === FileType.Image)
                .map((image, index) => (
                  // TODO: extract into component
                  <Dialog key={index}>
                    <DialogTrigger className="max-h-full w-fit flex-shrink-0 odd:hidden">
                      <img
                        className="h-40 max-h-full w-fit flex-shrink-0 cursor-pointer rounded"
                        src={`${process.env.NEXT_PUBLIC_API_URL}/api/getFile/${image.fileName}`}
                        alt={`Image ${index + 1}`}
                      />
                    </DialogTrigger>
                    <DialogContent className="flex w-fit min-w-5xl flex-col items-center">
                      <DialogHeader>
                        <DialogTitle>Image</DialogTitle>
                      </DialogHeader>
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}/api/getFile/${image.fileName}`}
                        alt={`Image ${index + 1}`}
                        key={index}
                        className="h-80 max-w-5xl rounded object-cover"
                      />
                    </DialogContent>
                  </Dialog>
                ))}
            </div>
            <div className="flex flex-row gap-2">
              {media
                ?.filter(media => media.type === FileType.Image)
                .map((image, index) => (
                  <Dialog key={index}>
                    <DialogTrigger className="max-h-full w-fit flex-shrink-0 even:hidden">
                      <img
                        className="h-40 max-h-full w-fit flex-shrink-0 cursor-pointer rounded"
                        src={`${process.env.NEXT_PUBLIC_API_URL}/api/getFile/${image.fileName}`}
                        alt={`Image ${index + 1}`}
                      />
                    </DialogTrigger>
                    <DialogContent className="flex w-fit min-w-5xl flex-col items-center">
                      <DialogHeader>
                        <DialogTitle>Image</DialogTitle>
                      </DialogHeader>
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}/api/getFile/${image.fileName}`}
                        alt={`Image ${index + 1}`}
                        key={index}
                        className="h-80 max-w-5xl rounded object-cover"
                      />
                    </DialogContent>
                  </Dialog>
                ))}
            </div>
          </div>

          {sourceUrl && (
            <Button variant="outline" size="sm" asChild className="w-fit">
              <a
                href={sourceUrl}
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
)

MemoryCard.displayName = "MemoryCard"
