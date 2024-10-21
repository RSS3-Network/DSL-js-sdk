import { getFederatedPlatformActivities } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetFederatedPlatformActivities(
	params:
		| Parameters<typeof getFederatedPlatformActivities>
		| Parameters<typeof getFederatedPlatformActivities>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getFederatedPlatformActivities>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetFederatedPlatformActivities", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getFederatedPlatformActivities(
				...(args as Parameters<typeof getFederatedPlatformActivities>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
