import { getAverageEpochsApy } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetAverageEpochsApy(
	params:
		| Parameters<typeof getAverageEpochsApy>
		| Parameters<typeof getAverageEpochsApy>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getAverageEpochsApy>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetAverageEpochsApy", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getAverageEpochsApy(
				...(args as Parameters<typeof getAverageEpochsApy>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
