"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import type { BlogType } from "@/types/blogs.types";
import { Button } from "../ui/button";
import LatestBlogsWrapper from "./sub-sections/latest-blogs/latest-blogs-wrapper";

export function LatestPostsSection({ blogs }: { blogs: Promise<BlogType[]> }) {
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

				<Suspense fallback={<div>Loading Latest Posts...</div>}>
					<LatestBlogsWrapper blogs={blogs} />
				</Suspense>

				{/* Posts Grid */}
				{/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					<Suspense fallback={<div>Loading...</div>}>
						<HomeBlogListingsLatest blogs={blogs} />
					</Suspense>
				</div> */}

				{/* Load More Button */}
				{/* <div className="flex justify-center">
					<LoadMoreBtn handleLoadMore={handleLoadMore} />
				</div> */}
			</div>
		</section>
	);
}
