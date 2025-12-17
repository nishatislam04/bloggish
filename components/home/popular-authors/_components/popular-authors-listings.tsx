import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { PopularAuthorType } from "../../../../types/PopularAuthorType";

const getUserInitials = (name: string) => {
	return name
		.split(" ")
		.map((n) => n.charAt(0))
		.join("")
		.toUpperCase();
};

export default function PopularAuthorsListings({
	popularAuthors,
}: {
	popularAuthors: PopularAuthorType[];
}) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			{popularAuthors.map((author) => (
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
					<Button variant="outline" size="sm" asChild className="w-full mt-2">
						<Link href={`/author/${author.id}`}>View Blogs</Link>
					</Button>
				</div>
			))}
		</div>
	);
}
