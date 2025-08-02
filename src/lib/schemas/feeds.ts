import { z } from "zod"
import { FileTypeSchema, PlatformSchema } from "./enums"

export const WebMediaSchema = z.object({
  mediaId: z.number().int(),
  type: FileTypeSchema,
  fileUrl: z.string().nullable(),
})

export const WebPostSchema = z.object({
  postId: z.number().int(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  sourceUrl: z.string().nullable(),
  lastUpdated: z.string(),
  publishedAt: z.string(),
  media: z.array(WebMediaSchema).nullable(),
  platform: PlatformSchema,
})

export const WebFeedSchema = z.object({
  feedId: z.number().int(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  url: z.string().nullable(),
  posts: z.array(WebPostSchema).nullable(),
  categories: z.array(z.string()).nullable().default([]),
})

export const FeedsResponseSchema = z.array(WebFeedSchema)

export type WebFeed = z.infer<typeof WebFeedSchema>
export type WebPost = z.infer<typeof WebPostSchema>
export type WebMedia = z.infer<typeof WebMediaSchema>
export type FeedsResponse = z.infer<typeof FeedsResponseSchema>
