import { SearchSection } from "@/components/client"

export default function SearchPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Search Posts</h1>
        <p className="text-muted-foreground">
          Search through all posts in your feeds
        </p>
      </div>

      <SearchSection />
    </div>
  )
}
