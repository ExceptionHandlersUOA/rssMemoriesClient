"use client"

import * as React from "react"
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Star,
  Trash2,
} from "lucide-react"

import { NavFavorites } from "./nav-favorites"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavWorkspaces } from "./nav-workspaces"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import type { WebFeed } from "@/lib/schemas/feeds"

interface SidebarLeftProps extends React.ComponentProps<typeof Sidebar> {
  feeds?: WebFeed[]
}

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Ask AI",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: Star,
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
  workspaces: [
    {
      name: "Childhood Memories",
      emoji: "👶",
      pages: [
        {
          name: "First Steps & Milestones",
          url: "/dashboard/memories/1",
          emoji: "👣",
        },
        {
          name: "School Days & Friends",
          url: "/dashboard/memories/2",
          emoji: "🎒",
        },
        {
          name: "Holiday Traditions",
          url: "/dashboard/memories/3",
          emoji: "🎄",
        },
      ],
    },
    {
      name: "Family Moments",
      emoji: "👨‍👩‍👧‍👦",
      pages: [
        {
          name: "Family Vacations",
          url: "/dashboard/memories/4",
          emoji: "🏖️",
        },
        {
          name: "Sunday Dinners",
          url: "/dashboard/memories/5",
          emoji: "🍽️",
        },
        {
          name: "Game Nights",
          url: "/dashboard/memories/6",
          emoji: "🎲",
        },
      ],
    },
    {
      name: "Special Occasions",
      emoji: "🎉",
      pages: [
        {
          name: "Birthday Celebrations",
          url: "/dashboard/memories/7",
          emoji: "🎂",
        },
        {
          name: "Graduation Day",
          url: "/dashboard/memories/8",
          emoji: "🎓",
        },
        {
          name: "First Job",
          url: "/dashboard/memories/9",
          emoji: "💼",
        },
      ],
    },
    {
      name: "Adventures & Firsts",
      emoji: "🌟",
      pages: [
        {
          name: "First Time Flying",
          url: "/dashboard/memories/10",
          emoji: "✈️",
        },
        {
          name: "Learning to Drive",
          url: "/dashboard/memories/11",
          emoji: "🚗",
        },
        {
          name: "Moving to a New City",
          url: "/dashboard/memories/12",
          emoji: "🏠",
        },
      ],
    },
    {
      name: "Pets & Companions",
      emoji: "🐾",
      pages: [
        {
          name: "First Pet",
          url: "/dashboard/memories/13",
          emoji: "🐕",
        },
        {
          name: "Pet Adventures",
          url: "/dashboard/memories/14",
          emoji: "🐾",
        },
        {
          name: "Saying Goodbye",
          url: "/dashboard/memories/15",
          emoji: "💔",
        },
      ],
    },
  ],
}

export function SidebarLeft({ feeds = [], ...props }: SidebarLeftProps) {
  const favorites = feeds.map(({ title, url, feedId }) => ({
    name: title ?? "Untitled",
    url: `/dashboard/memories/${feedId}`,
    emoji: "⭐", // Default emoji since we don't have emoji in the new structure
  }))

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={favorites} />
        <NavWorkspaces workspaces={data.workspaces} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
