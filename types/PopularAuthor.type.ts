import type { JsonValue } from "@/app/generated/prisma/internal/prismaNamespace";

export type PopularAuthorType = {
	id: string;
	bio: string | null;
	profession: string | null;
	website: string | null;
	socialLinks: JsonValue | null;
	isVerified: boolean;
	featured: boolean;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	totalViews: number;
	postCount: number;
	user: {
		id: string;
		image: string | null;
		email: string;
		firstName: string;
		lastName: string | null;
	};
	posts: {
		viewCount: number;
	}[];
};
