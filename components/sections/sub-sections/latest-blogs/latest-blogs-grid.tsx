import { PostCard } from "@/components/blocks/post-card";
import type { BlogType } from "@/types/blogs.types";

export async function LatestBlogsGrid({
	blogs,
}: {
	blogs: Promise<BlogType[]>;
}) {
	const blogsList = await blogs;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
			{blogsList.map((blog) => (
				<PostCard key={blog.id} blog={blog} />
			))}
		</div>
	);
}
