import { getNodeOperationProfit } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetNodeOperationProfit(
	params:
		| Parameters<typeof getNodeOperationProfit>
		| Parameters<typeof getNodeOperationProfit>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getNodeOperationProfit>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetNodeOperationProfit", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getNodeOperationProfit(
				...(args as Parameters<typeof getNodeOperationProfit>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
