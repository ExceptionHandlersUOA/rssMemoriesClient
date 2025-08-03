import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MemoryCard } from "./memory-card"
import { Platform } from "@/lib/schemas/enums"
import type { Feed } from "@/lib/schemas/feeds"

const meta: Meta<typeof MemoryCard> = {
  title: "Components/Memories/MemoryCard",
  component: MemoryCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

const mockFeed: Feed = {
  feedId: 1,
  title: "Sample Memory Feed",
  description:
    "This is a sample memory feed description that shows how the component displays feed information.",
  imageUrl: "https://example.com/feed-image.jpg",
  url: "https://example.com/feed-url",
  posts: [
    {
      postId: 1,
      title: "Sample Post Title",
      description: "Sample post description",
      body: "Sample post body",
      sourceUrl: "https://example.com/post",
      lastUpdated: "2024-01-15T10:30:00Z",
      publishedAt: "2024-01-10T08:00:00Z",
      media: null,
      categories: ["Technology"],
      favourited: true,
    },
  ],
  platform: Platform.RSS,
}

export const Default: Story = {
  args: {
    item: mockFeed,
  },
}

export const LongTitle: Story = {
  args: {
    item: {
      ...mockFeed,
      title:
        "This is a very long memory feed title that should demonstrate how the component handles text overflow and wrapping in the UI",
    },
  },
}

export const LongDescription: Story = {
  args: {
    item: {
      ...mockFeed,
      description:
        "This is a very long description that should demonstrate how the component handles text overflow and wrapping in the UI. It contains multiple sentences and should be properly truncated.",
    },
  },
}

export const WithoutDescription: Story = {
  args: {
    item: {
      ...mockFeed,
      description: null,
    },
  },
}

export const WithoutUrl: Story = {
  args: {
    item: {
      ...mockFeed,
      url: null,
    },
  },
}

export const WithoutPosts: Story = {
  args: {
    item: {
      ...mockFeed,
      posts: null,
    },
  },
}

export const MultiplePosts: Story = {
  args: {
    item: {
      ...mockFeed,
      posts: [
        {
          postId: 1,
          title: "First Post",
          description: "First post description",
          body: "First post body",
          sourceUrl: "https://example.com/post1",
          lastUpdated: "2024-01-15T10:30:00Z",
          publishedAt: "2024-01-10T08:00:00Z",
          media: null,
          categories: ["Technology"],
          favourited: true,
        },
        {
          postId: 2,
          title: "Second Post",
          description: "Second post description",
          body: "Second post body",
          sourceUrl: "https://example.com/post2",
          lastUpdated: "2024-01-14T09:20:00Z",
          publishedAt: "2024-01-09T07:00:00Z",
          media: null,
          categories: ["Programming"],
          favourited: false,
        },
      ],
    },
  },
}

export const YouTubePlatform: Story = {
  args: {
    item: {
      ...mockFeed,
      platform: Platform.YouTube,
    },
  },
}

export const InstagramPlatform: Story = {
  args: {
    item: {
      ...mockFeed,
      platform: Platform.Instagram,
    },
  },
}

export const GitHubPlatform: Story = {
  args: {
    item: {
      ...mockFeed,
      platform: Platform.GitHub,
    },
  },
}

export const CustomPlatform: Story = {
  args: {
    item: {
      ...mockFeed,
      platform: Platform.Custom,
    },
  },
}
