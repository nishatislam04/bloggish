"use server";

import { cacheLife } from "next/cache";
import prisma from "@/lib/prisma";
import type { FeaturedPostType } from "@/types/featured-post.types";

/**
 * Fetch a single featured post.
 *
 * Current heuristic (no explicit featured flag yet):
 * - Published posts only
 * - Not soft-deleted
 * - Published at or before now
 * - Highest viewCount, then newest publish date
 */
export async function loadFeaturedPost(): Promise<FeaturedPostType> {
	"use cache";
	cacheLife("days");

	const post = await prisma.post.findFirst({
		where: {
			status: "PUBLISHED",
			publishedAt: {
				lte: new Date(),
			},
			deletedAt: null,
		},
		orderBy: [
			{ viewCount: "desc" },
			{ publishedAt: "desc" },
			{ createdAt: "desc" },
		],
		select: {
			id: true,
			title: true,
			slug: true,
			excerpt: true,
			coverPhoto: true,
			readingTime: true,
			viewCount: true,
			publishedAt: true,
			createdAt: true,
			category: {
				select: {
					id: true,
					name: true,
				},
			},
			author: {
				select: {
					user: {
						select: {
							firstName: true,
							lastName: true,
							image: true,
						},
					},
				},
			},
		},
	});

	if (!post) {
		throw new Error("No featured post found");
	}

	const fullName = [post.author.user.firstName, post.author.user.lastName]
		.filter(Boolean)
		.join(" ")
		.trim();

	return {
		id: post.id,
		title: post.title,
		slug: post.slug,
		excerpt: post.excerpt,
		coverPhoto: post.coverPhoto,
		readingTime: post.readingTime,
		viewCount: post.viewCount,
		publishedAt: post.publishedAt,
		createdAt: post.createdAt,
		category: post.category,
		author: {
			fullName,
			avatar: post.author.user.image,
		},
	};
}
