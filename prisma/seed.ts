import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "better-auth/crypto";
import { type Prisma, PrismaClient } from "../app/generated/prisma/client";

// Prisma setup (uses same adapter/config as the app)
const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
	adapter,
});

// Dedicated auth user we want to sign in with (no sign-up needed)
const primaryUser = {
	id: "user_nishat_islam", // stable id to allow reconnects in future seeds
	email: "nishatislam3108@gmail.com",
	username: "nishatislam04",
	firstName: "Nishat",
	lastName: "Islam",
	image:
		"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop",
	emailVerified: true,
};

// Additional community users (not primary auth) to populate relational data
const additionalUsers = [
	{
		id: "user_safiya_frontend",
		email: "safiya.rahman@example.com",
		username: "safiya_ui",
		firstName: "Safiya",
		lastName: "Rahman",
		image:
			"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&sat=-20",
		emailVerified: true,
	},
	{
		id: "user_aarav_backend",
		email: "aarav.patel@example.com",
		username: "aarav_backend",
		firstName: "Aarav",
		lastName: "Patel",
		image:
			"https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&auto=format&fit=crop",
		emailVerified: true,
	},
	{
		id: "user_megan_pm",
		email: "megan.cho@example.com",
		username: "megan_product",
		firstName: "Megan",
		lastName: "Cho",
		image:
			"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&hue=-10",
		emailVerified: true,
	},
];

// Categories and tags to make posts relatable and cover schema needs
const categories = [
	{
		id: "cat_web",
		name: "Web Development",
		slug: "web-development",
		description:
			"Frontend and backend techniques for building modern web apps.",
		coverPhoto:
			"https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop",
	},
	{
		id: "cat_next",
		name: "Next.js",
		slug: "nextjs",
		description:
			"Practical Next.js guides, routing, data fetching, and deployment.",
		coverPhoto:
			"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop",
	},
	{
		id: "cat_ai",
		name: "AI & Machine Learning",
		slug: "ai-ml",
		description:
			"Exploring artificial intelligence, machine learning models, and their practical applications in development.",
		coverPhoto:
			"https://images.unsplash.com/photo-1677442135136-760c813d0c7e?w=1200&auto=format&fit=crop",
	},
	{
		id: "cat_devops",
		name: "DevOps & Cloud",
		slug: "devops-cloud",
		description:
			"CI/CD pipelines, containerization, cloud services, and infrastructure as code for modern development workflows.",
		coverPhoto:
			"https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&auto=format&fit=crop",
	},
	{
		id: "cat_mobile",
		name: "Mobile Development",
		slug: "mobile-dev",
		description:
			"Cross-platform and native mobile app development with React Native, Flutter, Swift, and Kotlin.",
		coverPhoto:
			"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop",
	},
	{
		id: "cat_security",
		name: "Cybersecurity",
		slug: "cybersecurity",
		description:
			"Best practices for securing applications, ethical hacking, and protecting user data in the digital age.",
		coverPhoto:
			"https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop",
	},
	{
		id: "cat_blockchain",
		name: "Blockchain & Web3",
		slug: "blockchain-web3",
		description:
			"Decentralized applications, smart contracts, and the future of the decentralized web.",
		coverPhoto:
			"https://images.unsplash.com/photo-1639762681057-408e52192e55?w=1200&auto=format&fit=crop",
	},
];

const tags = [
	{ id: "tag_ts", name: "TypeScript", slug: "typescript" },
	{
		id: "tag_rsc",
		name: "React Server Components",
		slug: "react-server-components",
	},
	{ id: "tag_cache", name: "Caching", slug: "caching" },
	{ id: "tag_auth", name: "Authentication", slug: "authentication" },
	{ id: "tag_ui", name: "UI/UX", slug: "ui-ux" },
];

// Helper to produce editor-friendly JSON type
type ReactType = "LIKE" | "LOVE" | "WOW" | "HAHA" | "SAD" | "ANGRY";

// Types for rich text content that's compatible with Prisma's Json type
type ProseNode = {
	type: string;
	text?: string;
	[key: string]: unknown;
};

type ProseContent = {
	type: string;
	content?: ProseNode[];
	[key: string]: unknown;
};

type ProseDoc = {
	type: string;
	content: ProseContent[];
	[key: string]: unknown;
};

// Interface for post data
interface PostData {
	id: string;
	title: string;
	excerpt: string;
	slug: string;
	shortLink: string;
	categoryId: string;
	coverPhoto: string;
	body: ProseDoc;
	tags: string[];
	authorUserId?: string;
}

