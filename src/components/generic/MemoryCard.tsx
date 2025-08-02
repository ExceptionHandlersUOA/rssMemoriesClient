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
import { FileType } from "@/lib/schemas/enums"
import { Post } from "@/lib/schemas"

dayjs.extend(relativeTime)

export type MemoryCardProps = Post

export const MemoryCard: FC<MemoryCardProps> = memo(
  ({
    title,
    description,
    body,
    sourceUrl,
    publishedAt,
    media,
    categories,
    favourited,
  }) => {
    const platform = "somewhere"

    // const imageUrl = firstPost?.media?.[0]?.fileName
    //   ? `${process.env.NEXT_PUBLIC_API_URL}/api/getFile/${firstPost?.media?.[0]?.fileName}`
    //   : undefined

    return (
      <Card className="py-4">
        <CardHeader>
          <span className="flex items-center gap-4">
            <CardTitle>
              <a className="text-3xl hover:underline" href={sourceUrl || "#"}>
                {title || "Untitled"}
              </a>
            </CardTitle>
            <CardDescription>
              {publishedAt && dayjs(publishedAt).fromNow()}
              {platform && ` · ${platform}`}
            </CardDescription>
          </span>
          <CardDescription>
            {description || "No description available"}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {description && <p>{description}</p>}

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
        </CardContent>
      </Card>
    )
  }
)

MemoryCard.displayName = "MemoryCard"
