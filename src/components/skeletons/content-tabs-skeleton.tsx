import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const ContentTabsSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6 grid w-full grid-cols-2 gap-2">
        <Skeleton className="flex h-10 items-center gap-2 rounded-md px-3">
          <Skeleton className="size-4 rounded" />
          <Skeleton className="h-4 w-20" />
        </Skeleton>
        <Skeleton className="flex h-10 items-center gap-2 rounded-md px-3">
          <Skeleton className="size-4 rounded" />
          <Skeleton className="h-4 w-16" />
        </Skeleton>
      </div>

      <div className="mt-0">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">
              <Skeleton className="h-8 w-64" />
            </CardTitle>
            <Skeleton className="h-4 w-80" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-14" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
