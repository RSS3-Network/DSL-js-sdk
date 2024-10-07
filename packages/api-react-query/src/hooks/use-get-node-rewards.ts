import { getNodeRewards } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetNodeRewards(
	params:
		| Parameters<typeof getNodeRewards>
		| Parameters<typeof getNodeRewards>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getNodeRewards>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetNodeRewards", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getNodeRewards(...(args as Parameters<typeof getNodeRewards>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
