import { getStakingTransactions } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetStakingTransactions(
	params:
		| Parameters<typeof getStakingTransactions>
		| Parameters<typeof getStakingTransactions>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getStakingTransactions>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetStakingTransactions", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getStakingTransactions(
				...(args as Parameters<typeof getStakingTransactions>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
