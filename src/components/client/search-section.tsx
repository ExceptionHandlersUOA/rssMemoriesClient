"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useQueryState, parseAsString } from "nuqs"
import { useDebounce } from "@/hooks/use-debounce"
import { useSearch } from "@/query/search"
import { SearchResultCard } from "@/components/posts/search-result-card"
import { Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"

const SearchResults = ({ query }: { query: string }) => {
  const { data: searchResults } = useSearch(query)
  const hasResults = searchResults && searchResults.length > 0

  if (!hasResults) {
    return (
      <div className="py-12 text-center">
        <h3 className="mb-2 text-lg font-semibold">No results found</h3>
        <p className="text-muted-foreground">Try adjusting your search terms</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <p className="text-muted-foreground text-sm">
          Found {searchResults.length} result
          {searchResults.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {searchResults.map(post => (
          <SearchResultCard key={post.postId} post={post} />
        ))}
      </div>
    </div>
  )
}

const SearchResultsSuspense = ({ query }: { query: string }) => {
  if (!query) {
    return (
      <div className="py-12 text-center">
        <Search className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
        <h3 className="mb-2 text-lg font-semibold">Start searching</h3>
        <p className="text-muted-foreground">
          Enter a search term to find posts
        </p>
      </div>
    )
  }

  const searchErrorFallback = (
    <div className="py-12 text-center">
      <h3 className="text-destructive mb-2 text-lg font-semibold">
        Error loading results
      </h3>
      <p className="text-muted-foreground">
        Failed to load search results. Please try again.
      </p>
    </div>
  )

  return (
    <ErrorBoundary fallback={searchErrorFallback}>
      <Suspense
        fallback={
          <div className="py-12 text-center">
            <Search className="text-muted-foreground mx-auto mb-4 h-12 w-12 animate-pulse" />
            <h3 className="mb-2 text-lg font-semibold">Searching...</h3>
            <p className="text-muted-foreground">
              Looking for posts matching your query
            </p>
          </div>
        }
      >
        <SearchResults query={query} />
      </Suspense>
    </ErrorBoundary>
  )
}

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ shallow: false })
  )

  const debouncedQuery = useDebounce(searchQuery || "", 500)

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Send immediate update on Enter
      setSearchQuery(e.currentTarget.value)
    }
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="relative w-full">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchQuery || ""}
            onChange={e => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full pr-10 pl-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 transform p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <SearchResultsSuspense query={debouncedQuery} />
      </div>
    </div>
  )
}
