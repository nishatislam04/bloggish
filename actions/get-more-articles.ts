"use cache";
import { cacheLife, cacheTag } from "next/cache";
import prisma from "@/lib/prisma";
import type { BlogType } from "@/types/blogs.types";

export async function getMoreArticles(skip: number = 0, take: number = 3) {
	cacheLife("hours");
	cacheTag("posts", `posts-${Math.floor(skip / take)}`);

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

	return blogsListings as BlogType[];
}
