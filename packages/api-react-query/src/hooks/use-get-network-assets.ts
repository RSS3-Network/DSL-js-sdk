import { getNetworkAssets } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetNetworkAssets(
	params:
		| Parameters<typeof getNetworkAssets>
		| Parameters<typeof getNetworkAssets>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getNetworkAssets>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetNetworkAssets", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getNetworkAssets(...(args as Parameters<typeof getNetworkAssets>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
