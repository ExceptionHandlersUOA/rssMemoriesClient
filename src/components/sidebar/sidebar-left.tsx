"use client"

import * as React from "react"
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
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
      title: "Favourites",
      url: "/dashboard/favourites",
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
  favorites: [
    {
      name: "First Day of School",
      url: "/dashboard/favourites/First Day of School",
      emoji: "🎒",
    },
    {
      name: "Family Vacation to Disney World",
      url: "/dashboard/favourites/Family Vacation to Disney World",
      emoji: "🏰",
    },
    {
      name: "Learning to Ride a Bike",
      url: "/dashboard/favourites/Learning to Ride a Bike",
      emoji: "🚴",
    },
    {
      name: "Grandma's Sunday Dinners",
      url: "/dashboard/favourites/Grandma's Sunday Dinners",
      emoji: "🍽️",
    },
    {
      name: "First Pet - Goldfish Named Bubbles",
      url: "/dashboard/favourites/First Pet - Goldfish Named Bubbles",
      emoji: "🐠",
    },
    {
      name: "Building a Treehouse with Dad",
      url: "/dashboard/favourites/Building a Treehouse with Dad",
      emoji: "🌳",
    },
    {
      name: "First Snow Day",
      url: "/dashboard/favourites/First Snow Day",
      emoji: "❄️",
    },
    {
      name: "Mom's Bedtime Stories",
      url: "/dashboard/favourites/Mom's Bedtime Stories",
      emoji: "📖",
    },
    {
      name: "First Time Swimming in the Ocean",
      url: "/dashboard/favourites/First Time Swimming in the Ocean",
      emoji: "🌊",
    },
    {
      name: "Birthday Party at the Park",
      url: "/dashboard/favourites/Birthday Party at the Park",
      emoji: "🎉",
    },
  ],
  workspaces: [
    {
      name: "Childhood Memories",
      emoji: "👶",
      pages: [
        {
          name: "First Steps & Milestones",
          url: "/dashboard/favourites/First Steps & Milestones",
          emoji: "👣",
        },
        {
          name: "School Days & Friends",
          url: "/dashboard/favourites/School Days & Friends",
          emoji: "🎒",
        },
        {
          name: "Holiday Traditions",
          url: "/dashboard/favourites/Holiday Traditions",
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
          url: "/dashboard/favourites/Family Vacations",
          emoji: "🏖️",
        },
        {
          name: "Sunday Dinners",
          url: "/dashboard/favourites/Sunday Dinners",
          emoji: "🍽️",
        },
        {
          name: "Game Nights",
          url: "/dashboard/favourites/Game Nights",
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
          url: "/dashboard/favourites/Birthday Celebrations",
          emoji: "🎂",
        },
        {
          name: "Graduation Day",
          url: "/dashboard/favourites/Graduation Day",
          emoji: "🎓",
        },
        {
          name: "First Job",
          url: "/dashboard/favourites/First Job",
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
          url: "/dashboard/favourites/First Time Flying",
          emoji: "✈️",
        },
        {
          name: "Learning to Drive",
          url: "/dashboard/favourites/Learning to Drive",
          emoji: "🚗",
        },
        {
          name: "Moving to a New City",
          url: "/dashboard/favourites/Moving to a New City",
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
          url: "/dashboard/favourites/First Pet",
          emoji: "🐕",
        },
        {
          name: "Pet Adventures",
          url: "/dashboard/favourites/Pet Adventures",
          emoji: "🐾",
        },
        {
          name: "Saying Goodbye",
          url: "/dashboard/favourites/Saying Goodbye",
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
