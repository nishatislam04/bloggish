import { Suspense } from "react";
import { loadMoreLatestPosts } from "@/actions/load-more-latest-posts";
import { CategoriesSection } from "@/components/home/categories-section";
import { HeroSection } from "@/components/home/hero-section";
import { LatestPostsSection } from "@/components/home/latest-posts/latest-posts-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { PopularAuthorsSection } from "@/components/home/popular-authors-section";
import { PopularPostsSection } from "@/components/home/popular-posts-section";
import { UserBlogsSection } from "@/components/home/user-blogs-section";
import {
	getFeaturedPost,
	getPopularPosts,
	getUserBlogs,
} from "@/lib/mock-data";

export default async function Home() {
	const featuredPost = getFeaturedPost();
	const popularPosts = getPopularPosts(4);
	const userBlogs = getUserBlogs(3);
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
			<Suspense fallback={<div>Loading...</div>}>
				<UserBlogsSection posts={userBlogs} />
			</Suspense>

			{/* Latest Posts Section */}
			<LatestPostsSection latestPosts={latestPosts} />

			{/* Popular Posts Section - need to pre-render it */}
			<Suspense fallback={<div>Loading Popular Posts...</div>}>
				<PopularPostsSection posts={popularPosts} />
			</Suspense>

			{/* Categories Section - need to pre-render it */}
			<Suspense fallback={<div>Loading Categories...</div>}>
				<CategoriesSection />
			</Suspense>

			{/* Popular Authors Section */}
			<Suspense fallback={<div>Loading...</div>}>
				<PopularAuthorsSection />
			</Suspense>

			{/* Newsletter Section */}
			<Suspense fallback={<div>Loading...</div>}>
				<NewsletterSection />
			</Suspense>
		</>
	);
}
