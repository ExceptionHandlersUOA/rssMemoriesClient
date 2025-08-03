"use client"

import { type LucideIcon } from "lucide-react"
import Link from "next/link"
import { useQueryState } from "nuqs"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useActivePath } from "@/hooks/use-active-path"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    badge?: string
    isButton?: boolean
  }[]
}) {
  const { isActive } = useActivePath()
  const [, setIsAddFeedOpen] = useQueryState("add-feed", {
    defaultValue: false,
    parse: (value): boolean => {
      return value === "true"
    },
    serialize: (value): string => {
      return value ? "true" : "false"
    },
  })

  return (
    <SidebarMenu>
      {items.map(item => (
        <SidebarMenuItem key={item.title}>
          {item.isButton ? (
            <SidebarMenuButton
              onClick={() => {
                if (item.title === "Add Feed") {
                  setIsAddFeedOpen(true)
                }
              }}
            >
              <item.icon />
              <span>{item.title}</span>
              {item.badge && (
                <span className="bg-primary text-primary-foreground ml-auto rounded-full px-2 py-0.5 text-xs">
                  {item.badge}
                </span>
              )}
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton asChild isActive={isActive(item.url)}>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
                {item.badge && (
                  <span className="bg-primary text-primary-foreground ml-auto rounded-full px-2 py-0.5 text-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
