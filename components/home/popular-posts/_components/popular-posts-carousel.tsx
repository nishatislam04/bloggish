"use client";

import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import type { PopularPostType } from "@/types/popular-post.types";
import { cn } from "@/utils/utils";

type PopularPostsCarouselProps = {
	popularPosts: PopularPostType[];
};

export function PopularPostsCarousel({
	popularPosts,
}: PopularPostsCarouselProps) {
	const [api, setApi] = useState<CarouselApi | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	// Sync selected index when user interacts with carousel
	useEffect(() => {
		if (!api) return;

		const onSelect = () => {
			setCurrentIndex(api.selectedScrollSnap());
		};

		api.on("select", onSelect);
		onSelect();

		return () => {
			api.off("select", onSelect);
		};
	}, [api]);

	// Autoplay every 5s
	useEffect(() => {
		if (!api) return;
		const timer = setInterval(() => {
			api.scrollNext();
		}, 5000);
		return () => clearInterval(timer);
	}, [api]);

	const goTo = (index: number) => {
		if (!api) return;
		api.scrollTo(index);
	};

	return (
		<div className="space-y-8">
			<div className="relative">
				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					setApi={setApi}
					className="rounded-xl overflow-hidden"
				>
					<CarouselContent>
						{popularPosts.map((post: PopularPostType) => (
							<CarouselItem key={post.id} className="p-0">
								{post.coverPhoto && (
									<div className="relative h-96 md:h-[500px]">
										<Image
											src={post.coverPhoto}
											alt={post.title}
											fill
											className="object-cover"
											priority={post === popularPosts[0]}
										/>

										<div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

										<div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12">
											<div className="max-w-xl space-y-4">
												<span className="inline-block px-4 py-1.5 text-sm font-semibold bg-primary text-primary-foreground rounded-full w-fit">
													{post.category.name}
												</span>

												<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
													{post.title}
												</h3>

												{post.excerpt && (
													<p className="text-white/80 line-clamp-2">
														{post.excerpt}
													</p>
												)}

												<div className="flex items-center gap-6 pt-4">
													<div className="flex items-center gap-2 text-white/80">
														<Eye className="h-4 w-4" />
														<span className="text-sm">
															{post.viewCount.toLocaleString()} views
														</span>
													</div>
													<div className="flex items-center gap-2 text-white/80">
														<Heart className="h-4 w-4" />
														<span className="text-sm">
															{post.likes.toLocaleString()} likes
														</span>
													</div>
												</div>

												<div className="pt-4">
													<Button asChild>
														<Link href={`/posts/${post.slug}`}>
															Read Article
														</Link>
													</Button>
												</div>
											</div>
										</div>
									</div>
								)}
							</CarouselItem>
						))}
					</CarouselContent>

					<CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 hover:bg-white/20 text-white shadow-lg" />
					<CarouselNext className="right-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 hover:bg-white/20 text-white shadow-lg" />
				</Carousel>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
				{popularPosts.map((post: PopularPostType, index) => (
					<button
						key={post.id}
						type="button"
						onClick={() => goTo(index)}
						className={cn(
							"relative h-24 rounded-lg overflow-hidden border-2 transition-all",
							index === currentIndex
								? "border-primary shadow-lg"
								: "border-border/40 hover:border-border/80",
						)}
						aria-label={`Go to ${post.title}`}
					>
						{post.coverPhoto && (
							<Image
								src={post.coverPhoto}
								alt={post.title}
								fill
								className="object-cover"
								sizes="150px"
							/>
						)}
						<div className="absolute inset-0 bg-black/20" />
					</button>
				))}
			</div>
		</div>
	);
}
