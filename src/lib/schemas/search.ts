import { PostSchema } from "./post"
import { z } from "zod"

export const SearchResponseSchema = z.array(PostSchema)

export type SearchResponse = z.infer<typeof SearchResponseSchema>
