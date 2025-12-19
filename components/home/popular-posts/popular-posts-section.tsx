import { Suspense } from "react";
import { loadPopularPosts } from "@/actions/load-popular-posts";
import { PopularPostsCarousel } from "./_components/popular-posts-carousel";

export async function PopularPostsSection() {
	const popularPosts = await loadPopularPosts(6);
	return (
		<section className="py-16 md:py-20">
			<div className="container mx-auto px-4">
				<div className="mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-2">
						Popular This Week
					</h2>
					<p className="text-foreground/60">
						The most viewed and loved articles from our community
					</p>
				</div>

				<Suspense fallback={<div>Loading Popular Posts...</div>}>
					<PopularPostsCarousel popularPosts={popularPosts} />
				</Suspense>
			</div>
		</section>
	);
}
