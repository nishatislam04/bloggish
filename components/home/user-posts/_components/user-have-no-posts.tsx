import { FileQuestion, Plus } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function UserHaveNoPosts() {
	"use cache";
	cacheLife("days");

	return (
		<div className="rounded-xl border border-dashed border-foreground/20 bg-muted/40 px-6 py-10 text-center shadow-sm">
			<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
				<FileQuestion className="h-7 w-7" />
			</div>
			<h3 className="text-xl font-semibold mb-2">No posts yet</h3>
			<p className="text-foreground/70 mb-6 max-w-md mx-auto">
				Start your writing journey—share your ideas, drafts, or announcements.
				Your first post is just a click away.
			</p>
			<Button asChild className="gap-2">
				<Link href="/create-post">
					<Plus className="h-4 w-4" />
					Create your first post
				</Link>
			</Button>
		</div>
	);
}
