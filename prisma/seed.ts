import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ReactType } from "../app/generated/prisma/client";
import "dotenv/config";
import type {
	CommentStatus,
	PostStatus,
	Privacy,
} from "../app/generated/prisma/client";

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
	adapter,
});

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
	const comments: Array<{
		id: string;
		content: string;
		authorId: string;
		postId: string;
		body: string | null;
		parentId: string | null;
		status: CommentStatus;
	}> = [];
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

interface BaseReaction {
	id: string;
	type: ReactType;
	userId: string;
	createdAt?: Date;
}

interface PostReaction extends BaseReaction {
	postId: string;
}

interface CommentReaction extends BaseReaction {
	commentId: string;
}

type ReactionData = PostReaction | CommentReaction;

const generateReactionsData = (): ReactionData[] => {
	const reactions: ReactionData[] = [];
	const reactTypes = Object.values(ReactType);
	const posts = generatePostsData().filter(
		(post) => post.status === "PUBLISHED",
	);

	// Track which users have reacted to which posts to avoid duplicates
	const postReactionTracker = new Map();

	posts.forEach((post) => {
		postReactionTracker.set(post.id, new Set());

		// Add 3-8 unique reactions per post
		const reactionCount = 3 + Math.floor(Math.random() * 6);
		const availableUsers = usersData.map((user) => user.id);

		for (let i = 0; i < reactionCount && availableUsers.length > 0; i++) {
			// Pick a random user that hasn't reacted to this post yet
			const randomIndex = Math.floor(Math.random() * availableUsers.length);
			const userId = availableUsers[randomIndex];

			// Remove this user from available users for this post
			availableUsers.splice(randomIndex, 1);

			// Track that this user has reacted to this post
			postReactionTracker.get(post.id).add(userId);

			reactions.push({
				id: `post_react_${post.id}_${userId}`,
				type: reactTypes[Math.floor(Math.random() * reactTypes.length)],
				postId: post.id,
				userId: userId,
				createdAt: new Date(),
			} as PostReaction);
		}
	});

	// Add comment reactions (with duplicate prevention)
	const comments = generateCommentsData();
	const commentReactionTracker = new Map();

	comments.forEach((comment) => {
		commentReactionTracker.set(comment.id, new Set());

		// 30% of comments get reactions, max 2 reactions per comment
		if (Math.random() > 0.7) {
			const reactionCount = 1 + Math.floor(Math.random() * 2);
			const availableUsers = usersData.map((user) => user.id);

			for (let i = 0; i < reactionCount && availableUsers.length > 0; i++) {
				const randomIndex = Math.floor(Math.random() * availableUsers.length);
				const userId = availableUsers[randomIndex];

				// Skip if this user is the comment author (can't react to own comment)
				if (comment.authorId === userId) {
					availableUsers.splice(randomIndex, 1);
					continue;
				}

				// Remove this user from available users for this comment
				availableUsers.splice(randomIndex, 1);

				// Track that this user has reacted to this comment
				commentReactionTracker.get(comment.id).add(userId);

				reactions.push({
					id: `comment_react_${comment.id}_${userId}`,
					type: ReactType.LIKE, // Comments typically only get likes
					commentId: comment.id,
					userId: userId,
					createdAt: new Date(),
				} as CommentReaction);
			}
		}
	});

	return reactions;
};

// Generate images data
const generateImagesData = () => {
	const images: Array<{
		id: string;
		url: string;
		altText: string | null;
		caption?: string;
		postId: string;
	}> = [];
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
		await prisma.comment.create({
			data: {
				id: comment.id,
				content: comment.content,
				author: {
					connect: { id: comment.authorId },
				},
				post: {
					connect: { id: comment.postId },
				},
				parent: comment.parentId
					? {
							connect: { id: comment.parentId },
						}
					: undefined,
				status: comment.status,
			},
		});
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
