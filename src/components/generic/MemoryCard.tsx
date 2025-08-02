import { FC, memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

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
    text?: string;
    videos?: Video[];
    images?: Image[];
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
                {/* TODO: make this waay cooler */}
                <div className="flex flex-row gap-2 justify-center">
                    {videos?.map((video, index) => (
                        <Dialog key={index}>
                            <DialogTrigger className="w-fit even:hidden max-h-full flex-shrink-0">
                                {/* TODO: placeholder for video*/}
                                <img className="cursor-pointer w-fit h-40 max-h-full flex-shrink-0 rounded" src="public/mask-shape-1.svg" alt="Video"   />
                            </DialogTrigger>
                            <DialogContent className="w-fit flex flex-col items-center min-w-5xl">
                                <DialogHeader>
                                    <DialogTitle>Image</DialogTitle>
                                </DialogHeader>
                                <video autoPlay className="rounded aspect-video" key={index} controls width="320" height="160" preload="none">
                                    <source src={video.src} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>

                <div className="flex flex-col gap-2 overflow-x-auto overflow-y-hidden">
                    <div className="flex flex-row gap-2 ">
                        {images?.map((image, index) => (
                            // TODO: extract into component
                            <Dialog key={index}>
                                <DialogTrigger className="w-fit odd:hidden max-h-full flex-shrink-0">                            
                                    <img className="cursor-pointer w-fit h-40 max-h-full flex-shrink-0 rounded" src={image.src} alt={image.alt}   />
                                </DialogTrigger>
                                <DialogContent className="w-fit flex flex-col items-center min-w-5xl">
                                    <DialogHeader>
                                        <DialogTitle>Image</DialogTitle>
                                    </DialogHeader>
                                    <img src={image.src} alt={image.alt} key={index} className="rounded max-w-5xl object-cover h-80" />
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                    <div className="flex flex-row gap-2 ">
                        {images?.map((image, index) => (
                            <Dialog key={index}>
                                <DialogTrigger className="w-fit even:hidden max-h-full flex-shrink-0">                            
                                    <img className="cursor-pointer w-fit h-40 max-h-full flex-shrink-0 rounded" src={image.src} alt={image.alt}   />
                                </DialogTrigger>
                                <DialogContent className="w-fit flex flex-col items-center min-w-5xl">
                                    <DialogHeader>
                                        <DialogTitle>Image</DialogTitle>
                                    </DialogHeader>
                                    <img src={image.src} alt={image.alt} key={index} className="rounded max-w-5xl object-cover h-80" />
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
})

MemoryCard.displayName = "MemoryCard";