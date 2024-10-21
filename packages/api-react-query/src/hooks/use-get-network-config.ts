import { getNetworkConfig } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetNetworkConfig(
	params:
		| Parameters<typeof getNetworkConfig>
		| Parameters<typeof getNetworkConfig>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getNetworkConfig>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetNetworkConfig", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getNetworkConfig(...(args as Parameters<typeof getNetworkConfig>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
