"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { SearchSheet } from "@/components/search-sheet";
import { signOut } from "@/lib/auth-client";
import { useClientSession } from "@/lib/clientSession";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/blogs", label: "Blogs" },
	{ href: "/authors", label: "Authors" },
	{ href: "/categories", label: "Categories" },
];

// Function to generate dicebear avatar URL
const getAvatarUrl = (username: string) => {
	return `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
};

// Function to get user initials
const getUserInitials = (firstName: string, lastName?: string) => {
	return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""}`.toUpperCase();
};

export function Header() {
	const router = useRouter();
	const { session } = useClientSession();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	console.log(session);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
							B
						</div>
						<span className="text-xl font-bold hidden sm:inline">Bloggish</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-8">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
							>
								{link.label}
							</Link>
						))}
					</nav>

					{/* Right Section */}
					<div className="flex items-center gap-4">
						<SearchSheet />

						{session?.user ? (
							<DropdownMenu>
								<DropdownMenuTrigger className="hidden lg:flex" asChild>
									<Button
										variant="ghost"
										className="relative h-8 w-8 rounded-full"
									>
										<Avatar className="h-8 w-8">
											<AvatarImage
												src={
													session.user.image ||
													getAvatarUrl(session.user.username)
												}
												alt={session.user.name}
											/>
											<AvatarFallback>
												{getUserInitials(session.user.name)}
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56" align="end" forceMount>
									<DropdownMenuLabel className="font-normal">
										<div className="flex flex-col space-y-1">
											<p className="text-sm font-medium leading-none">
												{session.user.username}
											</p>
											<p className="text-xs leading-none text-muted-foreground">
												{session.user.email}
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
						) : (
							<div className="hidden sm:flex gap-2">
								<Button variant="ghost" size="sm" asChild>
									<Link href="/sign-in">Sign In</Link>
								</Button>
								<Button size="sm" asChild>
									<Link href="/sign-up">Sign Up</Link>
								</Button>
							</div>
						)}

						{/* Mobile Menu Button */}
						<button
							type="button"
							className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							{isMenuOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<nav className="md:hidden border-t border-border/40 py-4 space-y-3">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="block px-2 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								{link.label}
							</Link>
						))}
						{session?.user ? (
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
						) : (
							<div className="flex gap-2 pt-2">
								<Button variant="ghost" size="sm" className="w-full" asChild>
									<Link href="/sign-in">Sign In</Link>
								</Button>
								<Button size="sm" className="w-full" asChild>
									<Link href="/sign-up">Sign Up</Link>
								</Button>
							</div>
						)}
					</nav>
				)}
			</div>
		</header>
	);
}
