// not tested yet
// lib/reading-time.ts
export function calculateReadingTime(content: any): number {
	if (!content || !content.content) return 0;

	let totalWords = 0;

	// Recursive function to traverse the ProseMirror JSON structure
	function traverse(node: any) {
		if (node.text) {
			// Count words in text nodes
			const words = node.text.trim().split(/\s+/).length;
			totalWords += words;
		}

		if (node.content && Array.isArray(node.content)) {
			node.content.forEach(traverse);
		}
	}

	// Start traversal from the root content
	content.content.forEach(traverse);

	// Average reading speed: 200-250 words per minute
	// Using 200 for more conservative estimates
	const wordsPerMinute = 200;
	const readingTimeMinutes = Math.ceil(totalWords / wordsPerMinute);

	// Ensure at least 1 minute reading time
	return Math.max(1, readingTimeMinutes);
}