const prose = (paragraphs: string[]): ProseDoc => ({
	type: "doc",
	content: paragraphs.map((p) => ({
		type: "paragraph",
		content: [{ type: "text", text: p }],
	})),
});

const posts: PostData[] = [
	{
		id: "post_cache_patterns",
		title: "Cache Patterns for Personal Blogs with Next.js",
		excerpt:
			"How to mix route caching, revalidation, and client hints to keep a blog fast without losing freshness.",
		slug: "nextjs-blog-cache-patterns",
		shortLink: "blog-cache-patterns",
		categoryId: "cat_next",
		coverPhoto:
			"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop",
		body: prose([
			"Draft mode, cache tags, and route segment rules let you balance speed with editorial control.",
			"Start with static for read-heavy pages and selectively opt into dynamic rendering for personalized widgets.",
			"Use cache tags for invalidation when authors publish or update a post.",
		]),
		tags: ["tag_cache", "tag_ts"],
	},
	{
		id: "post_rsc",
		title: "A Gentle Guide to React Server Components",
		excerpt:
			"Demystifying RSC with examples that show what stays on the server and what runs in the client.",
		slug: "react-server-components-guide",
		shortLink: "rsc-guide",
		categoryId: "cat_web",
		coverPhoto:
			"https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1600&auto=format&fit=crop",
		body: prose([
			"RSC lets you ship less JavaScript to the browser while keeping JSX ergonomics.",
			"Think in terms of data flow: fetch server-side, stream UI, hydrate only what needs interactivity.",
		]),
		tags: ["tag_rsc", "tag_ui"],
	},
	{
		id: "post_auth",
		title: "Better Auth with Email & Password Done Right",
		excerpt:
			"Setting up credential flow, password hashing, and sessions that play well with Prisma adapters.",
		slug: "better-auth-credentials-setup",
		shortLink: "auth-credentials",
		categoryId: "cat_web",
		coverPhoto:
			"https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1600&auto=format&fit=crop",
		body: prose([
			"Store credential accounts with providerId='credential' and hashed passwords using better-auth crypto.",
			"Seed a session token so local sign-in works immediately after running the seed.",
		]),
		tags: ["tag_auth", "tag_ts"],
	},
	{
		id: "post_ui",
		title: "Designing Readable Blog Layouts",
		excerpt:
			"Small typographic tweaks that improve readability and session duration.",
		slug: "blog-layout-ux",
		shortLink: "layout-ux",
		categoryId: "cat_web",
		coverPhoto:
			"https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=1600&auto=format&fit=crop",
		body: prose([
			"Use 60–75 character line length, generous line height, and clear hierarchy for headings.",
			"Pair neutral backgrounds with accent color pulls in callouts and CTA buttons.",
		]),
		tags: ["tag_ui"],
	},
	{
		id: "post_release",
		title: "Release Checklist for Blog Features",
		excerpt:
			"Operational checklist covering observability, migrations, rollbacks, and CDN config.",
		slug: "release-checklist-blog",
		shortLink: "release-checklist",
		categoryId: "cat_next",
		coverPhoto:
			"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1600&auto=format&fit=crop",
		body: prose([
			"Automate linting, type checks, and e2e smoke before promoting to production.",
			"Warm cache on critical landing pages and verify metrics dashboards are green.",
		]),
		tags: ["tag_cache", "tag_ts"],
	},
];

const images = [
	{
		id: "img_profile",
		url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop",
		altText: "Developer desk",
		caption: "Workspace inspiration",
		postId: "post_ui",
	},
];

