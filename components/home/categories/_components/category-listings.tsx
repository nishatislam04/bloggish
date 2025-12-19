import { loadCategories } from "@/actions/load-categories";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { CategoryCard } from "./category-card";

export default async function CategoryListings() {
	const categories = await loadCategories();
	return (
		<div className="relative px-8">
			<Carousel
				opts={{
					align: "start",
				}}
			>
				<CarouselContent>
					{categories.map((category) => (
						<CarouselItem
							key={category.id}
							className="md:basis-1/2 lg:basis-1/3"
						>
							<CategoryCard category={category} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}
