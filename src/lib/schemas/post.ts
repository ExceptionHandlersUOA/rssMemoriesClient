import { z } from "zod"
import { FileTypeSchema } from "./enums"

export const WebMediaSchema = z.object({
  mediaId: z.number().int(),
  type: FileTypeSchema,
  fileName: z.string().nullable(),
})

export const WebPostSchema = z.object({
  postId: z.number().int(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  body: z.string().nullable(),
  sourceUrl: z.string().nullable(),
  lastUpdated: z.string(),
  publishedAt: z.string(),
  media: z.array(WebMediaSchema).nullable(),
  categories: z.array(z.string()).nullable(),
  favourited: z.boolean(),
})

export const GetPostResponseSchema = WebPostSchema

export const CreateCustomPostRequestSchema = z.object({
  id: z.number().int(),
  post: WebPostSchema,
})

export const CreatePostCategoryRequestSchema = z.object({
  id: z.number().int(),
  category: z.string(),
})

export type WebPost = z.infer<typeof WebPostSchema>
export type WebMedia = z.infer<typeof WebMediaSchema>
export type GetPostResponse = z.infer<typeof GetPostResponseSchema>
export type CreateCustomPostRequest = z.infer<
  typeof CreateCustomPostRequestSchema
>
export type CreatePostCategoryRequest = z.infer<
  typeof CreatePostCategoryRequestSchema
>
export type DeletePostCategoryRequestData = {
  postId: number
  category: string
}
