import { z } from "zod"
import {
  CreatePostCategoryRequest,
  GetPostResponseSchema,
  type GetPostResponse,
} from "../schemas/post"

export const fetchPostByIdClient = async (
  id: string
): Promise<GetPostResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}`,
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

export const createPostCategoryClient = async (
  createPostCategoryRequest: CreatePostCategoryRequest
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/post/${createPostCategoryRequest.id}/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: createPostCategoryRequest.category,
        }),
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to create category: ${response.status} ${response.statusText}`
      )
    }

    return {
      success: true,
      message: "Category created successfully",
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid response format: ${error.message}`)
    }

    if (error instanceof Error) {
      throw new Error(`Failed to create category: ${error.message}`)
    }

    throw new Error("An unexpected error occurred while creating category")
  }
}
