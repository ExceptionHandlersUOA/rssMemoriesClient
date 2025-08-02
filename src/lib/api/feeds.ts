import { z } from "zod"
import {
  type AddFeedRequest,
  FeedsResponseSchema,
  type FeedsResponse,
} from "../schemas"

export const fetchFeedsClient = async (
  page = 1,
  limit = 10
): Promise<FeedsResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getFeeds?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to fetch feeds: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()

    const validatedData = FeedsResponseSchema.parse(data)

    return validatedData
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid response format: ${error.message}`)
    }

    if (error instanceof Error) {
      throw new Error(`Failed to fetch feeds: ${error.message}`)
    }

    throw new Error("An unexpected error occurred while fetching feeds")
  }
}

export async function addFeed(addFeedRequestData: AddFeedRequest) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/addFeed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addFeedRequestData),
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to add feed: ${response.status} ${response.statusText}`
      )
    }

    return {
      success: true,
      message: "Feed added successfully",
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to add feed: ${error.message}`)
    }

    throw new Error("An unexpected error occurred while adding feed")
  }
}
