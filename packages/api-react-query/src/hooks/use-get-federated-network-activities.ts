import { getFederatedNetworkActivities } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetFederatedNetworkActivities(
	params:
		| Parameters<typeof getFederatedNetworkActivities>
		| Parameters<typeof getFederatedNetworkActivities>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getFederatedNetworkActivities>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetFederatedNetworkActivities", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getFederatedNetworkActivities(
				...(args as Parameters<typeof getFederatedNetworkActivities>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
