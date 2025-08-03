import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SearchResultCard } from "./search-result-card"
import { FileType } from "@/lib/schemas/enums"
import type { Post } from "@/lib/schemas"

const meta: Meta<typeof SearchResultCard> = {
  title: "Components/Posts/SearchResultCard",
  component: SearchResultCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

const mockPost: Post = {
  postId: 1,
  title: "Sample Search Result",
  description:
    "This is a sample search result description with some <strong>HTML content</strong> to test rendering.",
  body: "This is the body content of the search result. It can contain longer text that describes the result in detail.",
  sourceUrl: "https://example.com/sample-result",
  lastUpdated: "2024-01-15T10:30:00Z",
  publishedAt: "2024-01-10T08:00:00Z",
  media: [
    {
      mediaId: 1,
      type: FileType.Image,
      fileName: "sample-image-1.jpg",
    },
  ],
  categories: ["Technology", "Programming", "React"],
  favourited: true,
}

export const Default: Story = {
  args: {
    post: mockPost,
  },
}

export const NotFavourited: Story = {
  args: {
    post: {
      ...mockPost,
      favourited: false,
    },
  },
}

export const WithoutDescription: Story = {
  args: {
    post: {
      ...mockPost,
      description: null,
    },
  },
}

export const WithoutCategories: Story = {
  args: {
    post: {
      ...mockPost,
      categories: null,
    },
  },
}

export const WithoutSourceUrl: Story = {
  args: {
    post: {
      ...mockPost,
      sourceUrl: null,
    },
  },
}

export const LongTitle: Story = {
  args: {
    post: {
      ...mockPost,
      title:
        "This is a very long search result title that should demonstrate how the component handles text overflow and wrapping in the UI",
    },
  },
}

export const LongDescription: Story = {
  args: {
    post: {
      ...mockPost,
      description:
        "This is a very long description that should demonstrate how the component handles text overflow and wrapping in the UI. It contains multiple sentences and should be properly truncated.",
    },
  },
}

export const ManyCategories: Story = {
  args: {
    post: {
      ...mockPost,
      categories: [
        "Technology",
        "Programming",
        "React",
        "TypeScript",
        "Next.js",
        "Frontend",
        "Web Development",
      ],
    },
  },
}

export const UpdatedAfterPublished: Story = {
  args: {
    post: {
      ...mockPost,
      publishedAt: "2024-01-10T08:00:00Z",
      lastUpdated: "2024-01-15T10:30:00Z",
    },
  },
}

export const SameDatePublishedAndUpdated: Story = {
  args: {
    post: {
      ...mockPost,
      publishedAt: "2024-01-10T08:00:00Z",
      lastUpdated: "2024-01-10T08:00:00Z",
    },
  },
}

export const InvalidDate: Story = {
  args: {
    post: {
      ...mockPost,
      publishedAt: "invalid-date",
      lastUpdated: "invalid-date",
    },
  },
}
