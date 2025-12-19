export type PopularPostType = {
	id: string;
	title: string;
	slug: string;
	excerpt: string | null;
	coverPhoto: string | null;
	viewCount: number;
	category: {
		id: string;
		name: string;
	};
	likes: number;
};
