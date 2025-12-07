import { Suspense } from "react";
import { getMoreArticles } from "@/actions/get-more-articles";
import { CategoriesSection } from "@/components/sections/categories-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LatestPostsSection } from "@/components/sections/latest-posts-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { PopularAuthorsSection } from "@/components/sections/popular-authors-section";
import { PopularPostsSection } from "@/components/sections/popular-posts-section";
import { UserBlogsSection } from "@/components/sections/user-blogs-section";
import {
	getFeaturedPost,
	getPopularPosts,
	getUserBlogs,
} from "@/lib/mock-data";

export default async function Home() {
	const featuredPost = getFeaturedPost();
	const popularPosts = getPopularPosts(4);
	const userBlogs = getUserBlogs(3);
	const blogs = getMoreArticles(0, 6);

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
			<LatestPostsSection blogs={blogs} />

			{/* Popular Posts Section - need to pre-render it */}
			<PopularPostsSection posts={popularPosts} />

			{/* Categories Section - need to pre-render it */}
			<Suspense fallback={<div>Loading...</div>}>
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
