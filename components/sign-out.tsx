"use client";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";

export const SignOut = () => {
	const router = useRouter();
	return (
		<Button
			onClick={() =>
				signOut({
					fetchOptions: {
						onSuccess: () => {
							router.push("/");
						},
					},
				})
			}
		>
			Sign Out
		</Button>
	);
};
