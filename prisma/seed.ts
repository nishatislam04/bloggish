import { PrismaPg } from "@prisma/adapter-pg";
import { type Prisma, PrismaClient } from "../app/generated/prisma/client";
import "dotenv/config";
import {
	type CommentStatus,
	type PostStatus,
	type Prisma,
	PrismaClient,
	type Privacy,
	type ReactType,
} from "../app/generated/prisma/client";

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
	adapter,
});

// const userData: Prisma.UserCreateInput[] = [
// 	{
// 		id: "user_1",
// 		name: "Alice Johnson",
// 		email: "alice@example.com",
// 		emailVerified: true,
// 		image:
// 			"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
// 		posts: {
// 			create: [
// 				{
// 					id: "post_1",
// 					title: "Getting Started with Next.js",
// 					content:
// 						"Next.js is a React framework that enables server-side rendering and static site generation. In this post, we'll explore the basics of setting up a Next.js project and understanding its core concepts.",
// 					published: true,
// 				},
// 				{
// 					id: "post_2",
// 					title: "TypeScript Best Practices",
// 					content:
// 						"TypeScript brings static typing to JavaScript. Learn about interfaces, types, and how to properly type your React components for better development experience.",
// 					published: true,
// 				},
// 				{
// 					id: "post_3",
// 					title: "Database Design Patterns",
// 					content:
// 						"Exploring different database design patterns and when to use them in your applications. From relational to document databases.",
// 					published: false,
// 				},
// 			],
// 		},
// 		sessions: {
// 			create: [
// 				{
// 					id: "session_1",
// 					token: "alice_session_token_123",
// 					expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
// 					ipAddress: "192.168.1.100",
// 					userAgent:
// 						"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
// 				},
// 			],
// 		},
// 		accounts: {
// 			create: [
// 				{
// 					id: "account_1",
// 					accountId: "google_oauth_12345",
// 					providerId: "google",
// 					accessToken: "google_access_token_abc123",
// 					refreshToken: "google_refresh_token_xyz789",
// 					accessTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
// 					refreshTokenExpiresAt: new Date(
// 						Date.now() + 30 * 24 * 60 * 60 * 1000,
// 					), // 30 days from now
// 					scope: "email profile",
// 				},
// 			],
// 		},
// 	},
// 	{
// 		id: "user_2",
// 		name: "Bob Smith",
// 		email: "bob@example.com",
// 		emailVerified: true,
// 		image:
// 			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
// 		posts: {
// 			create: [
// 				{
// 					id: "post_4",
// 					title: "React Hooks Deep Dive",
// 					content:
// 						"Understanding useState, useEffect, and custom hooks. Learn how to manage state and side effects in functional components effectively.",
// 					published: true,
// 				},
// 				{
// 					id: "post_5",
// 					title: "Building REST APIs with Node.js",
// 					content:
// 						"A comprehensive guide to building scalable REST APIs using Express.js and modern JavaScript practices.",
// 					published: true,
// 				},
// 			],
// 		},
// 		sessions: {
// 			create: [
// 				{
// 					id: "session_2",
// 					token: "bob_session_token_456",
// 					expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
// 					ipAddress: "192.168.1.101",
// 					userAgent:
// 						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
// 				},
// 			],
// 		},
// 		accounts: {
// 			create: [
// 				{
// 					id: "account_2",
// 					accountId: "github_oauth_67890",
// 					providerId: "github",
// 					accessToken: "github_access_token_def456",
// 					refreshToken: "github_refresh_token_uvw123",
// 					accessTokenExpiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
// 					scope: "user:email repo",
// 				},
// 			],
// 		},
// 	},
// 	{
// 		id: "user_3",
// 		name: "Carol Davis",
// 		email: "carol@example.com",
// 		emailVerified: false,
// 		image:
// 			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
// 		posts: {
// 			create: [
// 				{
// 					id: "post_6",
// 					title: "Introduction to Prisma ORM",
// 					content:
// 						"Prisma is a modern database toolkit that makes database access easy with type-safe queries. Learn how to set up Prisma with your database.",
// 					published: true,
// 				},
// 				{
// 					id: "post_7",
// 					title: "Docker for Development",
// 					content:
// 						"Setting up development environments with Docker containers. Learn about Docker Compose and best practices for local development.",
// 					published: false,
// 				},
// 			],
// 		},
// 		sessions: {
// 			create: [
// 				{
// 					id: "session_3",
// 					token: "carol_session_token_789",
// 					expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
// 					ipAddress: "192.168.1.102",
// 					userAgent:
// 						"Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15",
// 				},
// 			],
// 		},
// 		accounts: {
// 			create: [
// 				{
// 					id: "account_3",
// 					accountId: "email_provider_555",
// 					providerId: "credentials",
// 					password:
// 						"$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u", // hashed "password123"
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			],
// 		},
// 	},
// ];

