"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Edit } from "lucide-react"

export const MemoryActionsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start" variant="outline">
          <Heart className="mr-2 h-4 w-4" />
          Add to Favourites
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share Memory
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Edit Memory
        </Button>
      </CardContent>
    </Card>
  )
}
