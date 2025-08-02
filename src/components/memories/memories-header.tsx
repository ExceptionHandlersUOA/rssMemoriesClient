import { Badge } from "@/components/ui/badge"

type MemoriesHeaderProps = {
  count: number
}

export function MemoriesHeader({ count }: MemoriesHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Memories</h1>
        <p className="text-muted-foreground">
          Your cherished memories and important moments
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-sm">
          {count} items
        </Badge>
      </div>
    </div>
  )
} 