"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
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

				<ErrorBoundary
					fallback={<div>Something went wrong while loading latest posts</div>}
				>
					<Suspense fallback={<div>Loading Latest Posts...</div>}>
						<LatestBlogsWrapper blogs={blogs} />
					</Suspense>
				</ErrorBoundary>
			</div>
		</section>
	);
}
