export type SessionServer =
	| {
			username: string;
			id: string;
			createdAt: Date;
			updatedAt: Date;
			email: string;
			emailVerified: boolean;
			name: string;
			image?: string | null | undefined;
	  }
	| undefined;
