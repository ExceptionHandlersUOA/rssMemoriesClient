import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"

export const SearchLoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="relative w-full">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="py-12 text-center">
          <Search className="text-muted-foreground mx-auto mb-4 h-12 w-12 animate-pulse" />
          <Skeleton className="mx-auto mb-2 h-6 w-48" />
          <Skeleton className="mx-auto h-4 w-64" />
        </div>
      </div>
    </div>
  )
}
