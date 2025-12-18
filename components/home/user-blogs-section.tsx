import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/blocks/post-card";
import { Button } from "@/components/ui/button";
import type { Post } from "@/types/types";
import { getServerSession } from "@/utils/server-session";

// we need to properly handle `createyourfirstpost` with various scenario
// 1. user is not logged in
// 2. user is logged in, but no post published yet
// 3. user is logged in, have posts, how many posts to show

export async function UserBlogsSection({ userPosts }: { userPosts: [] }) {
	const session = await getServerSession();
	const hasPosts = userPosts && userPosts.length > 0;
	if (!session)
		return <CreateYourFirstPost hasPosts={hasPosts} posts={userPosts} />;

	return (
		<section className="py-16 md:py-20 bg-muted/30">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="flex items-center justify-between mb-12">
					<div>
						<h2 className="text-3xl md:text-4xl font-bold mb-2">Your Blogs</h2>
						<p className="text-foreground/60">
							{hasPosts
								? `You have ${userPosts.length} published post${userPosts.length !== 1 ? "s" : ""}`
								: "Start sharing your thoughts with the world"}
						</p>
					</div>
					<div className="flex gap-2">
						{hasPosts && (
							<Button
								variant="outline"
								asChild
								className="hidden sm:flex gap-2"
							>
								<Link href="/my-posts">
									View All
									<ArrowRight className="h-4 w-4" />
								</Link>
							</Button>
						)}
						<Button asChild className="gap-2">
							<Link href="/create-post">
								<Plus className="h-4 w-4" />
								New Post
							</Link>
						</Button>
					</div>
				</div>

				{hasPosts && (
					<>
						{/* Posts Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
							{userPosts.slice(0, 3).map((post) => (
								<PostCard key={post.id} post={post} />
							))}
						</div>

						{/* Load More Button */}
						{userPosts.length > 3 && (
							<div className="flex justify-center">
								<Button size="lg" variant="outline" asChild>
									<Link href="/my-posts">Load More Posts</Link>
								</Button>
							</div>
						)}
					</>
				)}
			</div>
		</section>
	);
}

async function CreateYourFirstPost({
	hasPosts,
	posts,
}: {
	hasPosts: boolean;
	posts: Post[];
}) {
	return (
		<section className="py-16 md:py-20 bg-muted/30">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="flex items-center justify-between mb-12">
					<div>
						<h2 className="text-3xl md:text-4xl font-bold mb-2">Your Blogs</h2>
						<p className="text-foreground/60">
							{hasPosts
								? `You have ${posts.length} published post${posts.length !== 1 ? "s" : ""}`
								: "Start sharing your thoughts with the world"}
						</p>
					</div>
				</div>
				<div className="text-center py-16">
					<div className="max-w-md mx-auto">
						<div className="mb-6 flex justify-center">
							<div className="p-4 rounded-lg bg-primary/10">
								<Plus className="h-8 w-8 text-primary" />
							</div>
						</div>
						<h3 className="text-xl font-semibold mb-2">
							Create Your First Blog Post
						</h3>
						<p className="text-foreground/60 mb-6">
							Start sharing your ideas, stories, and insights with our
							community. Your first post is just a click away!
						</p>
						<Button asChild size="lg" className="gap-2">
							<Link href="/create-post">
								<Plus className="h-4 w-4" />
								Create First Post
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
