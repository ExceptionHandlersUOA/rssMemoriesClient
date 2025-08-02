import { SidebarLeft } from "@/components/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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

export default async function FavouriteMemoryPage({ params }: Props) {
  const decodedId = decodeURIComponent((await params).id);
  const memory = favourites.find(item => item.name === decodedId);
  
  if (!memory) {
    notFound()
  }

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link href="/dashboard/favourites" className="hover:text-foreground">
                    Favourites
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    {memory.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/favourites">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Favourites
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{memory.emoji}</span>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{memory.name}</h1>
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
                    <span>Last accessed {memory.lastAccessed}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Category: {memory.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Shared with: Family & Friends</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>Favourite memory</span>
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
                        specific details, photos, and stories associated with &ldquo;{memory.name}&rdquo;.
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
                      .filter(item => item.category === memory.category && item.name !== memory.name)
                      .slice(0, 3)
                      .map((item) => (
                        <Link key={item.name} href={`/dashboard/favourites/${encodeURIComponent(item.name)}`}>
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                            <span className="text-xl">{item.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.category}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 