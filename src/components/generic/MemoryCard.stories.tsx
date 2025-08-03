import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MemoryCard } from "./MemoryCard"
import { Platform, FileType } from "@/lib/schemas/enums"
import type { Post } from "@/lib/schemas"

const meta: Meta<typeof MemoryCard> = {
  title: "Components/Generic/MemoryCard",
  component: MemoryCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    platform: {
      control: { type: "select" },
      options: Object.values(Platform),
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const mockPost: Post = {
  postId: 1,
  title: "Sample Memory Title",
  description:
    "This is a sample memory description with some <strong>HTML content</strong> to test rendering.",
  body: "This is the body content of the memory. It can contain longer text that describes the memory in detail.",
  sourceUrl: "https://example.com/sample-memory",
  lastUpdated: "2024-01-15T10:30:00Z",
  publishedAt: "2024-01-10T08:00:00Z",
  media: [
    {
      mediaId: 1,
      type: FileType.Image,
      fileName: "sample-image-1.jpg",
    },
    {
      mediaId: 2,
      type: FileType.Video,
      fileName: "sample-video-1.mp4",
    },
  ],
  categories: ["Technology", "Programming", "React"],
  favourited: true,
}

export const Default: Story = {
  args: {
    ...mockPost,
    platform: Platform.RSS,
  },
}

export const YouTube: Story = {
  args: {
    ...mockPost,
    platform: Platform.YouTube,
  },
}

export const Instagram: Story = {
  args: {
    ...mockPost,
    platform: Platform.Instagram,
  },
}

export const GitHub: Story = {
  args: {
    ...mockPost,
    platform: Platform.GitHub,
  },
}

export const WithoutMedia: Story = {
  args: {
    ...mockPost,
    media: null,
    platform: Platform.RSS,
  },
}

export const WithoutDescription: Story = {
  args: {
    ...mockPost,
    description: null,
    platform: Platform.RSS,
  },
}

export const WithoutBody: Story = {
  args: {
    ...mockPost,
    body: null,
    platform: Platform.RSS,
  },
}

export const WithoutCategories: Story = {
  args: {
    ...mockPost,
    categories: null,
    platform: Platform.RSS,
  },
}

export const NotFavourited: Story = {
  args: {
    ...mockPost,
    favourited: false,
    platform: Platform.RSS,
  },
}

export const LongTitle: Story = {
  args: {
    ...mockPost,
    title:
      "This is a very long title that should demonstrate how the component handles text overflow and wrapping in the UI",
    platform: Platform.RSS,
  },
}

export const LongDescription: Story = {
  args: {
    ...mockPost,
    description:
      "This is a very long description that should demonstrate how the component handles text overflow and wrapping in the UI. It contains multiple sentences and should be properly truncated.",
    platform: Platform.RSS,
  },
}

export const MultipleImages: Story = {
  args: {
    ...mockPost,
    media: [
      {
        mediaId: 1,
        type: FileType.Image,
        fileName: "sample-image-1.jpg",
      },
      {
        mediaId: 2,
        type: FileType.Image,
        fileName: "sample-image-2.jpg",
      },
      {
        mediaId: 3,
        type: FileType.Image,
        fileName: "sample-image-3.jpg",
      },
      {
        mediaId: 4,
        type: FileType.Image,
        fileName: "sample-image-4.jpg",
      },
    ],
    platform: Platform.RSS,
  },
}

export const MultipleVideos: Story = {
  args: {
    ...mockPost,
    media: [
      {
        mediaId: 1,
        type: FileType.Video,
        fileName: "sample-video-1.mp4",
      },
      {
        mediaId: 2,
        type: FileType.Video,
        fileName: "sample-video-2.mp4",
      },
    ],
    platform: Platform.YouTube,
  },
}

export const MixedMedia: Story = {
  args: {
    ...mockPost,
    media: [
      {
        mediaId: 1,
        type: FileType.Image,
        fileName: "sample-image-1.jpg",
      },
      {
        mediaId: 2,
        type: FileType.Video,
        fileName: "sample-video-1.mp4",
      },
      {
        mediaId: 3,
        type: FileType.Image,
        fileName: "sample-image-2.jpg",
      },
    ],
    platform: Platform.Instagram,
  },
}
