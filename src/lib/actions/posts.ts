"use server";

import { z } from "zod";
import {
  PostSchema,
  PostsResponseSchema,
  type Post,
  type PostsResponse,
} from "../schemas";

export async function fetchPosts(page = 1, limit = 10): Promise<PostsResponse> {
  try {
    const response = await fetch(
      `https://archivebackend.feroxfoxxo.com/api/getPosts?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 300, // Cache for 5 minutes
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch posts: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    const validatedData = PostsResponseSchema.parse(data);

    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid response format: ${error.message}`);
    }

    if (error instanceof Error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }

    throw new Error("An unexpected error occurred while fetching posts");
  }
}

export async function fetchPostById(id: string): Promise<Post> {
  try {
    const response = await fetch(
      `https://archivebackend.feroxfoxxo.com/api/getPosts/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 300, // Cache for 5 minutes
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch post: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const validatedData = PostSchema.parse(data);

    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid response format: ${error.message}`);
    }

    if (error instanceof Error) {
      throw new Error(`Failed to fetch post: ${error.message}`);
    }

    throw new Error("An unexpected error occurred while fetching post");
  }
}
