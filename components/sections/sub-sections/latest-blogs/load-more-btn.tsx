import { Button } from "@/components/ui/button";

export default function LoadMoreBtn({
	handleLoadMore,
	isLoading,
}: {
	handleLoadMore: () => void;
	isLoading: boolean;
}) {
	return (
		<Button 
			size="lg" 
			variant="outline" 
			onClick={handleLoadMore}
			disabled={isLoading}
		>
			{isLoading ? "Loading..." : "Load More Articles"}
		</Button>
	);
}
