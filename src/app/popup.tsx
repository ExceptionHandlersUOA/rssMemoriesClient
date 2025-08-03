import { AddFeedPopup } from "@/components/add-feed/add-feed-popup"
import { Suspense } from "react"

export default function Popup() {
  return (
    <Suspense>
      <AddFeedPopup />
    </Suspense>
  )
}
