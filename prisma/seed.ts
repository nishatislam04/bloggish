import { PrismaPg } from "@prisma/adapter-pg";
import { type Prisma, PrismaClient } from "../app/generated/prisma/client";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
	throw new Error("Missing DATABASE_URL environment variable for Prisma seed");
}

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
	adapter,
});

const userData: Prisma.UserCreateInput[] = [
	{
		id: "user_1",
		name: "Alice Johnson",
		email: "alice@example.com",
		emailVerified: true,
		image:
			"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
		posts: {
			create: [
				{
					id: "post_1",
					title: "Getting Started with Next.js",
					content:
						"Next.js is a React framework that enables server-side rendering and static site generation. In this post, we'll explore the basics of setting up a Next.js project and understanding its core concepts.",
					published: true,
				},
				{
					id: "post_2",
					title: "TypeScript Best Practices",
					content:
						"TypeScript brings static typing to JavaScript. Learn about interfaces, types, and how to properly type your React components for better development experience.",
					published: true,
				},
				{
					id: "post_3",
					title: "Database Design Patterns",
					content:
						"Exploring different database design patterns and when to use them in your applications. From relational to document databases.",
					published: false,
				},
			],
		},
		sessions: {
			create: [
				{
					id: "session_1",
					token: "alice_session_token_123",
					expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
					ipAddress: "192.168.1.100",
					userAgent:
						"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
				},
			],
		},
		accounts: {
			create: [
				{
					id: "account_1",
					accountId: "google_oauth_12345",
					providerId: "google",
					accessToken: "google_access_token_abc123",
					refreshToken: "google_refresh_token_xyz789",
					accessTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
					refreshTokenExpiresAt: new Date(
						Date.now() + 30 * 24 * 60 * 60 * 1000,
					), // 30 days from now
					scope: "email profile",
				},
			],
		},
	},
	{
		id: "user_2",
		name: "Bob Smith",
		email: "bob@example.com",
		emailVerified: true,
		image:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
		posts: {
			create: [
				{
					id: "post_4",
					title: "React Hooks Deep Dive",
					content:
						"Understanding useState, useEffect, and custom hooks. Learn how to manage state and side effects in functional components effectively.",
					published: true,
				},
				{
					id: "post_5",
					title: "Building REST APIs with Node.js",
					content:
						"A comprehensive guide to building scalable REST APIs using Express.js and modern JavaScript practices.",
					published: true,
				},
			],
		},
		sessions: {
			create: [
				{
					id: "session_2",
					token: "bob_session_token_456",
					expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
					ipAddress: "192.168.1.101",
					userAgent:
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
				},
			],
		},
		accounts: {
			create: [
				{
					id: "account_2",
					accountId: "github_oauth_67890",
					providerId: "github",
					accessToken: "github_access_token_def456",
					refreshToken: "github_refresh_token_uvw123",
					accessTokenExpiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
					scope: "user:email repo",
				},
			],
		},
	},
	{
		id: "user_3",
		name: "Carol Davis",
		email: "carol@example.com",
		emailVerified: false,
		image:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
		posts: {
			create: [
				{
					id: "post_6",
					title: "Introduction to Prisma ORM",
					content:
						"Prisma is a modern database toolkit that makes database access easy with type-safe queries. Learn how to set up Prisma with your database.",
					published: true,
				},
				{
					id: "post_7",
					title: "Docker for Development",
					content:
						"Setting up development environments with Docker containers. Learn about Docker Compose and best practices for local development.",
					published: false,
				},
			],
		},
		sessions: {
			create: [
				{
					id: "session_3",
					token: "carol_session_token_789",
					expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
					ipAddress: "192.168.1.102",
					userAgent:
						"Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15",
				},
			],
		},
		accounts: {
			create: [
				{
					id: "account_3",
					accountId: "email_provider_555",
					providerId: "credentials",
					password:
						"$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u", // hashed "password123"
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
		},
	},
];

const verificationData: Prisma.VerificationCreateInput[] = [
	{
		id: "verification_1",
		identifier: "email_verification",
		value: "carol@example.com",
		expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
	},
	{
		id: "verification_2",
		identifier: "password_reset",
		value: "bob@example.com",
		expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
	},
];

export async function main() {
	console.log("Starting seed...");

	// Clear existing data (optional - be careful in production!)
	if (process.env.NODE_ENV !== "production") {
		console.log("Clearing existing data...");
		await prisma.verification.deleteMany();
		await prisma.account.deleteMany();
		await prisma.session.deleteMany();
		await prisma.post.deleteMany();
		await prisma.user.deleteMany();
	}

	// Create users with related data
	console.log("Creating users with posts, sessions, and accounts...");
	for (const user of userData) {
		await prisma.user.create({
			data: user,
		});
		console.log(`Created user: ${user.name}`);
	}

	// Create verification records
	console.log("Creating verification records...");
	for (const verification of verificationData) {
		await prisma.verification.create({
			data: verification,
		});
	}

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
