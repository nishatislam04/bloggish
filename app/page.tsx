import { CategoriesSection } from "@/components/sections/categories-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LatestPostsSection } from "@/components/sections/latest-posts-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { PopularPostsSection } from "@/components/sections/popular-posts-section";
import { UserBlogsSection } from "@/components/sections/user-blogs-section";
import { PopularAuthorsSection } from "@/components/sections/popular-authors-section";
import {
	getCategories,
	getFeaturedPost,
	getLatestPosts,
	getPopularPosts,
	getPopularAuthors,
	getUserBlogs,
} from "@/lib/mock-data";
import { getServerSession } from "@/lib/server-session";

export default async function Home() {
	const featuredPost = getFeaturedPost();
	const latestPosts = getLatestPosts(6);
	const popularPosts = getPopularPosts(4);
	const categories = getCategories();
	const popularAuthors = getPopularAuthors(4);
	const userBlogs = getUserBlogs(3);
	const session = await getServerSession();

	return (
		<>
			{/* Hero Section */}
			<section className="container mx-auto px-4 py-8 md:py-12">
				<HeroSection post={featuredPost} />
			</section>

			{/* User Blogs Section - Only for authenticated users */}
			{session && <UserBlogsSection posts={userBlogs} />}

			{/* Latest Posts Section */}
			<LatestPostsSection posts={latestPosts} />

			{/* Popular Posts Section */}
			<PopularPostsSection posts={popularPosts} />

			{/* Categories Section */}
			<CategoriesSection categories={categories} />

			{/* Popular Authors Section */}
			<PopularAuthorsSection authors={popularAuthors} />

			{/* Newsletter Section */}
			<NewsletterSection />
		</>
	);
}