// Additional posts for community authors
const communityPosts: PostData[] = [
	{
		id: "post_accessibility",
		title: "Practical Accessibility Checks for Frontend Teams",
		excerpt:
			"Run fast a11y sweeps before shipping: color contrast, focus order, screen reader labels, and motion preferences.",
		slug: "frontend-accessibility-checklist",
		shortLink: "a11y-checks",
		categoryId: "cat_web",
		coverPhoto:
			"https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1600&auto=format&fit=crop",
		body: prose([
			"Adopt a Friday a11y sweep: tab through flows, run automated checks, and verify focus outlines.",
			"Pair designers and engineers to review contrast and motion-reduction toggles.",
		]),
		tags: ["tag_ui"],
		authorUserId: "user_safiya_frontend",
	},
	{
		id: "post_api_errors",
		title: "Designing API Errors That Help Frontend Engineers",
		excerpt:
			"Error codes, remediation tips, and correlation IDs that make debugging production issues faster.",
		slug: "api-error-design",
		shortLink: "api-errors",
		categoryId: "cat_web",
		coverPhoto:
			"https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=1600&auto=format&fit=crop",
		body: prose([
			"Include actionable hints and links to runbooks in error payloads.",
			"Keep error envelopes consistent: code, message, hint, trace id.",
		]),
		tags: ["tag_cache", "tag_ts"],
		authorUserId: "user_aarav_backend",
	},
	{
		id: "post_research",
		title: "How to Run Lightweight UX Research in Two Days",
		excerpt:
			"Script, recruit, and synthesize fast feedback for a small feature before shipping.",
		slug: "lightweight-ux-research",
		shortLink: "ux-research",
		categoryId: "cat_web",
		coverPhoto:
			"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&auto=format&fit=crop",
		body: prose([
			"Draft a 30-minute interview with 5 target users and capture friction points.",
			"Turn observations into 3 prioritized fixes and a follow-up metric.",
		]),
		tags: ["tag_ui"],
		authorUserId: "user_megan_pm",
	},
];

// Comment seeds: replies included
const comments = [
	{
		id: "cmt_1",
		content: "Love the cache tagging tip—using it today!",
		postId: "post_cache_patterns",
		authorId: "user_safiya_frontend",
	},
	{
		id: "cmt_2",
		content: "Would you store preview data separately for drafts?",
		postId: "post_cache_patterns",
		authorId: "user_aarav_backend",
		parentId: "cmt_1",
	},
	{
		id: "cmt_3",
		content: "Correlation IDs saved us last week. Great reminders.",
		postId: "post_api_errors",
		authorId: "user_megan_pm",
	},
	{
		id: "cmt_4",
		content: "Please add an example payload structure!",
		postId: "post_api_errors",
		authorId: "user_nishat_islam",
	},
];

// Post and comment reactions with proper typing
interface PostReaction {
	id: string;
	postId: string;
	userId: string;
	type: ReactType;
}

interface CommentReaction {
	id: string;
	commentId: string;
	userId: string;
	type: ReactType;
}

const postReactions: PostReaction[] = [
	{
		id: "pr_1",
		postId: "post_cache_patterns",
		userId: "user_safiya_frontend",
		type: "LOVE",
	},
	{
		id: "pr_2",
		postId: "post_api_errors",
		userId: "user_nishat_islam",
		type: "LIKE",
	},
	{
		id: "pr_3",
		postId: "post_research",
		userId: "user_aarav_backend",
		type: "WOW",
	},
];

const commentReactions: CommentReaction[] = [
	{
		id: "cr_1",
		commentId: "cmt_1",
		userId: "user_nishat_islam",
		type: "LIKE",
	},
	{
		id: "cr_2",
		commentId: "cmt_4",
		userId: "user_aarav_backend",
		type: "HAHA",
	},
];

// Simple reading time estimator (rounded up)
const estimateReadingTime = (body: ProseDoc) => {
	let words = 0;
	body.content?.forEach((block) => {
		block.content?.forEach((child) => {
			if (child?.text?.trim()) {
				words += child.text.trim().split(/\s+/).length;
			}
		});
	});
	return Math.max(1, Math.ceil(words / 200));
};

