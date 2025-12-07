import { PostCard } from "@/components/blocks/post-card";
import type { BlogType } from "@/types/blogs.types";

export function HomeBlogListingsLatest({ blogs }: { blogs: BlogType[] }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
			{blogs.map((blog: BlogType) => (
				<PostCard key={blog.id} blog={blog} />
			))}
		</div>
	);
}
