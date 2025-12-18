import { Suspense } from "react";
import { loadMoreLatestPosts } from "@/actions/load-more-latest-posts";
import { CategoriesSection } from "@/components/home/categories-section";
import { HeroSection } from "@/components/home/hero-section";
import { LatestPostsSection } from "@/components/home/latest-posts/latest-posts-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { PopularAuthorsSection } from "@/components/home/popular-authors/popular-authors-section";
import { PopularPostsSection } from "@/components/home/popular-posts-section";
import { UserBlogsSection } from "@/components/home/user-blogs-section";
import { getFeaturedPost, getPopularPosts } from "@/lib/mock-data";

export default async function Home() {
	const featuredPost = getFeaturedPost();
	const popularPosts = getPopularPosts(4);
	const userPosts = [];
	const latestPosts = loadMoreLatestPosts(0, 6);

	return (
		<>
			{/* Hero Section */}
			<section className="container mx-auto px-4 py-8 md:py-12">
				<Suspense fallback={<div>Loading...</div>}>
					<HeroSection post={featuredPost} />
				</Suspense>
			</section>

			{/* User Blogs Section */}
			<Suspense fallback={<div>Loading user posts...</div>}>
				<UserBlogsSection userPosts={userPosts} />
			</Suspense>

			{/* Latest Posts Section -- COMPLETE --*/}
			<LatestPostsSection latestPosts={latestPosts} />

			{/* Popular Posts This Week Section - need to pre-render it */}
			<Suspense fallback={<div>Loading Popular Posts...</div>}>
				<PopularPostsSection posts={popularPosts} />
			</Suspense>

			{/* Categories Section - need to pre-render it */}
			<Suspense fallback={<div>Loading Categories...</div>}>
				<CategoriesSection />
			</Suspense>

			{/* Popular Authors Section -- COMPLETE -- */}
			<PopularAuthorsSection />

			{/* Newsletter Section -- COMPLETE -- */}
			<NewsletterSection />
		</>
	);
}
