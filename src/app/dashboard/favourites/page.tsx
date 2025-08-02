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
import { FavouritesHeader, FavouritesGrid, EmptyFavourites } from "@/components/favourites"
import { favourites } from "@/lib/data/favourites"

export default function FavouritesPage() {
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
                  <BreadcrumbPage className="line-clamp-1">
                    Favourites
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <FavouritesHeader count={favourites.length} />
          
          {favourites.length > 0 ? (
            <FavouritesGrid favourites={favourites} />
          ) : (
            <EmptyFavourites />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 