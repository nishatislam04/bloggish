import type { Author, Category, Post } from "./types";

const mockAuthors: Record<string, Author> = {
	author1: {
		id: "author1",
		name: "Sarah Chen",
		avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Sarah",
		email: "sarah@bloggish.com",
	},
	author2: {
		id: "author2",
		name: "Marcus Johnson",
		avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Marcus",
		email: "marcus@bloggish.com",
	},
	author3: {
		id: "author3",
		name: "Emma Rodriguez",
		avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Emma",
		email: "emma@bloggish.com",
	},
	author4: {
		id: "author4",
		name: "James Wilson",
		avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=James",
		email: "james@bloggish.com",
	},
};

export const mockCategories: Category[] = [
	{
		id: "cat1",
		name: "Technology",
		slug: "technology",
		description: "Latest tech trends and innovations",
		postCount: 24,
		featuredImage:
			"https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
	},
	{
		id: "cat2",
		name: "Design",
		slug: "design",
		description: "UI/UX and design principles",
		postCount: 18,
		featuredImage:
			"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
	},
	{
		id: "cat3",
		name: "Business",
		slug: "business",
		description: "Entrepreneurship and business insights",
		postCount: 15,
		featuredImage:
			"https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
	},
	{
		id: "cat4",
		name: "Lifestyle",
		slug: "lifestyle",
		description: "Personal growth and lifestyle tips",
		postCount: 22,
		featuredImage:
			"https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
	},
	{
		id: "cat5",
		name: "Travel",
		slug: "travel",
		description: "Travel guides and adventures",
		postCount: 19,
		featuredImage:
			"https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
	},
];

