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
import { favourites } from "@/lib/data/favourites"

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
      title: "Memories",
      url: "/dashboard/memories",
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
  favorites: favourites.map(({ title, sourceUrl }) => ({
    name: title,
    url: sourceUrl,
    emoji: "⭐", // Default emoji since we don't have emoji in the new structure
  })),
  workspaces: [
    {
      name: "Childhood Memories",
      emoji: "👶",
      pages: [
        {
          name: "First Steps & Milestones",
          url: "/dashboard/memories/First Steps & Milestones",
          emoji: "👣",
        },
        {
          name: "School Days & Friends",
          url: "/dashboard/memories/School Days & Friends",
          emoji: "🎒",
        },
        {
          name: "Holiday Traditions",
          url: "/dashboard/memories/Holiday Traditions",
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
          url: "/dashboard/memories/Family Vacations",
          emoji: "🏖️",
        },
        {
          name: "Sunday Dinners",
          url: "/dashboard/memories/Sunday Dinners",
          emoji: "🍽️",
        },
        {
          name: "Game Nights",
          url: "/dashboard/memories/Game Nights",
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
          url: "/dashboard/memories/Birthday Celebrations",
          emoji: "🎂",
        },
        {
          name: "Graduation Day",
          url: "/dashboard/memories/Graduation Day",
          emoji: "🎓",
        },
        {
          name: "First Job",
          url: "/dashboard/memories/First Job",
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
          url: "/dashboard/memories/First Time Flying",
          emoji: "✈️",
        },
        {
          name: "Learning to Drive",
          url: "/dashboard/memories/Learning to Drive",
          emoji: "🚗",
        },
        {
          name: "Moving to a New City",
          url: "/dashboard/memories/Moving to a New City",
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
          url: "/dashboard/memories/First Pet",
          emoji: "🐕",
        },
        {
          name: "Pet Adventures",
          url: "/dashboard/memories/Pet Adventures",
          emoji: "🐾",
        },
        {
          name: "Saying Goodbye",
          url: "/dashboard/memories/Saying Goodbye",
          emoji: "💔",
        },
      ],
    },
  ],
}

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        <NavWorkspaces workspaces={data.workspaces} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
