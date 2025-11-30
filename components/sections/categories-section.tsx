"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/ui/category-card";
import type { Category } from "@/types/types";

interface CategoriesSectionProps {
	categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
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
				<div className="relative">
					{/* Scroll Container */}
					<div
						ref={scrollContainerRef}
						className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
					>
						{categories.map((category) => (
							<div
								key={category.id}
								className="shrink-0 w-full sm:w-80 snap-start"
							>
								<CategoryCard category={category} />
							</div>
						))}
					</div>

					{/* Navigation Buttons */}
					<div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
						<Button
							variant="outline"
							size="icon"
							className="rounded-full h-10 w-10"
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
							className="rounded-full h-10 w-10"
							onClick={() => scroll("right")}
							aria-label="Scroll right"
						>
							<ChevronRight className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
