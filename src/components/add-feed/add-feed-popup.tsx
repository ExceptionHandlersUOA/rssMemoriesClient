"use client"

import { useQueryState } from "nuqs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ContentTabs } from "../content-tabs"
import { Suspense } from "react"

export const AddFeedPopup = () => {
  const [isOpen, setIsOpen] = useQueryState("add-feed", {
    defaultValue: false,
    parse: (value): boolean => {
      return value === "true"
    },
    serialize: (value): string => {
      return value ? "true" : "false"
    },
  })

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  return (
    <Suspense>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add Feed</DialogTitle>
          </DialogHeader>
          <ContentTabs />
        </DialogContent>
      </Dialog>
    </Suspense>
  )
}
