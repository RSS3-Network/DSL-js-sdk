import { getStakingTransaction } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetStakingTransaction(
	params:
		| Parameters<typeof getStakingTransaction>
		| Parameters<typeof getStakingTransaction>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getStakingTransaction>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetStakingTransaction", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getStakingTransaction(
				...(args as Parameters<typeof getStakingTransaction>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
