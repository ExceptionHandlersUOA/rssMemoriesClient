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

dayjs.extend(relativeTime)

// TODO: move to shared dir
export type Image = {
  src: string
  alt: string
}
export type Video = {
  src: string
}

export interface MemoryCardProps {
  title: string
  description: string
  link: string
  date: string
  location: string
  text?: string
  videos?: Video[]
  images?: Image[]
}

export const MemoryCard: FC<MemoryCardProps> = memo(
  ({ title, description, link, date, location, text, videos, images }) => {
    return (
      <Card className="py-4">
        <CardHeader>
          <span className="flex items-center gap-4">
            <CardTitle>
              <a className="text-3xl hover:underline" href={link}>
                {title}
              </a>
            </CardTitle>
            <CardDescription>
              {dayjs(date).fromNow()} · {location}
            </CardDescription>
          </span>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <p>{text}</p>

          {/* TODO: make this cool */}
          {/* TODO: make this waay cooler */}
          <div className="flex flex-row justify-center gap-2">
            {videos?.map((video, index) => (
              <Dialog key={index}>
                <DialogTrigger className="max-h-full w-fit flex-shrink-0 even:hidden">
                  {/* TODO: placeholder for video*/}
                  <img
                    className="h-40 max-h-full w-fit flex-shrink-0 cursor-pointer rounded"
                    src="public/mask-shape-1.svg"
                    alt="Video"
                  />
                </DialogTrigger>
                <DialogContent className="flex w-fit min-w-5xl flex-col items-center">
                  <DialogHeader>
                    <DialogTitle>Image</DialogTitle>
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
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          <div className="flex flex-col gap-2 overflow-x-auto overflow-y-hidden">
            <div className="flex flex-row gap-2">
              {images?.map((image, index) => (
                // TODO: extract into component
                <Dialog key={index}>
                  <DialogTrigger className="max-h-full w-fit flex-shrink-0 odd:hidden">
                    <img
                      className="h-40 max-h-full w-fit flex-shrink-0 cursor-pointer rounded"
                      src={image.src}
                      alt={image.alt}
                    />
                  </DialogTrigger>
                  <DialogContent className="flex w-fit min-w-5xl flex-col items-center">
                    <DialogHeader>
                      <DialogTitle>Image</DialogTitle>
                    </DialogHeader>
                    <img
                      src={image.src}
                      alt={image.alt}
                      key={index}
                      className="h-80 max-w-5xl rounded object-cover"
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
            <div className="flex flex-row gap-2">
              {images?.map((image, index) => (
                <Dialog key={index}>
                  <DialogTrigger className="max-h-full w-fit flex-shrink-0 even:hidden">
                    <img
                      className="h-40 max-h-full w-fit flex-shrink-0 cursor-pointer rounded"
                      src={image.src}
                      alt={image.alt}
                    />
                  </DialogTrigger>
                  <DialogContent className="flex w-fit min-w-5xl flex-col items-center">
                    <DialogHeader>
                      <DialogTitle>Image</DialogTitle>
                    </DialogHeader>
                    <img
                      src={image.src}
                      alt={image.alt}
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
