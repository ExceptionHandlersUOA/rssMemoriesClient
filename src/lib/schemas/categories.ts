import { PostSchema } from "./post"
import { z } from "zod"

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  emoji: z.string().optional(),
  count: z.number().default(0),
})

export const CategoriesResponseSchema = z.array(CategorySchema)

export const GetCategoriesResponseSchema = z.array(PostSchema)

export type Category = z.infer<typeof CategorySchema>
export type CategoriesResponse = z.infer<typeof CategoriesResponseSchema>
export type GetCategoriesResponse = z.infer<typeof GetCategoriesResponseSchema>
