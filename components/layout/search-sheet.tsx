"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetTitle,
} from "@/components/ui/sheet";

export function SearchSheet() {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="p-2 hover:bg-muted rounded-lg transition-colors"
				aria-label="Search"
			>
				<Search className="h-5 w-5" />
			</button>

			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetContent
					side="top"
					className="h-screen w-full border-0 p-0 rounded-0"
				>
					<div className="h-full w-full flex flex-col bg-background">
						{/* Header with close button */}
						<div className="flex items-center justify-between border-b border-border/40 px-6 py-4">
							<SheetTitle className="text-2xl">Search Posts</SheetTitle>
							<button
								type="button"
								onClick={() => setIsOpen(false)}
								className="p-2 hover:bg-muted rounded-lg transition-colors"
								aria-label="Close search"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						{/* Search Input Section */}
						<div className="flex-1 flex flex-col px-6 py-8">
							{/* Large search input */}
							<div className="w-full max-w-4xl mx-auto mb-8">
								<div className="relative">
									<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
									<Input
										type="text"
										placeholder="Search posts, authors, tags..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="w-full pl-14 pr-4 py-3 text-lg h-14 rounded-lg border-2 border-border/40 focus:border-primary"
										autoFocus
									/>
								</div>
							</div>

							{/* Search filters section (optional - can be expanded later) */}
							<div className="w-full max-w-4xl mx-auto mb-8">
								<div className="flex flex-wrap gap-2">
									<button type="button" className="px-4 py-2 rounded-full border border-border/40 hover:bg-muted transition-colors text-sm">
										All Posts
									</button>
									<button type="button" className="px-4 py-2 rounded-full border border-border/40 hover:bg-muted transition-colors text-sm">
										Authors
									</button>
									<button type="button" className="px-4 py-2 rounded-full border border-border/40 hover:bg-muted transition-colors text-sm">
										Tags
									</button>
									<button type="button" className="px-4 py-2 rounded-full border border-border/40 hover:bg-muted transition-colors text-sm">
										Categories
									</button>
								</div>
							</div>

							{/* Results area - will be populated later */}
							<div className="w-full max-w-4xl mx-auto flex-1">
								{searchQuery ? (
									<div className="text-center text-muted-foreground">
										<p>Search results will appear here</p>
									</div>
								) : (
									<div className="text-center text-muted-foreground">
										<p>Start typing to search posts</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
}