// const verificationData: Prisma.VerificationCreateInput[] = [
// 	{
// 		id: "verification_1",
// 		identifier: "email_verification",
// 		value: "carol@example.com",
// 		expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
// 	},
// 	{
// 		id: "verification_2",
// 		identifier: "password_reset",
// 		value: "bob@example.com",
// 		expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
// 	},
// ];

const usersData = [
	{
		id: "user_1",
		email: "sarah.tech@example.com",
		firstName: "Sarah",
		lastName: "Chen",
		username: "sarah_tech",
		image:
			"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
		emailVerified: true,
	},
	{
		id: "user_2",
		email: "alex.dev@example.com",
		firstName: "Alex",
		lastName: "Rodriguez",
		username: "alex_dev",
		image:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
		emailVerified: true,
	},
	{
		id: "user_3",
		email: "maya.design@example.com",
		firstName: "Maya",
		lastName: "Patel",
		username: "maya_design",
		image:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
		emailVerified: true,
	},
	{
		id: "user_4",
		email: "james.writer@example.com",
		firstName: "James",
		lastName: "Wilson",
		username: "james_writes",
		image:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
		emailVerified: true,
	},
	{
		id: "user_5",
		email: "lisa.creator@example.com",
		firstName: "Lisa",
		lastName: "Thompson",
		username: "lisa_creates",
		image:
			"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
		emailVerified: true,
	},
];

const categoriesData = [
	{
		id: "cat_1",
		name: "Web Development",
		slug: "web-development",
		description: "Latest trends and tutorials in web development",
	},
	{
		id: "cat_2",
		name: "JavaScript",
		slug: "javascript",
		description: "Everything about JavaScript and modern frameworks",
	},
	{
		id: "cat_3",
		name: "React & Next.js",
		slug: "react-nextjs",
		description: "React ecosystem and Next.js best practices",
	},
	{
		id: "cat_4",
		name: "Backend Development",
		slug: "backend-development",
		description: "Server-side programming and database management",
	},
	{
		id: "cat_5",
		name: "DevOps & Tools",
		slug: "devops-tools",
		description: "Development tools, deployment, and workflow optimization",
	},
];

const tagsData = [
	{ id: "tag_1", name: "TypeScript", slug: "typescript" },
	{ id: "tag_2", name: "React", slug: "react" },
	{ id: "tag_3", name: "Next.js", slug: "nextjs" },
	{ id: "tag_4", name: "Node.js", slug: "nodejs" },
	{ id: "tag_5", name: "Database", slug: "database" },
	{ id: "tag_6", name: "API", slug: "api" },
	{ id: "tag_7", name: "Performance", slug: "performance" },
	{ id: "tag_8", name: "Security", slug: "security" },
	{ id: "tag_9", name: "Testing", slug: "testing" },
	{ id: "tag_10", name: "Deployment", slug: "deployment" },
];

