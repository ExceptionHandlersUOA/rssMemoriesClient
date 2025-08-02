import { z } from "zod"
import { FileTypeSchema } from "./enums"

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
})

export const GetPostResponseSchema = WebPostSchema

export type WebPost = z.infer<typeof WebPostSchema>
export type WebMedia = z.infer<typeof WebMediaSchema>
export type GetPostResponse = z.infer<typeof GetPostResponseSchema>
