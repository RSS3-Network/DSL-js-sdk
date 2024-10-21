import { getPlatformActivities } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetPlatformActivities(
	params:
		| Parameters<typeof getPlatformActivities>
		| Parameters<typeof getPlatformActivities>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getPlatformActivities>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetPlatformActivities", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getPlatformActivities(
				...(args as Parameters<typeof getPlatformActivities>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
