import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

export function EmptyMemories() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted mb-4 rounded-full p-3">
        <Star className="text-muted-foreground h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">No memories yet</h3>
      <p className="text-muted-foreground mb-4 max-w-sm">
        Start adding memories to see them here for quick access.
      </p>
      <Button>
        <Star className="mr-2 h-4 w-4" />
        Add your first memory
      </Button>
    </div>
  )
}
