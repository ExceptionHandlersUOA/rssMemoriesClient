import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Users, Heart, Share2, Edit } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { favourites } from "@/lib/data/favourites"

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function MemoryPage({ params }: Props) {
  const decodedId = decodeURIComponent((await params).id);
  const memory = favourites.find(item => item.id === decodedId);
  
  if (!memory) {
    notFound()
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/memories">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Memories
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            {/* <span className="text-4xl">{memory.emoji}</span> */}
            <span className="text-4xl">⭐</span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{memory.title}</h1>
              <p className="text-muted-foreground">{memory.description}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Memory Details</CardTitle>
              <CardDescription>
                This is where your cherished memory lives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Last updated {memory.lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Category: {memory.categories}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Shared with: {memory.categories}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Favourite memory: {memory.categories}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Memory Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground">
                  This is where the actual memory content would be displayed. 
                  It could include photos, stories, dates, locations, and other 
                  details that make this memory special to you.
                </p>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Memory Preview:</strong> This is a placeholder for the actual 
                    memory content. In a real application, this would display the 
                    specific details, photos, and stories associated with &ldquo;{memory.title}&rdquo;.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                Add to Favourites
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share Memory
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Memory
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Memories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {favourites
                  .filter(item => item.categories.some(cat => memory.categories.includes(cat)) && item.title !== memory.title)
                  .slice(0, 3)
                  .map((item) => (
                    <Link key={item.title} href={`/dashboard/memories/${encodeURIComponent(item.title)}`}>
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                        <span className="text-xl">⭐</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.categories[0]}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
} 