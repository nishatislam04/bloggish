"use cache";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/ui/post-card";
import type { Post } from "@/types/types";

interface LatestPostsSectionProps {
	posts: Post[];
}

export async function LatestPostsSection({ posts }: LatestPostsSectionProps) {
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

				{/* Posts Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{posts.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>

				{/* Load More Button */}
				<div className="flex justify-center">
					<Button size="lg" variant="outline" asChild>
						<Link href="/posts">Load More Articles</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
