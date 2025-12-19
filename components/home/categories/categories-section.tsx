"use cache";

import { Suspense } from "react";
import CategoryListings from "./_components/category-listings";

export async function CategoriesSection() {
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

				<Suspense fallback={<div>Loading Categories...</div>}>
					<CategoryListings />
				</Suspense>
			</div>
		</section>
	);
}
