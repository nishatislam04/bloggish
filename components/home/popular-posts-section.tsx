"use client";

import { ChevronLeft, ChevronRight, Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Post } from "@/types/types";

interface PopularPostsSectionProps {
	posts: Post[];
}

export function PopularPostsSection({ posts }: PopularPostsSectionProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlay, setIsAutoPlay] = useState(true);

	useEffect(() => {
		if (!isAutoPlay) return;

		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % posts.length);
		}, 5000);

		return () => clearInterval(timer);
	}, [isAutoPlay, posts.length]);

	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
		setIsAutoPlay(false);
	};

	const goToNext = () => {
		setCurrentIndex((prev) => (prev + 1) % posts.length);
		setIsAutoPlay(false);
	};

	const currentPost = posts[currentIndex];

	return (
		<section className="py-16 md:py-20">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-2">
						Popular This Week
					</h2>
					<p className="text-foreground/60">
						The most viewed and loved articles from our community
					</p>
				</div>

				{/* Carousel */}
				<div className="relative rounded-xl overflow-hidden">
					{/* Main Slide */}
					{currentPost.coverPhoto && (
						<div className="relative h-96 md:h-[500px] overflow-hidden">
							<Image
								src={currentPost.coverPhoto}
								alt={currentPost.title}
								fill
								className="object-cover"
							/>

							{/* Overlay */}
							<div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

							{/* Content */}
							<div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12">
								<div className="max-w-xl space-y-4">
									{/* Category */}
									<span className="inline-block px-4 py-1.5 text-sm font-semibold bg-primary text-primary-foreground rounded-full w-fit">
										{currentPost.category.name}
									</span>

									{/* Title */}
									<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
										{currentPost.title}
									</h3>

									{/* Excerpt */}
									{currentPost.excerpt && (
										<p className="text-white/80 line-clamp-2">
											{currentPost.excerpt}
										</p>
									)}

									{/* Stats */}
									<div className="flex items-center gap-6 pt-4">
										<div className="flex items-center gap-2 text-white/80">
											<Eye className="h-4 w-4" />
											<span className="text-sm">
												{currentPost.views.toLocaleString()} views
											</span>
										</div>
										<div className="flex items-center gap-2 text-white/80">
											<Heart className="h-4 w-4" />
											<span className="text-sm">
												{currentPost.reactions.likes.toLocaleString()} likes
											</span>
										</div>
									</div>

									{/* CTA */}
									<div className="pt-4">
										<Button asChild>
											<Link href={`/posts/${currentPost.slug}`}>
												Read Article
											</Link>
										</Button>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Navigation Buttons */}
					<div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
						<Button
							variant="outline"
							size="icon"
							className="rounded-full h-10 w-10 bg-white/10 border-white/20 hover:bg-white/20"
							onClick={goToPrevious}
							aria-label="Previous post"
						>
							<ChevronLeft className="h-5 w-5 text-white" />
						</Button>
					</div>
					<div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
						<Button
							variant="outline"
							size="icon"
							className="rounded-full h-10 w-10 bg-white/10 border-white/20 hover:bg-white/20"
							onClick={goToNext}
							aria-label="Next post"
						>
							<ChevronRight className="h-5 w-5 text-white" />
						</Button>
					</div>
				</div>

				{/* Thumbnails */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
					{posts.map((post, index) => (
						<button
							key={post.id}
							type="button"
							onClick={() => {
								setCurrentIndex(index);
								setIsAutoPlay(false);
							}}
							className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
								index === currentIndex
									? "border-primary"
									: "border-border/40 hover:border-border/80"
							}`}
						>
							{post.coverPhoto && (
								<Image
									src={post.coverPhoto}
									alt={post.title}
									fill
									className="object-cover"
								/>
							)}
							<div className="absolute inset-0 bg-black/20" />
						</button>
					))}
				</div>
			</div>
		</section>
	);
}
