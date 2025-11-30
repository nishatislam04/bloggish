export type CategoryType = {
	id: string;
	name: string;
	slug: string;
	coverPhoto: string | null;
	_count: {
		posts: number;
	};
};
