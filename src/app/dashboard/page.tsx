import { SidebarLeft } from "@/components/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { fetchPosts } from "@/lib/actions"

export default async function Page() {
  const postsData = await fetchPosts(1, 10)

  return (
        <>
          {/* HOME PAGE SECTION */}
          <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
          <div className="bg-muted/50 mx-auto h-[100vh] w-full max-w-3xl rounded-xl" />
          <div className="text-sm text-muted-foreground">
            Fetched {postsData.length} posts
          </div>
        </>
  )
}
