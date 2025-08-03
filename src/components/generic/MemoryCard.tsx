import { FC, memo, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { FileType, Platform } from "@/lib/schemas/enums"
import { Post } from "@/lib/schemas"
import { ExternalLink } from "lucide-react"
import { useFavouritePost, useUnfavouritePost } from "@/lib/mutations/posts"
import { cn } from "@/lib/utils"
import { StarIcon } from "lucide-react"
import { Button } from "../ui/button"
import Image from "next/image"

dayjs.extend(utc)
dayjs.extend(timezone)
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
    favourited,
    media,
    platform,
  }) => {
    const [localFavourited, setLocalFavourited] = useState(favourited)
    // const imageUrl = firstPost?.media?.[0]?.fileName
    //   ? `${process.env.NEXT_PUBLIC_API_URL}/api/getFile/${firstPost?.media?.[0]?.fileName}`
    //   : undefined

    const favouritePost = useFavouritePost()
    const unfavouritePost = useUnfavouritePost()

    const toggleFavourite = () => {
      if (localFavourited) {
        unfavouritePost.mutateAsync(postId.toString())
        setLocalFavourited(false) // Update local state immediately
      } else {
        favouritePost.mutateAsync(postId.toString())
        setLocalFavourited(true) // Update local state immediately
      }
    }

    return (
      <Card className="py-4">
        <CardHeader>
          <CardTitle className={cn("flex flex-row justify-between gap-2")}>
            <a
              className="text-2xl hover:underline"
              href={`/dashboard/memories/${postId}`}
            >
              {title || "Untitled"}
            </a>
            <Button variant="ghost" onClick={toggleFavourite} className="p-1">
              {localFavourited ? (
                <StarIcon stroke="#000000" fill="#000000" />
              ) : (
                <StarIcon stroke="#000000" />
              )}
            </Button>
          </CardTitle>
          <CardDescription>
            {publishedAt && dayjs.utc(publishedAt).local().fromNow()}
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

          <div className="flex w-sm flex-row items-center justify-center gap-2">
            {media
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

          <div className="flex flex-col gap-2 overflow-x-auto overflow-y-hidden">
            <div className="flex flex-row gap-2">
              {media
                ?.filter(media => media.type === FileType.Image)
                .map((image, index) => (
                  // TODO: extract into component ~ brandon
                  // NAH YOU SUCK ~ brandon
                  <Dialog key={index}>
                    <DialogTrigger className="max-h-full w-fit flex-shrink-0 odd:hidden">
                      <Image
                        className="h-40 max-h-full w-fit flex-shrink-0 cursor-pointer rounded"
                        src={`${process.env.NEXT_PUBLIC_API_URL}/api/file/${image.fileName}`}
                        alt={`Image ${index + 1}`}
                        width={200}
                        height={125}
                      />
                    </DialogTrigger>
                    <DialogContent className="flex max-h-[80vh] w-fit min-w-5xl flex-col items-center">
                      <DialogHeader>
                        <DialogTitle>Image</DialogTitle>
                      </DialogHeader>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/api/file/${image.fileName}`}
                        alt={`Image ${index + 1}`}
                        key={index}
                        className="h-80 max-w-5xl rounded object-cover"
                        width={800}
                        height={600}
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
                      <Image
                        className="max-h-full w-fit flex-shrink-0 cursor-pointer rounded"
                        src={`${process.env.NEXT_PUBLIC_API_URL}/api/file/${image.fileName}`}
                        alt={`Image ${index + 1}`}
                        width={200}
                        height={125}
                      />
                    </DialogTrigger>
                    <DialogContent className="flex max-h-[80vh] w-fit min-w-5xl flex-col items-center overflow-scroll">
                      <DialogHeader>
                        <DialogTitle>Image</DialogTitle>
                      </DialogHeader>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/api/file/${image.fileName}`}
                        alt={`Image ${index + 1}`}
                        key={index}
                        className="max-w-5xl rounded object-cover"
                        width={800}
                        height={600}
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
