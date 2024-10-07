import { getEpochs } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetEpochs(
	params: Parameters<typeof getEpochs> | Parameters<typeof getEpochs>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getEpochs>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetEpochs", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getEpochs(...(args as Parameters<typeof getEpochs>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
