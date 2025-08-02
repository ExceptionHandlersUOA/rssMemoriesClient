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

export interface MemoryCardProps {
    title: string;
    link: string;
    date: string;
    location: string;
    text: string;
    images: Image[];
}

export const MemoryCard: FC<MemoryCardProps> = memo(({title, link, date, location, text, images}) => {
    return (
        <Card className="py-4">
            <CardHeader className="flex gap-4 items-center justidfy-between">
                <CardTitle ><a className="hover:underline text-3xl" href={link}>{title}</a></CardTitle>
                <CardDescription>{dayjs(date).fromNow()} · {location}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <p>{text}</p>
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