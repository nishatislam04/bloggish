import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";
import prisma from "./prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
	},
	user: {
		fields: {
			name: "username",
		},
		additionalFields: {
			firstName: {
				type: "string",
				required: false,
			},
			lastName: {
				type: "string",
				required: false,
			},
		},
	},
	plugins: [
		customSession(async ({ user, session }) => {
			return {
				user: {
					...user,
					username: user.name,
				},
				session,
			};
		}),
	],
});
