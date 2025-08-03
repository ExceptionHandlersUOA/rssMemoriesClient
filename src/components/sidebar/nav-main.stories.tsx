import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { NavMain } from "./nav-main"
import { Home, Search, Heart, Plus } from "lucide-react"

const meta: Meta<typeof NavMain> = {
  title: "Components/Sidebar/NavMain",
  component: NavMain,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

const mockItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Memories",
    url: "/memories",
    icon: Heart,
    badge: "12",
  },
  {
    title: "Add",
    url: "#",
    icon: Plus,
    isButton: true,
  },
]

export const Default: Story = {
  args: {
    items: mockItems,
  },
}

export const WithoutBadges: Story = {
  args: {
    items: mockItems.map(item => ({
      ...item,
      badge: undefined,
    })),
  },
}

export const WithMultipleBadges: Story = {
  args: {
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Search",
        url: "/search",
        icon: Search,
        badge: "5",
      },
      {
        title: "Memories",
        url: "/memories",
        icon: Heart,
        badge: "99+",
      },
      {
        title: "Add",
        url: "#",
        icon: Plus,
        isButton: true,
      },
    ],
  },
}

export const LongTitles: Story = {
  args: {
    items: [
      {
        title: "Home Dashboard",
        url: "/",
        icon: Home,
      },
      {
        title: "Advanced Search",
        url: "/search",
        icon: Search,
        badge: "3",
      },
      {
        title: "My Memories Collection",
        url: "/memories",
        icon: Heart,
        badge: "25",
      },
      {
        title: "Add New Feed",
        url: "#",
        icon: Plus,
        isButton: true,
      },
    ],
  },
}
