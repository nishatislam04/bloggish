import { PostCard } from "@/components/blocks/post-card";
import type { PostType } from "@/types/blogs.types";

export function LatestPostsListings({ posts }: { posts: PostType[] }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
			{posts.map((post: PostType) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
}
