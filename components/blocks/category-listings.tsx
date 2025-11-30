"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { CategoryCard } from "@/components/blocks/category-card";
import { Button } from "@/components/ui/button";
import type { CategoryType } from "@/types/category.types";

export default function CategoryListings({
	categories,
}: {
	categories: CategoryType[];
}) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const scrollAmount = 400;
			scrollContainerRef.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});
		}
	};

	return (
		<div className="relative px-8">
			{/* Scroll Container */}
			<div
				ref={scrollContainerRef}
				className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
			>
				{categories.map((category) => (
					<div key={category.id} className="shrink-0 w-full sm:w-80 snap-start">
						<CategoryCard category={category} />
					</div>
				))}
			</div>

			{/* Navigation Buttons */}
			<div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
				<Button
					variant="outline"
					size="icon"
					className="rounded-full h-10 w-10 border-3 border-gray-400/40"
					onClick={() => scroll("left")}
					aria-label="Scroll left"
				>
					<ChevronLeft className="h-5 w-5" />
				</Button>
			</div>
			<div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
				<Button
					variant="outline"
					size="icon"
					className="rounded-full h-10 w-10 border-3 border-gray-400/40"
					onClick={() => scroll("right")}
					aria-label="Scroll right"
				>
					<ChevronRight className="h-5 w-5" />
				</Button>
			</div>
		</div>
	);
}
