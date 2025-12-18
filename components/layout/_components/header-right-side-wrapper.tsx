"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { navLinks } from "@/types/navlinks.types";
import { useClientSession } from "@/utils/clientSession";
import HeaderDesktopDropDown from "./header-desktop-dropdown";
import HeaderMobileDropdown from "./header-mobile-dropdown";

export default function HeaderRightSideWrapper({
	navLinks,
}: {
	navLinks: navLinks[];
}) {
	const { session, isPending } = useClientSession();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			{/* when session is pending, show skeleton */}
			{isPending && (
				<div className="size-10 flex items-center space-x-4">
					<Skeleton className="h-10 w-10 rounded-full" />
				</div>
			)}

			{/* in desktop - show the dropdown menu*/}
			{session?.user && (
				<HeaderDesktopDropDown
					session={session}
					setIsMenuOpen={setIsMenuOpen}
				/>
			)}

			{/* when session is fetched and session in null */}
			{!isPending && !session?.user && (
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
				{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
			</button>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<nav className="md:hidden border-t border-border/40 py-4 space-y-3">
					{navLinks.map((link: { href: string; label: string }) => (
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
						<HeaderMobileDropdown
							session={session}
							setIsMenuOpen={setIsMenuOpen}
						/>
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
		</>
	);
}