export const mockPosts: Post[] = [
	{
		id: "post1",
		title: "The Future of Web Development: What's Coming in 2025",
		excerpt:
			"Explore the emerging trends in web development, from AI-powered tools to new frameworks that are reshaping how we build for the web.",
		slug: "future-web-development-2025",
		coverPhoto:
			"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
		author: mockAuthors.author1,
		category: mockCategories[0],
		tags: [
			{ id: "tag1", name: "Web Development", slug: "web-development" },
			{ id: "tag2", name: "JavaScript", slug: "javascript" },
			{ id: "tag3", name: "Trends", slug: "trends" },
		],
		publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
		readTime: "8 min read",
		views: 2450,
		reactions: { likes: 342 },
		status: "PUBLISHED",
		privacy: "PUBLIC",
	},
	{
		id: "post2",
		title: "Mastering React Server Components: A Deep Dive",
		excerpt:
			"Learn how to leverage React Server Components to build faster, more efficient applications with better performance characteristics.",
		slug: "mastering-react-server-components",
		coverPhoto:
			"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
		author: mockAuthors.author2,
		category: mockCategories[0],
		tags: [
			{ id: "tag4", name: "React", slug: "react" },
			{ id: "tag5", name: "Performance", slug: "performance" },
		],
		publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
		readTime: "12 min read",
		views: 1890,
		reactions: { likes: 267 },
		status: "PUBLISHED",
		privacy: "PUBLIC",
	},
	{
		id: "post3",
		title: "Design Systems: Building Scalable UI Components",
		excerpt:
			"Discover best practices for creating and maintaining design systems that scale across your entire organization.",
		slug: "design-systems-scalable-ui",
		coverPhoto:
			"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
		author: mockAuthors.author3,
		category: mockCategories[1],
		tags: [
			{ id: "tag6", name: "Design", slug: "design" },
			{ id: "tag7", name: "Components", slug: "components" },
		],
		publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
		readTime: "10 min read",
		views: 1650,
		reactions: { likes: 198 },
		status: "PUBLISHED",
		privacy: "PUBLIC",
	},
	{
		id: "post4",
		title: "Startup Success: Lessons from Founders",
		excerpt:
			"Real-world insights and lessons learned from successful startup founders about building, scaling, and navigating challenges.",
		slug: "startup-success-lessons",
		coverPhoto:
			"https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
		author: mockAuthors.author4,
		category: mockCategories[2],
		tags: [
			{ id: "tag8", name: "Startups", slug: "startups" },
			{ id: "tag9", name: "Business", slug: "business" },
		],
		publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
		readTime: "15 min read",
		views: 3200,
		reactions: { likes: 456 },
		status: "PUBLISHED",
		privacy: "PUBLIC",
	},
	{
		id: "post5",
		title: "Mindfulness in the Digital Age: Finding Balance",
		excerpt:
			"Practical strategies for maintaining mental health and finding balance in our increasingly connected digital world.",
		slug: "mindfulness-digital-age",
		coverPhoto:
			"https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
		author: mockAuthors.author1,
		category: mockCategories[3],
		tags: [
			{ id: "tag10", name: "Wellness", slug: "wellness" },
			{ id: "tag11", name: "Lifestyle", slug: "lifestyle" },
		],
		publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
		readTime: "7 min read",
		views: 1420,
		reactions: { likes: 189 },
		status: "PUBLISHED",
		privacy: "PUBLIC",
	},
	{
		id: "post6",
		title: "Hidden Gems: Exploring Off-the-Beaten-Path Destinations",
		excerpt:
			"Discover amazing travel destinations that offer authentic experiences away from the typical tourist crowds.",
		slug: "hidden-gems-travel",
		coverPhoto:
			"https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop",
		author: mockAuthors.author2,
		category: mockCategories[4],
		tags: [
			{ id: "tag12", name: "Travel", slug: "travel" },
			{ id: "tag13", name: "Adventure", slug: "adventure" },
		],
		publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
		readTime: "9 min read",
		views: 2100,
		reactions: { likes: 312 },
		status: "PUBLISHED",
		privacy: "PUBLIC",
	},
	{
		id: "post7",
		title: "TypeScript Tips and Tricks for Better Code",
		excerpt:
			"Advanced TypeScript patterns and techniques to write more robust, maintainable, and type-safe code.",
		slug: "typescript-tips-tricks",
		coverPhoto:
			"https://images.unsplash.com/photo-1699885960867-56d5f5262d38?w=800&h=400&fit=crop",
		author: mockAuthors.author3,
		category: mockCategories[0],
		tags: [
			{ id: "tag14", name: "TypeScript", slug: "typescript" },
			{ id: "tag15", name: "Programming", slug: "programming" },
		],
		publishedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
		readTime: "11 min read",
		views: 1950,
		reactions: { likes: 278 },
		status: "PUBLISHED",
		privacy: "PUBLIC",
	},
	{
		id: "post8",
		title: "Color Psychology in Modern UI Design",
		excerpt:
			"Understanding how colors influence user behavior and emotions in digital interfaces and web design.",
		slug: "color-psychology-ui",
		coverPhoto:
			"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
		author: mockAuthors.author4,
		category: mockCategories[1],
		tags: [
			{ id: "tag16", name: "UI Design", slug: "ui-design" },
			{ id: "tag17", name: "Psychology", slug: "psychology" },
		],
		publishedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
		readTime: "6 min read",
		views: 1280,
		reactions: { likes: 145 },
		status: "PUBLISHED",
		privacy: "PUBLIC",
	},
];

export function getFeaturedPost(): Post {
	return mockPosts[0];
}

export function getLatestPosts(limit: number = 6): Post[] {
	return mockPosts.slice(0, limit);
}

export function getPopularPosts(limit: number = 4): Post[] {
	return [...mockPosts].sort((a, b) => b.views - a.views).slice(0, limit);
}

export function getCategories(): Category[] {
	return mockCategories;
}

export function getPopularAuthors(limit: number = 4): Author[] {
	return Object.values(mockAuthors).slice(0, limit);
}

export function getUserBlogs(limit: number = 3): Post[] {
	// Return mock user blogs - in a real app, this would filter by current user
	return mockPosts.slice(0, limit);
}
