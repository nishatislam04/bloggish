import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/auth-client";

export default function HeaderMobileDropdown({ session, setIsMenuOpen }) {
	const router = useRouter();
	return (
		<div className="space-y-3 pt-2">
			<div className="px-2 py-2 text-sm text-muted-foreground">
				Signed in as {session.user.username}
			</div>
			<Link
				href="/profile"
				className="block px-2 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded transition-colors"
				onClick={() => setIsMenuOpen(false)}
			>
				Profile
			</Link>
			<Link
				href="/settings"
				className="block px-2 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded transition-colors"
				onClick={() => setIsMenuOpen(false)}
			>
				Settings
			</Link>
			<Button
				className="block w-full text-left px-2 py-2 text-sm font-medium text-destructive hover:bg-muted rounded transition-colors"
				onClick={async () => {
					await signOut({
						fetchOptions: {
							onSuccess: () => {
								router.push("/");
							},
						},
					});
					setIsMenuOpen(false);
				}}
			>
				Sign Out
			</Button>
		</div>
	);
}
