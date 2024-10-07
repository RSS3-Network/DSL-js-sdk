import { getNetworkActivity } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetNetworkActivity(
	params:
		| Parameters<typeof getNetworkActivity>
		| Parameters<typeof getNetworkActivity>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getNetworkActivity>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetNetworkActivity", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getNetworkActivity(
				...(args as Parameters<typeof getNetworkActivity>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
