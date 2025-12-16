import { Button } from "@/components/ui/button";

export default function LoadMoreBtn({
	label = "Load More",
	handleLoadMore,
	isLoading,
}: {
	label?: string;
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
			{isLoading ? "Loading..." : label}
		</Button>
	);
}
