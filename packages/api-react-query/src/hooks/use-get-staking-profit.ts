import { getStakingProfit } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetStakingProfit(
	params:
		| Parameters<typeof getStakingProfit>
		| Parameters<typeof getStakingProfit>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getStakingProfit>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetStakingProfit", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getStakingProfit(...(args as Parameters<typeof getStakingProfit>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
