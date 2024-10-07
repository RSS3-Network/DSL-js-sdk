import { getCompatibleNetworks } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetCompatibleNetworks(
	params:
		| Parameters<typeof getCompatibleNetworks>
		| Parameters<typeof getCompatibleNetworks>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getCompatibleNetworks>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetCompatibleNetworks", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getCompatibleNetworks(
				...(args as Parameters<typeof getCompatibleNetworks>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
