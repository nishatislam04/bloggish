"use client";

import { useState } from "react";
import { toast } from "sonner";
import { getMoreArticles } from "@/actions/get-more-articles";
import { Button } from "@/components/ui/button";

export function LatestBlogsLoadMore() {
	const [isLoading, setIsLoading] = useState(false);

	const handleLoadMore = async () => {
		setIsLoading(true);
		try {
			// Fetch more articles
			// const newBlogs = await getMoreArticles(0, 3);
			// TODO: Display new blogs (e.g., in a modal, drawer, or append to list)
			// console.log("Loaded more articles:", newBlogs);
			toast.success("Articles loaded successfully");
		} catch (error) {
			console.error("Error loading more articles:", error);
			toast.error("Error loading more articles");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex justify-center mt-8">
			<Button
				size="lg"
				variant="outline"
				onClick={handleLoadMore}
				disabled={isLoading}
			>
				{isLoading ? "Loading..." : "Load More Articles"}
			</Button>
		</div>
	);
}
