import { Clock, Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PostType } from "@/types/blogs.types";

/**
 * this is homepage latest posts section post card
 * @param blog - blog data
 * @param variant - default or compact
 * @returns post card component
 */
export function PostCard({ post }: { post: PostType }) {
	if (!post) return null;
	return (
		<article className="group flex flex-col h-full rounded-lg border border-border/40 overflow-hidden hover:border-border/80 transition-all duration-300 hover:shadow-lg">
			{/* Image Container */}
			{post.coverPhoto && (
				<div className="relative h-48 w-full overflow-hidden bg-muted">
					<Image
						src={post.coverPhoto}
						alt={post.title}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-300"
					/>
					{/* Category Badge */}
					<div className="absolute top-3 left-3">
						<span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
							{post.category.name}
						</span>
					</div>
				</div>
			)}

			{/* Content Container */}
			<div className="flex flex-col flex-1 p-4">
				{/* Title */}
				<Link href={`/posts/${post.slug}`}>
					<h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2">
						{post.title}
					</h3>
				</Link>

				{/* Excerpt */}
				{post.excerpt && (
					<p className="text-sm text-foreground/70 line-clamp-2 mb-4">
						{post.excerpt}
					</p>
				)}

				{/* Tags */}
				{post.tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-4">
						{post.tags.slice(0, 2).map((tag) => (
							<span
								key={tag.tag.id}
								className="text-xs px-2 py-1 rounded-full bg-muted text-foreground/70"
							>
								#{tag.tag.name}
							</span>
						))}
						{post.tags.length > 2 && (
							<span className="text-xs px-2 py-1 text-foreground/50">
								+{post.tags.length - 2}
							</span>
						)}
					</div>
				)}

				{/* Spacer */}
				<div className="flex-1" />

				{/* Footer */}
				<div className="space-y-3 pt-4 border-t border-border/40">
					{/* Author Info */}
					<div className="flex items-center gap-3">
						{post.author.user.image && (
							<div className="relative h-8 w-8 rounded-full overflow-hidden">
								<Image
									src={post.author.user.image}
									alt={post.author.user.firstName}
									fill
									className="object-cover"
								/>
							</div>
						)}
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium truncate">
								{post.author.user.firstName}
							</p>
							<p className="text-xs text-foreground/50">
								{new Date(post.createdAt).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
								})}
							</p>
						</div>
					</div>

					{/* Stats */}
					<div className="flex items-center justify-between text-xs text-foreground/60">
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-1">
								<Clock className="h-3.5 w-3.5" />
								<span>{post.readingTime} read time</span>
							</div>
							<div className="flex items-center gap-1">
								<Eye className="h-3.5 w-3.5" />
								<span>{post.viewCount.toLocaleString()}</span>
							</div>
						</div>
						<div className="flex items-center gap-1">
							<Heart className="h-3.5 w-3.5" />
							<span>{post.reactions.length}</span>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}
