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

export const FeedsResponseSchema = z.array(FeedSchema)

export const AddFeedUrlRequestSchema = z.object({
  url: z.string().min(1),
})

export const AddCustomFeedRequestSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
})

export type Feed = z.infer<typeof FeedSchema>
export type FeedsResponse = z.infer<typeof FeedsResponseSchema>
export type AddFeedRequest = z.infer<typeof AddFeedUrlRequestSchema>
export type AddCustomFeedRequest = z.infer<typeof AddCustomFeedRequestSchema>