const generatePostsData = () => [
	// Sarah's posts (Web Development focus)
	{
		id: "post_1",
		title: "Getting Started with Next.js 15: What You Need to Know",
		excerpt:
			"Explore the latest features in Next.js 15 including React 19 support, improved caching, and new developer experience enhancements.",
		slug: "nextjs-15-getting-started",
		shortLink: "blog-nextjs15",
		authorId: "user_1",
		categoryId: "cat_3",
		body: {
			type: "doc",
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "Next.js 15 brings exciting new features that improve both developer experience and application performance. The latest version includes built-in support for React 19 features, enhanced caching strategies, and improved build times.",
						},
					],
				},
				{
					type: "heading",
					attrs: { level: 2 },
					content: [{ type: "text", text: "Key Features" }],
				},
				{
					type: "bulletList",
					content: [
						{
							type: "listItem",
							content: [
								{
									type: "paragraph",
									content: [
										{
											type: "text",
											text: "React 19 support with async transitions",
										},
									],
								},
							],
						},
						{
							type: "listItem",
							content: [
								{
									type: "paragraph",
									content: [
										{
											type: "text",
											text: "Improved image optimization with next/image",
										},
									],
								},
							],
						},
						{
							type: "listItem",
							content: [
								{
									type: "paragraph",
									content: [
										{
											type: "text",
											text: "Enhanced developer tools and debugging",
										},
									],
								},
							],
						},
					],
				},
			],
		},
		coverPhoto:
			"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
		status: "PUBLISHED" as PostStatus,
		privacy: "PUBLIC" as Privacy,
		publishedAt: new Date("2024-11-20T10:00:00Z"),
		tags: ["tag_3", "tag_1", "tag_10"],
	},
	{
		id: "post_2",
		title: "TypeScript Best Practices for Large Applications",
		excerpt:
			"Learn how to structure and maintain large TypeScript codebases with proven patterns and tools.",
		slug: "typescript-best-practices-large-apps",
		shortLink: "blog-ts-practices",
		authorId: "user_1",
		categoryId: "cat_2",
		body: {
			type: "doc",
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "Managing large TypeScript applications requires careful planning and consistent practices. Here are some strategies that have worked well in production environments.",
						},
					],
				},
			],
		},
		coverPhoto:
			"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
		status: "PUBLISHED" as PostStatus,
		privacy: "PUBLIC" as Privacy,
		publishedAt: new Date("2024-11-18T14:30:00Z"),
		tags: ["tag_1", "tag_9"],
	},

	// Alex's posts (Backend focus)
	{
		id: "post_3",
		title: "Building Scalable APIs with Node.js and Express",
		excerpt:
			"Architectural patterns and best practices for creating robust and scalable REST APIs.",
		slug: "scalable-apis-nodejs-express",
		shortLink: "blog-node-apis",
		authorId: "user_2",
		categoryId: "cat_4",
		body: { type: "doc", content: [] },
		coverPhoto:
			"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
		status: "PUBLISHED" as PostStatus,
		privacy: "PUBLIC" as Privacy,
		publishedAt: new Date("2024-11-22T09:15:00Z"),
		tags: ["tag_4", "tag_6", "tag_8"],
	},
	{
		id: "post_4",
		title: "Database Design Patterns for Modern Applications",
		excerpt:
			"Explore different database design patterns and learn when to use each approach in your projects.",
		slug: "database-design-patterns",
		shortLink: "blog-db-patterns",
		authorId: "user_2",
		categoryId: "cat_4",
		body: { type: "doc", content: [] },
		coverPhoto:
			"https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop",
		status: "PUBLISHED" as PostStatus,
		privacy: "PUBLIC" as Privacy,
		publishedAt: new Date("2024-11-19T16:45:00Z"),
		tags: ["tag_5", "tag_7"],
	},

	// Maya's posts (Design & UX)
	{
		id: "post_5",
		title: "Creating Beautiful User Interfaces with Tailwind CSS",
		excerpt:
			"Learn how to build stunning and accessible user interfaces using Tailwind CSS utility classes.",
		slug: "beautiful-ui-tailwind-css",
		shortLink: "blog-tailwind-ui",
		authorId: "user_3",
		categoryId: "cat_1",
		body: { type: "doc", content: [] },
		coverPhoto:
			"https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=400&fit=crop",
		status: "PUBLISHED" as PostStatus,
		privacy: "PUBLIC" as Privacy,
		publishedAt: new Date("2024-11-21T11:20:00Z"),
		tags: ["tag_2", "tag_7"],
	},
	{
		id: "post_6",
		title: "The Complete Guide to Responsive Web Design",
		excerpt:
			"Master responsive design principles and create websites that work perfectly on all devices.",
		slug: "complete-guide-responsive-design",
		shortLink: "blog-responsive-guide",
		authorId: "user_3",
		categoryId: "cat_1",
		body: { type: "doc", content: [] },
		coverPhoto:
			"https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=400&fit=crop",
		status: "PUBLISHED" as PostStatus,
		privacy: "PUBLIC" as Privacy,
		publishedAt: new Date("2024-11-17T13:10:00Z"),
		tags: ["tag_7"],
	},

	// James's posts (Writing & Content)
	{
		id: "post_7",
		title: "The Art of Technical Writing for Developers",
		excerpt:
			"Improve your technical writing skills and learn how to create compelling documentation and blog posts.",
		slug: "art-technical-writing-developers",
		shortLink: "blog-tech-writing",
		authorId: "user_4",
		categoryId: "cat_5",
		body: { type: "doc", content: [] },
		coverPhoto:
			"https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop",
		status: "PUBLISHED" as PostStatus,
		privacy: "PUBLIC" as Privacy,
		publishedAt: new Date("2024-11-23T08:30:00Z"),
		tags: ["tag_10"],
	},
	{
		id: "post_8",
		title: "Effective Code Documentation Strategies",
		excerpt:
			"Learn how to write documentation that actually helps developers understand and use your code.",
		slug: "effective-code-documentation",
		shortLink: "blog-code-docs",
		authorId: "user_4",
		categoryId: "cat_5",
		body: { type: "doc", content: [] },
		coverPhoto:
			"https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop",
		status: "PUBLISHED" as PostStatus,
		privacy: "PUBLIC" as Privacy,
		publishedAt: new Date("2024-11-16T15:45:00Z"),
		tags: ["tag_9", "tag_10"],
	},

	// Lisa's posts (Creative & Tools)
	{
		id: "post_9",
		title: "Modern DevOps Practices for Small Teams",
		excerpt:
			"Streamline your development workflow with DevOps practices tailored for small to medium teams.",
		slug: "modern-devops-small-teams",
		shortLink: "blog-devops-teams",
		authorId: "user_5",
		categoryId: "cat_5",
		body: { type: "doc", content: [] },
		coverPhoto:
			"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
		status: "PUBLISHED" as PostStatus,
		privacy: "PUBLIC" as Privacy,
		publishedAt: new Date("2024-11-24T12:00:00Z"),
		tags: ["tag_10", "tag_8"],
	},
	{
		id: "post_10",
		title: "Building Your First Full-Stack Application",
		excerpt:
			"A step-by-step guide to building a complete full-stack application from scratch.",
		slug: "first-full-stack-application",
		shortLink: "blog-fullstack-guide",
		authorId: "user_5",
		categoryId: "cat_1",
		body: { type: "doc", content: [] },
		coverPhoto:
			"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
		status: "DRAFT" as PostStatus,
		privacy: "PUBLIC" as Privacy,
		tags: ["tag_1", "tag_2", "tag_4", "tag_5"],
	},

	// Additional posts to reach 10 per user (simplified for brevity)
	...Array.from({ length: 40 }, (_, i) => ({
		id: `post_${11 + i}`,
		title: `Advanced Topic in Web Development Part ${i + 1}`,
		excerpt: `Deep dive into advanced concepts and techniques for modern web development.`,
		slug: `advanced-topic-${i + 1}`,
		shortLink: `blog-advanced-${i + 1}`,
		authorId: `user_${(i % 5) + 1}`,
		categoryId: `cat_${(i % 5) + 1}`,
		body: { type: "doc", content: [] },
		coverPhoto: `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&${i}`,
		status: i % 3 === 0 ? ("DRAFT" as PostStatus) : ("PUBLISHED" as PostStatus),
		privacy: "PUBLIC" as Privacy,
		publishedAt:
			i % 3 === 0 ? undefined : new Date(Date.now() - i * 24 * 60 * 60 * 1000),
		tags: [`tag_${(i % 10) + 1}`],
	})),
];

