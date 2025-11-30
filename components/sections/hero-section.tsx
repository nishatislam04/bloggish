"use cache";
import { ArrowRight, Clock, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Post } from "@/types/types";

interface HeroSectionProps {
	post: Post;
}

export async function HeroSection({ post }: HeroSectionProps) {
	return (
		<section className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl">
			{/* Background Image */}
			{post.coverPhoto && (
				<Image
					src={post.coverPhoto}
					alt={post.title}
					fill
					priority
					className="object-cover"
				/>
			)}

			{/* Gradient Overlay */}
			<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

			{/* Content */}
			<div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12">
				<div className="max-w-2xl space-y-4">
					{/* Category Badge */}
					<div>
						<span className="inline-block px-4 py-1.5 text-sm font-semibold bg-primary text-primary-foreground rounded-full">
							{post.category.name}
						</span>
					</div>

					{/* Title */}
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
						{post.title}
					</h1>

					{/* Excerpt */}
					{post.excerpt && (
						<p className="text-lg text-white/90 line-clamp-2">{post.excerpt}</p>
					)}

					{/* Meta Info */}
					<div className="flex flex-wrap items-center gap-6 pt-4">
						{/* Author */}
						<div className="flex items-center gap-3">
							{post.author.avatar && (
								<div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white/30">
									<Image
										src={post.author.avatar}
										alt={post.author.name}
										fill
										className="object-cover"
									/>
								</div>
							)}
							<div>
								<p className="text-sm font-semibold text-white">
									{post.author.name}
								</p>
								<p className="text-xs text-white/70">
									{new Date(post.publishedAt).toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
										year: "numeric",
									})}
								</p>
							</div>
						</div>

						{/* Stats */}
						<div className="flex items-center gap-4 text-white/80">
							<div className="flex items-center gap-1.5">
								<Clock className="h-4 w-4" />
								<span className="text-sm">{post.readTime}</span>
							</div>
							<div className="flex items-center gap-1.5">
								<Eye className="h-4 w-4" />
								<span className="text-sm">{post.views.toLocaleString()}</span>
							</div>
						</div>
					</div>

					{/* CTA Button */}
					<div className="pt-4">
						<Button asChild size="lg" className="gap-2">
							<Link href={`/posts/${post.slug}`}>
								Read Full Article
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
