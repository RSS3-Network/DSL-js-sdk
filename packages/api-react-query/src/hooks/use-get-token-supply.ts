import { getTokenSupply } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetTokenSupply(
	params:
		| Parameters<typeof getTokenSupply>
		| Parameters<typeof getTokenSupply>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getTokenSupply>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetTokenSupply", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getTokenSupply(...(args as Parameters<typeof getTokenSupply>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