const generateCommentsData = () => {
	const comments = [];
	const posts = generatePostsData().filter(
		(post) => post.status === "PUBLISHED",
	);

	posts.forEach((post, postIndex) => {
		// Add 2-5 comments per post
		const commentCount = 2 + (postIndex % 4);

		for (let i = 0; i < commentCount; i++) {
			const userId = `user_${(i % 5) + 1}`;
			comments.push({
				id: `comment_${post.id}_${i}`,
				content: `This is a great article! I learned a lot about ${post.title.split(":")[0]?.toLowerCase() || "this topic"}.`,
				body: null,
				authorId: userId,
				postId: post.id,
				parentId: null,
				status: "APPROVED" as CommentStatus,
			});

			// Add 1-2 replies to some comments
			if (i % 3 === 0) {
				const replyUserId = `user_${((i + 2) % 5) + 1}`;
				comments.push({
					id: `reply_${post.id}_${i}`,
					content:
						"Thanks for sharing your thoughts! I completely agree with your points.",
					body: null,
					authorId: replyUserId,
					postId: post.id,
					parentId: `comment_${post.id}_${i}`,
					status: "APPROVED" as CommentStatus,
				});
			}
		}
	});

	return comments;
};

const generateReactionsData = () => {
	const reactions = [];
	const reactTypes: ReactType[] = [
		"LIKE",
		"LOVE",
		"HAHA",
		"WOW",
		"SAD",
		"ANGRY",
	];
	const posts = generatePostsData().filter(
		(post) => post.status === "PUBLISHED",
	);

	posts.forEach((post) => {
		// Add 3-8 reactions per post
		const reactionCount = 3 + Math.random() * 5;

		for (let i = 0; i < reactionCount; i++) {
			const userId = `user_${(i % 5) + 1}`;
			reactions.push({
				id: `post_react_${post.id}_${i}`,
				type: reactTypes[i % reactTypes.length],
				postId: post.id,
				userId: userId,
			});
		}
	});

	// Add comment reactions
	const comments = generateCommentsData();
	comments.forEach((comment) => {
		if (Math.random() > 0.7) {
			// 30% of comments get reactions
			const userId = `user_${Math.floor(Math.random() * 5) + 1}`;
			reactions.push({
				id: `comment_react_${comment.id}`,
				type: "LIKE",
				commentId: comment.id,
				userId: userId,
			});
		}
	});

	return reactions;
};

