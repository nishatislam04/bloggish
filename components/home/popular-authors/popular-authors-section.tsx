import { ArrowRight } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import PopularAuthorsListings from "./_components/popular-authors-listings";

export async function PopularAuthorsSection() {
	"use cache";
	cacheLife("days");
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
				<Suspense fallback={<div>loading popular authors</div>}>
					<PopularAuthorsListings />
				</Suspense>
			</div>
		</section>
	);
}
