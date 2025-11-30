"use cache";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

const getUserInitials = (name: string) => {
	return name
		.split(" ")
		.map((n) => n.charAt(0))
		.join("")
		.toUpperCase();
};

export async function PopularAuthorsSection() {
	const allAuthors = await prisma.author.findMany({
		take: 100,
		include: {
			user: {
				select: {
					id: true,
					firstName: true,
					lastName: true,
					image: true,
					email: true,
				},
			},
			posts: {
				where: {
					status: "PUBLISHED",
					publishedAt: {
						lte: new Date(),
					},
				},
				select: {
					viewCount: true,
				},
			},
		},
	});

	// Calculate totals for each author
	const authorsWithStats = allAuthors.map((author) => ({
		...author,
		totalViews: author.posts.reduce((sum, post) => sum + post.viewCount, 0),
		postCount: author.posts.length,
	}));

	// Sort by total views (highest first)
	const sortedByViews = authorsWithStats.sort(
		(a, b) => b.totalViews - a.totalViews,
	);

	const finalAuthors = sortedByViews.slice(0, 4);

	return (
		<section className="py-16 md:py-20">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="flex items-center justify-between mb-12">
					<div>
						<h2 className="text-3xl md:text-4xl font-bold mb-2">
							Popular Authors
						</h2>
						<p className="text-foreground/60">
							Discover talented writers and creators in our community
						</p>
					</div>
					<Button variant="outline" asChild className="hidden sm:flex gap-2">
						<Link href="/authors">
							View More
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>

				{/* Authors Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{finalAuthors.map((author) => (
						<div
							key={author.id}
							className="p-6 rounded-lg border border-border/40 hover:border-primary/50 hover:bg-muted/50 transition-all duration-300 flex flex-col items-center text-center"
						>
							<Avatar className="h-16 w-16 mb-4">
								<AvatarImage
									src={author.user.image || ""}
									alt={author.user.firstName}
								/>
								<AvatarFallback>
									{getUserInitials(
										`${author.user.firstName} ${author.user.lastName}`,
									)}
								</AvatarFallback>
							</Avatar>
							<h3 className="font-semibold text-lg mb-1">{`${author.user.firstName} ${author.user.lastName}`}</h3>
							<p className="text-sm text-foreground/60 mb-4 line-clamp-2">
								{author.user.email}
							</p>
							<Button variant="outline" size="sm" asChild className="w-full">
								<Link href={`/author/${author.id}`}>View Profile</Link>
							</Button>
							<Button
								variant="outline"
								size="sm"
								asChild
								className="w-full mt-2"
							>
								<Link href={`/author/${author.id}`}>View Blogs</Link>
							</Button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
