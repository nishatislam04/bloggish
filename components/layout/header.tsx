import Link from "next/link";
import { SearchSheet } from "@/components/layout/search-sheet";
import HeaderRightSideWrapper from "./_components/header-right-side-wrapper";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/blogs", label: "Blogs" },
	{ href: "/authors", label: "Authors" },
	{ href: "/categories", label: "Categories" },
];

// test if session properly works or not.
export default async function Header() {
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

						<HeaderRightSideWrapper navLinks={navLinks} />
					</div>
				</div>
			</div>
		</header>
	);
}
