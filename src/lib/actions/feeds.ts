'use server'

import { z } from 'zod'
import {
  FeedsResponseSchema,
  type WebFeed,
  type FeedsResponse,
} from '../schemas'
import { FileType, Platform } from '../schemas/enums'

export async function fetchFeeds(page = 1, limit = 10): Promise<FeedsResponse> {
  'use server'

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getFeeds?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 300, // Cache for 5 minutes
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

    throw new Error('An unexpected error occurred while fetching feeds')
  }
}

export async function fetchFeedById(): Promise<WebFeed> {
  'use server'

  // Mock data for development
  const mockFeed: WebFeed = {
    feedId: 1,
    title: 'First Day of School',
    description:
      'The excitement and nervousness of starting a new chapter in life. Walking through those school doors for the first time, backpack filled with fresh supplies and dreams of new friendships.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    url: 'https://example.com/posts/first-day-of-school',
    posts: [
      {
        postId: 1,
        title: 'First Day of School',
        description:
          'The excitement and nervousness of starting a new chapter in life. Walking through those school doors for the first time, backpack filled with fresh supplies and dreams of new friendships.',
        sourceUrl: 'https://example.com/posts/first-day-of-school',
        lastUpdated: new Date().toISOString(),
        publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        media: [
          {
            mediaId: 1,
            type: FileType.Image,
            fileUrl: 'https://picsum.photos/800/600?random=1',
          },
        ],
        platform: Platform.RSS,
      },
    ],
    categories: ['Childhood', 'Education'],
  }

  return mockFeed

  // TODO: Uncomment when ready to use real API
  /*
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getFeeds/${id}`,
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
        `Failed to fetch feed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const validatedData = FeedSchema.parse(data);

    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid response format: ${error.message}`);
    }

    if (error instanceof Error) {
      throw new Error(`Failed to fetch feed: ${error.message}`);
    }

    throw new Error("An unexpected error occurred while fetching feed");
  }
  */
}
