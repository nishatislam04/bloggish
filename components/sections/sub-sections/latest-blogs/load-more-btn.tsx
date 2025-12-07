import { Button } from "@/components/ui/button";

export default function LoadMoreBtn({
	handleLoadMore,
}: {
	handleLoadMore: () => void;
}) {
	return (
		<Button size="lg" variant="outline" onClick={handleLoadMore}>
			Load More Articles
		</Button>
	);
}
