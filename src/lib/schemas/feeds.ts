import { z } from "zod"
import { PlatformSchema } from "./enums"
import { WebPostSchema } from "./post"

export const WebFeedSchema = z.object({
  feedId: z.number().int(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  url: z.string().nullable(),
  posts: z.array(WebPostSchema).nullable(),
  categories: z.array(z.string()).nullable().default([]), // always keep even if not in backend schema
  platform: PlatformSchema,
})

export const FeedsResponseSchema = z.array(WebFeedSchema)

export type WebFeed = z.infer<typeof WebFeedSchema>
export type FeedsResponse = z.infer<typeof FeedsResponseSchema>
