import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Author } from "@/lib/types";

interface PopularAuthorsSectionProps {
	authors: Author[];
}

// Helper function to get user initials
const getUserInitials = (name: string) => {
	return name
		.split(" ")
		.map((n) => n.charAt(0))
		.join("")
		.toUpperCase();
};

export function PopularAuthorsSection({ authors }: PopularAuthorsSectionProps) {
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
					{authors.map((author) => (
						<div
							key={author.id}
							className="p-6 rounded-lg border border-border/40 hover:border-primary/50 hover:bg-muted/50 transition-all duration-300 flex flex-col items-center text-center"
						>
							<Avatar className="h-16 w-16 mb-4">
								<AvatarImage src={author.avatar} alt={author.name} />
								<AvatarFallback>{getUserInitials(author.name)}</AvatarFallback>
							</Avatar>
							<h3 className="font-semibold text-lg mb-1">{author.name}</h3>
							<p className="text-sm text-foreground/60 mb-4 line-clamp-2">
								{author.email}
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

				{/* Load More Button */}
				<div className="flex justify-center">
					<Button size="lg" variant="outline" asChild>
						<Link href="/authors">Load More Authors</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
