"use client";

import { useSession } from "./auth-client";

export const useClientSession = () => {
	const {
		data: session,
		isPending, //loading state
		error, //error object
		refetch, //refetch the session
	} = useSession();

	return {
		session,
		isPending,
		error,
		refetch,
	};
};
