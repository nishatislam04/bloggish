"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/categories", label: "Categories" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
];

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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
						<button
							type="button"
							className="p-2 hover:bg-muted rounded-lg transition-colors"
						>
							<Search className="h-5 w-5" />
						</button>

						<div className="hidden sm:flex gap-2">
							<Button variant="ghost" size="sm" asChild>
								<Link href="/sign-in">Sign In</Link>
							</Button>
							<Button size="sm" asChild>
								<Link href="/sign-up">Sign Up</Link>
							</Button>
						</div>

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
						<div className="flex gap-2 pt-2">
							<Button variant="ghost" size="sm" className="w-full" asChild>
								<Link href="/sign-in">Sign In</Link>
							</Button>
							<Button size="sm" className="w-full" asChild>
								<Link href="/sign-up">Sign Up</Link>
							</Button>
						</div>
					</nav>
				)}
			</div>
		</header>
	);
}