// Generate images data
const generateImagesData = () => {
	const images = [];
	const posts = generatePostsData();

	posts.forEach((post, index) => {
		// Add 1-3 images per post
		const imageCount = 1 + (index % 3);

		for (let i = 0; i < imageCount; i++) {
			images.push({
				id: `image_${post.id}_${i}`,
				url: `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&${post.id}${i}`,
				altText: `Supporting image for ${post.title}`,
				caption: i === 0 ? "Main content image" : `Additional visual ${i}`,
				postId: post.id,
			});
		}
	});

	return images;
};

export async function main() {
	console.log("Starting seed...");

	console.log("🗑️ Clearing existing data...");
	const models = [
		"verification",
		"account",
		"session",
		"commentReact",
		"postReact",
		"comment",
		"image",
		"postTag",
		"tag",
		"post",
		"category",
		"user",
	];

	for (const model of models) {
		try {
			await (prisma as any)[model].deleteMany();
			console.log(`✅ Cleared ${model}`);
		} catch (error) {
			console.log(`⚠️ Could not clear ${model}, might not exist yet`);
		}
	}

	// Create users
	console.log("👥 Creating users...");
	for (const userData of usersData) {
		await prisma.user.create({
			data: {
				...userData,
				sessions: {
					create: [
						{
							id: `session_${userData.id}`,
							token: `token_${userData.id}_${Date.now()}`,
							expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
							ipAddress: "192.168.1.100",
							userAgent:
								"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
						},
					],
				},
				accounts: {
					create: [
						{
							id: `account_${userData.id}`,
							accountId: `oauth_${userData.id}`,
							providerId: "github",
							accessToken: `access_${userData.id}`,
							scope: "user:email",
						},
					],
				},
			},
		});
		console.log(`✅ Created user: ${userData.username}`);
	}

	// Create categories
	console.log("📂 Creating categories...");
	for (const category of categoriesData) {
		await prisma.category.create({ data: category });
		console.log(`✅ Created category: ${category.name}`);
	}

	// Create tags
	console.log("🏷️ Creating tags...");
	for (const tag of tagsData) {
		await prisma.tag.create({ data: tag });
		console.log(`✅ Created tag: ${tag.name}`);
	}

	// Create posts with tags
	console.log("📝 Creating posts with tags...");
	const postsData = generatePostsData();
	for (const postData of postsData) {
		const { tags, ...post } = postData;

		await prisma.post.create({
			data: {
				...post,
				tags: {
					create: tags.map((tagId) => ({
						tag: { connect: { id: tagId } },
					})),
				},
			},
		});
		console.log(`✅ Created post: ${post.title}`);
	}

	// Create comments
	console.log("💬 Creating comments...");
	const commentsData = generateCommentsData();
	for (const comment of commentsData) {
		await prisma.comment.create({ data: comment });
	}
	console.log(`✅ Created ${commentsData.length} comments`);

	// Create reactions
	console.log("❤️ Creating reactions...");
	const reactionsData = generateReactionsData();
	for (const reaction of reactionsData) {
		if ("postId" in reaction) {
			await prisma.postReact.create({ data: reaction });
		} else {
			await prisma.commentReact.create({ data: reaction });
		}
	}
	console.log(`✅ Created ${reactionsData.length} reactions`);

	// Create images
	console.log("🖼️ Creating images...");
	const imagesData = generateImagesData();
	for (const image of imagesData) {
		await prisma.image.create({ data: image });
	}
	console.log(`✅ Created ${imagesData.length} images`);

	console.log("🎉 Seed completed successfully!");

	// Print summary
	const userCount = await prisma.user.count();
	const postCount = await prisma.post.count();
	const commentCount = await prisma.comment.count();

	console.log("\n📊 Seed Summary:");
	console.log(`   Users: ${userCount}`);
	console.log(`   Posts: ${postCount}`);
	console.log(`   Comments: ${commentCount}`);
	console.log(`   Categories: ${categoriesData.length}`);
	console.log(`   Tags: ${tagsData.length}`);
	console.log("Seed completed successfully!");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error("Error during seed:");
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
