import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { getUserPosts } from "@/actions/get-user-posts";
import { PostCard } from "@/components/blocks/post-card";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/utils/server-session";
import SignInAndCreatePost from "./_components/signin-create-post";
import UserHaveNoPosts from "./_components/user-have-no-posts";

export async function UserPostsSection() {
	const session = await getServerSession();

	// when session does not exist, we say, signin and create a post
	if (!session) return <SignInAndCreatePost />;

	const userPosts = await getUserPosts();
	const hasPosts = userPosts?.length > 0;

	// when signin but no posts published yet
	if (!hasPosts) return <UserHaveNoPosts />;

	return (
		<section className="py-16 md:py-20 bg-muted/30">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="flex items-center justify-between mb-12">
					<div>
						<h2 className="text-3xl md:text-4xl font-bold mb-2">Your Posts</h2>
						<p className="text-foreground/60">
							Review and manage the stories you&apos;ve published or drafted.
						</p>
					</div>
					<div className="flex gap-2">
						<Button asChild className="gap-2">
							<Link href="/create-post">
								<Plus className="h-4 w-4" />
								Create Post
							</Link>
						</Button>

						{hasPosts && (
							<Button
								variant="outline"
								asChild
								className="hidden sm:flex gap-2"
							>
								<Link href="/my-posts">
									View all posts
									<ArrowRight className="h-4 w-4" />
								</Link>
							</Button>
						)}
					</div>
				</div>

				{/* Posts Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{userPosts.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			</div>
		</section>
	);
}
