import {
  GetCategoriesResponseSchema,
  type GetCategoriesResponse,
} from "@/lib/schemas"
import { z } from "zod"

export async function fetchCategories(): Promise<GetCategoriesResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to fetch categories: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()

    const validatedData = GetCategoriesResponseSchema.parse(data)

    return validatedData
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid response format: ${error.message}`)
    }

    if (error instanceof Error) {
      throw new Error(`Failed to fetch categories: ${error.message}`)
    }

    throw new Error("An unexpected error occurred while fetching categories")
  }
}

export async function fetchCategoriesByName(
  categoryName: string
): Promise<GetCategoriesResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to fetch category: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()

    const validatedData = GetCategoriesResponseSchema.parse(data)

    return validatedData
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid response format: ${error.message}`)
    }

    if (error instanceof Error) {
      throw new Error(`Failed to fetch category: ${error.message}`)
    }

    throw new Error("An unexpected error occurred while fetching category")
  }
}
