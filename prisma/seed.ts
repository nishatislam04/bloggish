import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "better-auth/crypto";
import { PrismaClient } from "../app/generated/prisma/client";

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

// Helper to produce editor-friendly JSON body
type ProseDoc = {
	type: "doc";
	content: {
		type: "paragraph";
		content: { type: "text"; text: string }[];
	}[];
};

const prose = (paragraphs: string[]): ProseDoc => ({
	type: "doc",
	content: paragraphs.map((p) => ({
		type: "paragraph",
		content: [{ type: "text", text: p }],
	})),
});

const posts = [
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

// Simple reading time estimator (rounded up)
const estimateReadingTime = (body: ProseDoc) => {
	let words = 0;
	body.content?.forEach((block) => {
		block.content?.forEach((child) => {
			if (child.text?.trim()) {
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

	// 3) Create author profile linked to the user
	const author = await prisma.author.create({
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

	// 4) Seed categories and tags
	for (const category of categories) {
		await prisma.category.create({ data: category });
	}
	for (const tag of tags) {
		await prisma.tag.create({ data: tag });
	}

	// 5) Create posts with tag relations
	for (const post of posts) {
		await prisma.post.create({
			data: {
				id: post.id,
				title: post.title,
				excerpt: post.excerpt,
				slug: post.slug,
				shortLink: post.shortLink,
				body: post.body,
				coverPhoto: post.coverPhoto,
				category: { connect: { id: post.categoryId } },
				author: { connect: { id: author.id } },
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

	// 6) Optional images
	for (const image of images) {
		await prisma.image.create({ data: image });
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
