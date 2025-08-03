"use client"

import { MemoryDetailsCard } from "./memory-details-card"
import { MemoryContentCard } from "./memory-content-card"
import { MemoryActionsCard } from "./memory-actions-card"
import { MemoryInfoCard } from "./memory-info-card"

type MemorySectionProps = {
  postId: string
}

export const MemorySection = ({ postId }: MemorySectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <MemoryDetailsCard postId={postId} />
        <MemoryContentCard postId={postId} />
      </div>

      <div className="space-y-6">
        {/* <MemoryActionsCard /> */}
        <MemoryInfoCard postId={postId} />
      </div>
    </div>
  )
}
