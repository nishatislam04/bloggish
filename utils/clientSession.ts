import "client-only";

import { useSession } from "../lib/auth/auth-client";

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
