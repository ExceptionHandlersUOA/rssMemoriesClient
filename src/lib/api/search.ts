import { SearchResponseSchema, type SearchResponse } from "../schemas/search"
import { z } from "zod"

export const searchPostsClient = async (
  query: string
): Promise<SearchResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/search?query=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to search posts: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()
    const validatedData = SearchResponseSchema.parse(data)

    return validatedData
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid response format: ${error.message}`)
    }

    if (error instanceof Error) {
      throw new Error(`Failed to search posts: ${error.message}`)
    }

    throw new Error("An unexpected error occurred while searching posts")
  }
}
