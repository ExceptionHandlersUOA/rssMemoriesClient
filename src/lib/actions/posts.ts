"use server";

import { z } from "zod";
import { PostsResponseSchema, type Post, type PostsResponse } from "../schemas";

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
  // Mock data for development
  const mockPost: Post = {
    id: id,
    title: "First Day of School",
    description:
      "The excitement and nervousness of starting a new chapter in life. Walking through those school doors for the first time, backpack filled with fresh supplies and dreams of new friendships.",
    sourceUrl: "https://example.com/posts/first-day-of-school",
    lastUpdated: new Date().toISOString(),
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    media: [
      {
        type: 1, // Image
        fileUrl: "https://picsum.photos/800/600?random=1",
      },
    ],
    platform: 3, // RSS
  };

  return mockPost;

  // TODO: Uncomment when ready to use real API
  /*
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
  */
}
