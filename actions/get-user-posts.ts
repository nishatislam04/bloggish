"use server";

import { cacheLife } from "next/cache";
import prisma from "@/lib/prisma";
import type { SessionServer } from "@/types/session.server.types";
import { getServerSession } from "@/utils/server-session";

async function getPostsCache(session: SessionServer) {
	"use cache";
	cacheLife("days");

	const authorId = await prisma.author.findUnique({
		where: {
			userId: session?.id,
		},
	});

	const userPosts = await prisma.post.findMany({
		where: {
			authorId: authorId?.id,
		},
		include: {
			author: {
				include: {
					user: true,
				},
			},
			category: true,
			tags: {
				include: {
					tag: true,
				},
			},
			reactions: true,
		},
		take: 3,
		orderBy: {
			createdAt: "desc",
		},
	});

	return userPosts;
}

// get user posts in homepage
export async function getUserPosts() {
	const session = await getServerSession();

	const userPosts = await getPostsCache(session);
	return userPosts;
}
