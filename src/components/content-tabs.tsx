"use client"

import { useQueryState } from "nuqs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostSection } from "@/components/post-section"
import { AddFeedForm } from "@/components/add-feed/add-feed-form"
import { PenIcon, RssIcon } from "lucide-react"

type TabValue = "post" | "feed"

export const ContentTabs = () => {
  const [activeTab, setActiveTab] = useQueryState<TabValue>("tab", {
    defaultValue: "post",
    parse: (value): TabValue => {
      return value === "feed" ? "feed" : "post"
    },
    serialize: (value): string => {
      return value
    },
  })

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabValue)
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="post" className="flex items-center gap-2">
            <PenIcon className="size-4" />
            <span>Create Post</span>
          </TabsTrigger>
          <TabsTrigger value="feed" className="flex items-center gap-2">
            <RssIcon className="size-4" />
            <span>Add Feed</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="post" className="mt-0">
          <PostSection />
        </TabsContent>
        <TabsContent value="feed" className="mt-0">
          <AddFeedForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
