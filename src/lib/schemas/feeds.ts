import { z } from "zod"
import { PostSchema } from "./post"
import { PlatformSchema } from "./enums"

export const FeedSchema = z.object({
  feedId: z.number().int(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  url: z.string().nullable(),
  posts: z.array(PostSchema).nullable(),
  // categories: z.array(z.string()).nullable().default([]), // always keep even if not in backend schema
  platform: PlatformSchema,
})

export type Feed = z.infer<typeof FeedSchema>
