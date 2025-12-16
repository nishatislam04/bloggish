"use cache";

import { Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export async function NewsletterSection() {
	return (
		<section className="py-16 md:py-20 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10">
			<div className="container mx-auto px-4">
				<div className="max-w-2xl mx-auto text-center">
					{/* Icon */}
					<div className="flex justify-center mb-6">
						<div className="p-3 rounded-lg bg-primary/10">
							<Mail className="h-6 w-6 text-primary" />
						</div>
					</div>

					{/* Heading */}
					<h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
					<p className="text-foreground/70 mb-8">
						Subscribe to our newsletter and get the latest articles delivered
						directly to your inbox. No spam, just great content.
					</p>

					{/* Form */}
					<form className="space-y-4">
						<div className="flex flex-col sm:flex-row gap-3">
							<Input
								type="email"
								placeholder="Enter your email"
								disabled={false}
								className="flex-1"
							/>
							<Button type="submit" disabled={false} className="sm:w-auto">
								Subscribe
							</Button>
						</div>

						{/* Error Message */}
						{false && <p className="text-sm text-destructive">Error</p>}

						{/* Success Message */}
						{false && (
							<div className="flex items-center justify-center gap-2 text-sm text-green-600">
								<Check className="h-4 w-4" />
								<span>
									Thanks for subscribing! Check your email for confirmation.
								</span>
							</div>
						)}
					</form>

					{/* Privacy Notice */}
					<p className="text-xs text-foreground/50 mt-6">
						We respect your privacy. Unsubscribe at any time.{" "}
						<a href="/privacy" className="hover:text-foreground/70 underline">
							Privacy Policy
						</a>
					</p>
				</div>
			</div>
		</section>
	);
}
