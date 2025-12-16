"use cache";

import prisma from "@/lib/prisma";
import type { CategoryType } from "@/types/category.types";
import CategoryListings from "../blocks/category-listings";

export async function CategoriesSection() {
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

	return (
		<section className="py-16 md:py-20 bg-muted/30">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-2">
						Explore Categories
					</h2>
					<p className="text-foreground/60">
						Browse articles by topic and find what interests you
					</p>
				</div>

				{/* Carousel Container */}
				<CategoryListings categories={categories} />
			</div>
		</section>
	);
}
