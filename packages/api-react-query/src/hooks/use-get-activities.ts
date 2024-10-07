import { getActivities } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetActivities(
	params:
		| Parameters<typeof getActivities>
		| Parameters<typeof getActivities>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getActivities>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetActivities", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getActivities(...(args as Parameters<typeof getActivities>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
