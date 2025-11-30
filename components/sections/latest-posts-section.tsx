"use cache";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/blocks/post-card";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import type { BlogType } from "@/types/blogs.types";

export async function LatestPostsSection() {
	const blogs = await prisma.post.findMany({
		take: 6,
		orderBy: {
			createdAt: "desc",
		},
		select: {
			id: true,
			title: true,
			slug: true,
			viewCount: true,
			readingTime: true,
			excerpt: true,
			coverPhoto: true,
			createdAt: true,
			author: {
				select: {
					user: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
							image: true,
						},
					},
				},
			},
			category: {
				select: {
					id: true,
					name: true,
				},
			},
			tags: {
				select: {
					tag: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			},
			reactions: {
				select: {
					type: true,
				},
			},
		},
	});

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
					{blogs.map((blog: BlogType) => (
						<PostCard key={blog.id} blog={blog} />
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
