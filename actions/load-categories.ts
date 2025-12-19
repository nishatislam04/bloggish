"use server";

import { cacheLife } from "next/cache";
import prisma from "@/lib/prisma";
import type { CategoryType } from "@/types/category.types";

export async function loadCategories() {
	"use cache";
	cacheLife("weeks");

	const categories: CategoryType[] = await prisma.category.findMany({
		take: 10,
		select: {
			id: true,
			name: true,
			slug: true,
			coverPhoto: true,
			_count: {
				select: {
					posts: true,
				},
			},
		},
	});

	return categories;
}
