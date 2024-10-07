import { getChip } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetChip(
	params: Parameters<typeof getChip> | Parameters<typeof getChip>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getChip>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetChip", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getChip(...(args as Parameters<typeof getChip>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
