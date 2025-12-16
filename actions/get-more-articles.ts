// "use cache";
// import { cacheLife, cacheTag } from "next/cache";
import prisma from "@/lib/prisma";
import type { PostType } from "@/types/blogs.types";

/**
 * Fetches a list of blog posts with pagination support.
 * Used in home page to load additional blog posts.
 *
 * @param skip - Number of posts to skip (for pagination)
 * @param take - Number of posts to fetch (limit)
 * @returns Array of blog post objects with selected fields
 */
export async function getMoreArticles(skip: number = 0, take: number = 3) {
	// cacheLife("hours");
	// cacheTag("posts", `posts-${Math.floor(skip / take)}`);

	const blogsListings = await prisma.post.findMany({
		skip,
		take,
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

	return blogsListings as PostType[];
}
