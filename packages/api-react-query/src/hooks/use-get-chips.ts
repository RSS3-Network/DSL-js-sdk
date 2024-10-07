import { getChips } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetChips(
	params: Parameters<typeof getChips> | Parameters<typeof getChips>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getChips>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetChips", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getChips(...(args as Parameters<typeof getChips>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
