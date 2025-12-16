import type { ReactType } from "@/app/generated/prisma/enums";

export type PostType = {
	id: string;
	title: string;
	slug: string;
	viewCount: number;
	readingTime: number;
	excerpt: string | null;
	coverPhoto: string | null;
	createdAt: Date;
	author: {
		user: {
			id: string;
			firstName: string;
			lastName: string | null;
			image: string | null;
		};
	};
	category: {
		id: string;
		name: string;
	};
	tags: {
		tag: {
			id: string;
			name: string;
		};
	}[];
	reactions: {
		type: ReactType;
	}[];
};
