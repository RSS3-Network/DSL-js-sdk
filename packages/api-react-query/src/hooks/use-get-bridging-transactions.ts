import { getBridgingTransactions } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetBridgingTransactions(
	params:
		| Parameters<typeof getBridgingTransactions>
		| Parameters<typeof getBridgingTransactions>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getBridgingTransactions>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetBridgingTransactions", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getBridgingTransactions(
				...(args as Parameters<typeof getBridgingTransactions>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
