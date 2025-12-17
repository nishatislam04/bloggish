"use client";
import { use, useState } from "react";
import { toast } from "sonner";
import { loadMoreLatestPosts } from "@/actions/load-more-latest-posts";
import LoadMoreBtn from "@/components/buttons/load-more-btn";
import type { PostType } from "@/types/blogs.types";
import { LatestPostsListings } from "./latest-posts-listings";

export default function LatestPostsWrapper({
	latestPosts,
}: {
	latestPosts: Promise<PostType[]>;
}) {
	const [postsListings, setPostsListings] = useState<PostType[]>(
		use(latestPosts) || [],
	);
	const [isLoading, setIsLoading] = useState(false);

	const handleLoadMore = async () => {
		setIsLoading(true);
		try {
			const newPosts = await loadMoreLatestPosts(postsListings.length, 3);
			setPostsListings((prev) => [...prev, ...newPosts]);
		} catch (error) {
			console.error("Error loading more articles:", error);
			toast.error("Error loading more articles");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			{/* Latest Post Listings */}
			<LatestPostsListings posts={postsListings} />

			{/* Load More Button */}
			<div className="flex justify-center">
				<LoadMoreBtn
					label="Load More Articles"
					handleLoadMore={handleLoadMore}
					isLoading={isLoading}
				/>
			</div>
		</>
	);
}
