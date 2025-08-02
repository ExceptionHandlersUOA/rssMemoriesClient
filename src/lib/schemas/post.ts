import { z } from "zod"
import { FileTypeSchema } from "./enums"

export const MediaSchema = z.object({
  mediaId: z.number().int(),
  type: FileTypeSchema,
  fileName: z.string().nullable(),
})

export const PostSchema = z.object({
  postId: z.number().int(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  body: z.string().nullable(),
  sourceUrl: z.string().nullable(),
  lastUpdated: z.string(),
  publishedAt: z.string(),
  media: z.array(MediaSchema).nullable(),
  categories: z.array(z.string()).nullable(),
  favourited: z.boolean(),
})

export const GetPostResponseSchema = PostSchema

export const AddCustomPostRequestSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  media: z.array(
    z.object({
      type: FileTypeSchema,
      fileName: z.string().nullable(),
    })
  ),
  body: z.string().nullable(),
  sourceUrl: z.string().nullable(),
  lastUpdated: z.string().optional(),
  publishedAt: z.string().optional(),
  categories: z.array(z.string()).nullable(),
  favourited: z.boolean().optional(),
})

export const CreateCustomPostRequestSchema = z.object({
  id: z.number().int(),
  post: AddCustomPostRequestSchema,
})

export const CreatePostCategoryRequestSchema = z.object({
  id: z.number().int(),
  category: z.string(),
})

export type Post = z.infer<typeof PostSchema>
export type Media = z.infer<typeof MediaSchema>
export type GetPostResponse = z.infer<typeof GetPostResponseSchema>
export type AddCustomPostRequest = z.infer<typeof AddCustomPostRequestSchema>
export type CreateCustomPostRequest = z.infer<
  typeof CreateCustomPostRequestSchema
>
export type DeleteCustomPostRequest = {
  feedId: string
  postId: string
}
export type CreatePostCategoryRequest = z.infer<
  typeof CreatePostCategoryRequestSchema
>
export type DeletePostCategoryRequestData = {
  postId: number
  category: string
}
