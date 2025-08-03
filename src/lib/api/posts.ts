import {
  type CreateCustomPostRequest,
  type CreatePostCategoryRequest,
  GetPostResponseSchema,
  type GetPostResponse,
  type DeletePostCategoryRequestData,
  type DeleteCustomPostRequest,
} from "../schemas/post"
import { z } from "zod"

export const createCustomPostClient = async ({
  feedId,
  createCustomPostRequest,
}: {
  feedId: string
  createCustomPostRequest: CreateCustomPostRequest
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/feed/${feedId}/post/custom`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createCustomPostRequest.post),
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to create custom post: ${response.status} ${response.statusText}`
      )
    }

    return {
      success: true,
      message: "Custom post created successfully",
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create custom post: ${error.message}`)
    }

    throw new Error("An unexpected error occurred while creating custom post")
  }
}

export const deleteCustomPostClient = async ({
  feedId,
  postId,
}: DeleteCustomPostRequest) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/feed/${feedId}/post/custom/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to delete custom post: ${response.status} ${response.statusText}`
      )
    }

    return {
      success: true,
      message: "Custom post deleted successfully",
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete custom post: ${error.message}`)
    }

    throw new Error("An unexpected error occurred while deleting custom post")
  }
}

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

export const deletePostCategory = async ({
  postId,
  category,
}: DeletePostCategoryRequestData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}/categories`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
        }),
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to delete category: ${response.status} ${response.statusText}`
      )
    }

    return {
      success: true,
      message: "Category deleted successfully",
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete category: ${error.message}`)
    }

    throw new Error("An unexpected error occurred while deleting category")
  }
}

export async function favouritePost(postId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}/favourite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to favourite post: ${response.status} ${response.statusText}`
      )
    }

    return {
      success: true,
      message: "Post favourited successfully",
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to favourite post: ${error.message}`)
    }

    throw new Error("An unexpected error occurred while favouriting post")
  }
}

export async function unfavouritePost(postId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}/unfavourite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to unfavourite post: ${response.status} ${response.statusText}`
      )
    }

    return {
      success: true,
      message: "Post unfavourited successfully",
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to unfavourite post: ${error.message}`)
    }

    throw new Error("An unexpected error occurred while unfavouriting post")
  }
}
