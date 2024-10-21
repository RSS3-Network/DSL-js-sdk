import { getNetworkActivities } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetNetworkActivities(
	params:
		| Parameters<typeof getNetworkActivities>
		| Parameters<typeof getNetworkActivities>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getNetworkActivities>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetNetworkActivities", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getNetworkActivities(
				...(args as Parameters<typeof getNetworkActivities>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
