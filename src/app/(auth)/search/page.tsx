import { Suspense } from "react"
import { SearchSection } from "@/components/client"
import { SearchLoadingSkeleton } from "@/components/skeletons/search-loading-skeleton"
import { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Search",
  description: "Search through all posts in your feeds",
}

export default function SearchPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Search Posts</h1>
        <p className="text-muted-foreground">
          Search through all posts in your feeds
        </p>
      </div>

      <Suspense fallback={<SearchLoadingSkeleton />}>
        <SearchSection />
      </Suspense>
    </div>
  )
}
