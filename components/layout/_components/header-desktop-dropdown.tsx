import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth/auth-client";
import type { SessionClient } from "@/types/session.client.types";

// Function to generate dicebear avatar URL
const getAvatarUrl = (username: string) => {
	return `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
};

// Function to get user initials
const getUserInitials = (firstName: string, lastName?: string) => {
	return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""}`.toUpperCase();
};

export default function HeaderDesktopDropDown({
	session,
	setIsMenuOpen,
}: {
	session: SessionClient;
	setIsMenuOpen: (params: boolean) => void;
}) {
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="hidden lg:flex" asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage
							src={
								session?.user.image ||
								getAvatarUrl(session?.user?.username || "user")
							}
							alt={session?.user.name}
						/>
						<AvatarFallback>
							{getUserInitials(session?.user.name || "user")}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							{session?.user.username}
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							{session?.user.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/profile" className="w-full cursor-pointer">
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/settings" className="w-full cursor-pointer">
						Settings
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="text-destructive focus:text-destructive cursor-pointer"
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
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
