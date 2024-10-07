import { getBridgingTransaction } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetBridgingTransaction(
	params:
		| Parameters<typeof getBridgingTransaction>
		| Parameters<typeof getBridgingTransaction>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getBridgingTransaction>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetBridgingTransaction", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getBridgingTransaction(
				...(args as Parameters<typeof getBridgingTransaction>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
