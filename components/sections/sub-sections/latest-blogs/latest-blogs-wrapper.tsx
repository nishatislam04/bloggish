"use client";
import { Suspense, use, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";
import { getMoreArticles } from "@/actions/get-more-articles";
import type { BlogType } from "@/types/blogs.types";
import { HomeBlogListingsLatest } from "./home-blog-listings-latest";
import LoadMoreBtn from "./load-more-btn";

export default function LatestBlogsWrapper({
	blogs,
}: {
	blogs: Promise<BlogType[]>;
}) {
	const [blogsListings, setBlogsListings] = useState<BlogType[]>(
		use(blogs) || [],
	);
	const [isLoading, setIsLoading] = useState(false);

	const handleLoadMore = async () => {
		setIsLoading(true);
		try {
			const newBlogs = await getMoreArticles(blogsListings.length, 3);
			setBlogsListings((prev) => [...prev, ...newBlogs]);
		} catch (error) {
			console.error("Error loading more articles:", error);
			toast.error("Error loading more articles");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			{/* Posts Grid */}
			<ErrorBoundary
				fallback={<div>Something went wrong while loading latest posts</div>}
			>
				<Suspense fallback={<div>Loading...</div>}>
					<HomeBlogListingsLatest blogs={blogsListings} />
				</Suspense>
			</ErrorBoundary>

			{/* Load More Button */}
			<div className="flex justify-center">
				<LoadMoreBtn handleLoadMore={handleLoadMore} isLoading={isLoading} />
			</div>
		</>
	);
}
