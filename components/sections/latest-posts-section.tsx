import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import type { PostType } from "@/types/blogs.types";
import { Button } from "../ui/button";
import LatestPostsWrapper from "./sub-sections/latest-blogs/latest-posts-wrapper";

export async function LatestPostsSection({
	latestPosts,
}: {
	latestPosts: Promise<PostType[]>;
}) {
	return (
		<section className="py-16 md:py-20">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="flex items-center justify-between mb-12">
					<div>
						<h2 className="text-3xl md:text-4xl font-bold mb-2">
							Latest Posts
						</h2>
						<p className="text-foreground/60">
							Discover the most recent articles and stories
						</p>
					</div>
					<Button variant="outline" asChild className="hidden sm:flex gap-2">
						<Link href="/posts">
							View All
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>

				{/* Latest blog posts with load more functionality */}
				<Suspense fallback={<div>Loading Latest Posts...</div>}>
					<LatestPostsWrapper latestPosts={latestPosts} />
				</Suspense>
			</div>
		</section>
	);
}
