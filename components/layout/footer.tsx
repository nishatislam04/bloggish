"use cache";
import { Mail } from "lucide-react";
import Link from "next/link";

export async function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-border/40 bg-muted/30 mt-20">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
					{/* About Section */}
					<div>
						<div className="flex items-center gap-2 mb-4">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
								B
							</div>
							<span className="text-lg font-bold">Bloggish</span>
						</div>
						<p className="text-sm text-foreground/70">
							A modern blogging platform for sharing ideas, stories, and
							insights with the world.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="font-semibold mb-4 text-sm">Quick Links</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="/"
									className="text-foreground/70 hover:text-foreground transition-colors"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/blogs"
									className="text-foreground/70 hover:text-foreground transition-colors"
								>
									Blogs
								</Link>
							</li>
							<li>
								<Link
									href="/authors"
									className="text-foreground/70 hover:text-foreground transition-colors"
								>
									Authors
								</Link>
							</li>
							<li>
								<Link
									href="/categories"
									className="text-foreground/70 hover:text-foreground transition-colors"
								>
									Categories
								</Link>
							</li>
						</ul>
					</div>

					{/* Social Links */}
					<div>
						<h3 className="font-semibold mb-4 text-sm">Follow Us</h3>
						<div className="flex gap-4">
							<a
								href="mailto:hello@bloggish.com"
								className="p-2 hover:bg-muted rounded-lg transition-colors"
								aria-label="Email"
							>
								<Mail className="h-5 w-5" />
							</a>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-border/40 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/70">
						<p>&copy; {currentYear} Bloggish. All rights reserved.</p>
						<div className="flex gap-6">
							<Link
								href="/privacy"
								className="hover:text-foreground transition-colors"
							>
								Privacy Policy
							</Link>
							<Link
								href="/terms"
								className="hover:text-foreground transition-colors"
							>
								Terms of Service
							</Link>
							<Link
								href="/cookies"
								className="hover:text-foreground transition-colors"
							>
								Cookie Settings
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
