import { FC, memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

// TODO: move to shared dir
export type Image = {
    src: string;
    alt: string;
}
export type Video = {
    src: string;
}

export interface MemoryCardProps {
    title: string;
    description: string;
    link: string;
    date: string;
    location: string;
    text: string;
    videos: Video[];
    images: Image[];
}

export const MemoryCard: FC<MemoryCardProps> = memo(({title, description, link, date, location, text, videos, images}) => {
    return (
        <Card className="py-4">
            <CardHeader>
                <span className="flex gap-4 items-center">
                    <CardTitle><a className="hover:underline text-3xl" href={link}>{title}</a></CardTitle>
                    <CardDescription>{dayjs(date).fromNow()} · {location}</CardDescription>
                </span>
                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                <p>{text}</p>

                {/* TODO: make this cool */}
                <div className="flex flex-row gap-2 justify-center">
                    {videos.map((video, index) => (
                        <video className="rounded" key={index} controls width="320" height="160" preload="none">
                            <source src={video.src} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ))}
                </div>

                <div className="flex flex-col gap-2 overflow-x-auto overflow-y-hidden">
                    <div className="flex flex-row gap-2">
                        {images.map((image, index) => (
                            <img src={image.src} alt={image.alt} key={index} className="w-fit even:hidden h-40 max-h-full flex-shrink-0 rounded" />
                        ))}
                    </div>
                    <div className="flex flex-row gap-2 ">
                        {images.map((image, index) => (
                            <img src={image.src} alt={image.alt} key={index} className="w-fit odd:hidden h-40 max-h-full flex-shrink-0 rounded" />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
})