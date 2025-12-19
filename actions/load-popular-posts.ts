"use server";

import { cacheLife } from "next/cache";
import prisma from "@/lib/prisma";
import type { PopularPostType } from "@/types/popular-post.types";

export async function loadPopularPosts(
	take: number = 6,
): Promise<PopularPostType[]> {
	"use cache";
	cacheLife("weeks");

	const posts = await prisma.post.findMany({
		where: {
			status: "PUBLISHED",
			publishedAt: {
				lte: new Date(),
			},
			deletedAt: null,
		},
		orderBy: [
			{
				viewCount: "desc",
			},
			{
				publishedAt: "desc",
			},
		],
		take,
		select: {
			id: true,
			title: true,
			slug: true,
			excerpt: true,
			coverPhoto: true,
			viewCount: true,
			category: {
				select: {
					id: true,
					name: true,
				},
			},
			reactions: {
				where: { type: "LIKE" },
				select: { id: true },
			},
		},
	});

	return posts.map((post) => ({
		id: post.id,
		title: post.title,
		slug: post.slug,
		excerpt: post.excerpt,
		coverPhoto: post.coverPhoto,
		viewCount: post.viewCount,
		category: post.category,
		likes: post.reactions.length,
	}));
}
