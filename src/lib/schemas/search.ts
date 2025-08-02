import { z } from "zod"
import { WebPostSchema } from "./post"

export const SearchResponseSchema = z.array(WebPostSchema)

export type SearchResponse = z.infer<typeof SearchResponseSchema>
