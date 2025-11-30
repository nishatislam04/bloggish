import { CategoriesSection } from "@/components/sections/categories-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LatestPostsSection } from "@/components/sections/latest-posts-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { PopularPostsSection } from "@/components/sections/popular-posts-section";
import {
	getCategories,
	getFeaturedPost,
	getLatestPosts,
	getPopularPosts,
} from "@/lib/mock-data";

export default function Home() {
	const featuredPost = getFeaturedPost();
	const latestPosts = getLatestPosts(6);
	const popularPosts = getPopularPosts(4);
	const categories = getCategories();

	return (
		<>
			{/* Hero Section */}
			<section className="container mx-auto px-4 py-8 md:py-12">
				<HeroSection post={featuredPost} />
			</section>

			{/* Latest Posts Section */}
			<LatestPostsSection posts={latestPosts} />

			{/* Popular Posts Section */}
			<PopularPostsSection posts={popularPosts} />

			{/* Categories Section */}
			<CategoriesSection categories={categories} />

			{/* Newsletter Section */}
			<NewsletterSection />
		</>
	);
}
