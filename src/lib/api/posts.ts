import { z } from "zod"
import { GetPostResponseSchema, type GetPostResponse } from "../schemas/post"

export const fetchPostByIdClient = async (
  id: string
): Promise<GetPostResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/feed/post/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to fetch post: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()
    const validatedData = GetPostResponseSchema.parse(data)

    return validatedData
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid response format: ${error.message}`)
    }

    if (error instanceof Error) {
      throw new Error(`Failed to fetch post: ${error.message}`)
    }

    throw new Error("An unexpected error occurred while fetching post")
  }
}
