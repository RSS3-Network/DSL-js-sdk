import { getEpoch } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetEpoch(
	params: Parameters<typeof getEpoch> | Parameters<typeof getEpoch>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getEpoch>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetEpoch", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getEpoch(...(args as Parameters<typeof getEpoch>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
