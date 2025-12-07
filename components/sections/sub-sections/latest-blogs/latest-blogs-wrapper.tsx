"use client";
import { Suspense, use, useState } from "react";
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
	const handleLoadMore = () => {
		const newPosts: Promise<BlogType[]> = getMoreArticles(
			blogsListings.length,
			3,
		);
		const newBlogs = use(newPosts);
		console.log(newBlogs);
		setBlogsListings((prev) => [...prev, ...newBlogs]);
	};
	return (
		<>
			{/* Posts Grid */}
			<Suspense fallback={<div>Loading...</div>}>
				<HomeBlogListingsLatest blogs={blogsListings} />
			</Suspense>

			{/* Load More Button */}
			<div className="flex justify-center">
				<LoadMoreBtn handleLoadMore={handleLoadMore} />
			</div>
		</>
	);
}
