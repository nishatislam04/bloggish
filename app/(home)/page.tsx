import { Suspense } from "react";
import { loadMoreLatestPosts } from "@/actions/load-more-latest-posts";
import { loadPopularPosts } from "@/actions/load-popular-posts";
import { CategoriesSection } from "@/components/home/categories/categories-section";
import { HeroSection } from "@/components/home/hero-section";
import { LatestPostsSection } from "@/components/home/latest-posts/latest-posts-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { PopularAuthorsSection } from "@/components/home/popular-authors/popular-authors-section";
import { PopularPostsSection } from "@/components/home/popular-posts/popular-posts-section";
import { UserPostsSection } from "@/components/home/user-posts/user-posts-section";
import { getFeaturedPost } from "@/lib/mock-data";

export default async function Home() {
	const featuredPost = getFeaturedPost();

	const latestPosts = loadMoreLatestPosts(0, 6);

	return (
		<>
			{/* Hero Section */}
			<section className="container mx-auto px-4 py-8 md:py-12">
				<Suspense fallback={<div>Loading...</div>}>
					<HeroSection post={featuredPost} />
				</Suspense>
			</section>

			{/* User Post Section */}
			<Suspense fallback={<div>loading user post</div>}>
				<UserPostsSection />
			</Suspense>

			{/* Latest Posts Section -- COMPLETE --*/}
			<LatestPostsSection latestPosts={latestPosts} />

			{/* Popular Posts This Week Section */}
			<PopularPostsSection />

			{/* Categories Section -- COMPLETE -- */}
			<CategoriesSection />

			{/* Popular Authors Section -- COMPLETE -- */}
			<PopularAuthorsSection />

			{/* Newsletter Section -- COMPLETE -- */}
			<NewsletterSection />
		</>
	);
}
