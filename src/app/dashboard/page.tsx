import { SidebarLeft } from "@/components/sidebar";
import { PostSection } from "@/components/post-section";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { fetchPosts } from "@/lib/actions";

export default async function Page() {
	const postsData = await fetchPosts(1, 10);

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
										Project Management & Task Tracking
									</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">
					{/* HOME PAGE SECTION */}
					<PostSection />
					<div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
					<div className="bg-muted/50 mx-auto h-[100vh] w-full max-w-3xl rounded-xl" />
					<div className="text-sm text-muted-foreground">
						Fetched {postsData.length} posts
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
