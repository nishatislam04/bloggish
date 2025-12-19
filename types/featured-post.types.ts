export type FeaturedPostType = {
	id: string;
	title: string;
	slug: string;
	excerpt: string | null;
	coverPhoto: string | null;
	readingTime: number;
	viewCount: number;
	publishedAt: Date | null;
	createdAt: Date;
	category: {
		id: string;
		name: string;
	};
	author: {
		fullName: string;
		avatar: string | null;
	};
};
