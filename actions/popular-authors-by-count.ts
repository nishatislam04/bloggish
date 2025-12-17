"use server";

import { cacheLife } from "next/cache";
import prisma from "@/lib/prisma";

export async function popularAuthorsByCount() {
	"use cache";
	cacheLife("days");

	const allAuthors = await prisma.author.findMany({
		take: 100,
		include: {
			user: {
				select: {
					id: true,
					firstName: true,
					lastName: true,
					image: true,
					email: true,
				},
			},
			posts: {
				where: {
					status: "PUBLISHED",
					publishedAt: {
						lte: new Date(),
					},
				},
				select: {
					viewCount: true,
				},
			},
		},
	});

	// Calculate totals for each author
	const authorsWithStats = allAuthors.map((author) => ({
		...author,
		totalViews: author.posts.reduce((sum, post) => sum + post.viewCount, 0),
		postCount: author.posts.length,
	}));

	// Sort by total views (highest first)
	const sortedByViews = authorsWithStats.sort(
		(a, b) => b.totalViews - a.totalViews,
	);

	const finalAuthors = sortedByViews.slice(0, 4);
	return finalAuthors;
}
