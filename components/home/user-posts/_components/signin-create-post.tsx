import { NotebookPen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignInAndCreatePost() {
	return (
		<section className="py-16 md:py-20 bg-muted/30">
			<div className="container mx-auto px-4">
				<div className="text-center py-16">
					<div className="max-w-md mx-auto">
						<div className="mb-6 flex justify-center">
							<div className="p-4 rounded-lg bg-primary/10">
								<NotebookPen className="h-8 w-8 text-primary" />
							</div>
						</div>
						<h3 className="text-xl font-semibold mb-2">
							Sign In and Share your thoughts
						</h3>
						<p className="text-foreground/60 mb-6">
							Start sharing your ideas, stories, and insights with our
							community. Your first post is just a click away!
						</p>
						<Button asChild size="lg" className="gap-2">
							<Link href="/sign-in">SignIn</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
