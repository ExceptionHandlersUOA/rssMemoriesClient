"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"
import { useSearch } from "@/query/search"
import { SearchResultCard } from "@/components/posts/search-result-card"
import { SearchResultsSkeleton } from "@/components/skeletons/search-results-skeleton"

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedQuery = useDebounce(searchQuery, 500)
  const { data: searchResults, isLoading, error } = useSearch(debouncedQuery)

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  const hasResults = searchResults && searchResults.length > 0
  const hasQuery = debouncedQuery.length > 0

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="relative w-full">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
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
        {!hasQuery && (
          <div className="py-12 text-center">
            <Search className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">Start searching</h3>
            <p className="text-muted-foreground">
              Enter a search term to find posts
            </p>
          </div>
        )}

        {hasQuery && isLoading && <SearchResultsSkeleton />}

        {hasQuery && !isLoading && error && (
          <div className="py-12 text-center">
            <h3 className="text-destructive mb-2 text-lg font-semibold">
              Error loading results
            </h3>
            <p className="text-muted-foreground">
              {error instanceof Error ? error.message : "An error occurred"}
            </p>
          </div>
        )}

        {hasQuery && !isLoading && !error && !hasResults && (
          <div className="py-12 text-center">
            <h3 className="mb-2 text-lg font-semibold">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms
            </p>
          </div>
        )}

        {hasQuery && !isLoading && !error && hasResults && (
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
        )}
      </div>
    </div>
  )
}