async function main() {
	console.log("🌱 Seeding database for blog demo/sign-in flow...");

	// 1) Clear tables in dependency order (children -> parents)
	const clearOrder = [
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
		"author",
		"user",
	];

	for (const model of clearOrder) {
		// prisma types are per-model; index access keeps clear order concise
		const table = prisma[model as keyof typeof prisma] as {
			deleteMany: () => Promise<unknown>;
		};
		await table.deleteMany();
		console.log(`🗑️ cleared ${model}`);
	}

	// 2) Create primary user with credential account and a live session
	console.log("👤 creating primary user + account + session");
	const passwordHash = await hashPassword("12345678"); // inline example pwd; adjust as needed

	await prisma.user.create({
		data: {
			...primaryUser,
			sessions: {
				create: {
					id: `session_${primaryUser.id}`,
					token: `token_${primaryUser.id}_${Date.now()}`,
					expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
					ipAddress: "127.0.0.1",
					userAgent: "seed-script",
				},
			},
			accounts: {
				create: {
					id: `account_${primaryUser.id}`,
					accountId: primaryUser.email, // identifier for credential provider
					providerId: "credential", // required for email/password flow
					password: passwordHash,
				},
			},
		},
	});

	// 3) Create additional community users (no auth accounts needed)
	console.log("👥 creating community users");
	for (const user of additionalUsers) {
		await prisma.user.create({ data: user });
	}

	// 4) Create author profiles linked to users
	const authorIds = new Map<string, string>();
	const primaryAuthor = await prisma.author.create({
		data: {
			user: { connect: { id: primaryUser.id } },
			bio: "Full-stack engineer sharing notes on Next.js, auth, and DX.",
			profession: "Software Engineer",
			website: "https://nishatislam.dev",
			socialLinks: {
				twitter: "@nishatislam04",
				github: "nishatislam04",
				linkedin: "nishatislam",
			},
			isVerified: true,
			featured: true,
		},
	});
	authorIds.set(primaryUser.id, primaryAuthor.id);

	for (const user of additionalUsers) {
		const author = await prisma.author.create({
			data: {
				user: { connect: { id: user.id } },
				bio: `${user.firstName} ${user.lastName} shares lessons from recent projects.`,
				profession: "Software Practitioner",
				website: `https://${user.username}.example.com`,
				socialLinks: {
					twitter: `@${user.username}`,
					github: user.username,
				},
				isVerified: true,
				featured: false,
			},
		});
		authorIds.set(user.id, author.id);
	}

	// 5) Seed categories and tags
	for (const category of categories) {
		await prisma.category.create({ data: category });
	}
	for (const tag of tags) {
		await prisma.tag.create({ data: tag });
	}

	// 6) Create primary user's posts with tag relations
	for (const post of posts) {
		const authorId = authorIds.get(primaryUser.id);
		if (!authorId) {
			throw new Error(
				`Primary author not found for user ID: ${primaryUser.id}`,
			);
		}

		await prisma.post.create({
			data: {
				id: post.id,
				title: post.title,
				excerpt: post.excerpt,
				slug: post.slug,
				shortLink: post.shortLink,
				body: post.body as unknown as Prisma.InputJsonValue,
				coverPhoto: post.coverPhoto,
				category: { connect: { id: post.categoryId } },
				author: { connect: { id: authorId } },
				readingTime: estimateReadingTime(post.body),
				status: "PUBLISHED",
				privacy: "PUBLIC",
				publishedAt: new Date(),
				tags: {
					create: post.tags.map((tagId) => ({
						tag: { connect: { id: tagId } },
					})),
				},
			},
		});
	}

	// 7) Create community posts with tag relations
	for (const post of communityPosts) {
		if (!post.authorUserId) {
			console.warn(`Skipping post ${post.id} - missing authorUserId`);
			continue;
		}

		const authorId = authorIds.get(post.authorUserId);
		if (!authorId) {
			throw new Error(`Author not found for user ID: ${post.authorUserId}`);
		}

		await prisma.post.create({
			data: {
				id: post.id,
				title: post.title,
				excerpt: post.excerpt,
				slug: post.slug,
				shortLink: post.shortLink,
				body: post.body as unknown as Prisma.InputJsonValue,
				coverPhoto: post.coverPhoto,
				category: { connect: { id: post.categoryId } },
				author: { connect: { id: authorId } },
				readingTime: estimateReadingTime(post.body),
				status: "PUBLISHED",
				privacy: "PUBLIC",
				publishedAt: new Date(),
				tags: {
					create: post.tags.map((tagId) => ({
						tag: { connect: { id: tagId } },
					})),
				},
			},
		});
	}

	// 8) Optional images
	for (const image of images) {
		await prisma.image.create({ data: image });
	}

	// 9) Comments with optional parents
	for (const comment of comments) {
		await prisma.comment.create({
			data: {
				id: comment.id,
				content: comment.content,
				author: { connect: { id: comment.authorId } },
				post: { connect: { id: comment.postId } },
				parent: comment.parentId
					? { connect: { id: comment.parentId } }
					: undefined,
				status: "APPROVED",
			},
		});
	}

	// 10) Post reactions
	for (const reaction of postReactions) {
		await prisma.postReact.create({ data: reaction });
	}

	// 11) Comment reactions
	for (const reaction of commentReactions) {
		await prisma.commentReact.create({ data: reaction });
	}

	console.log("✅ Seed complete. You can now sign in with:");
	console.log(`   email: ${primaryUser.email}`);
	console.log("   password: 12345678");
}

main()
	.then(async () => prisma.$disconnect())
	.catch(async (err) => {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	});
