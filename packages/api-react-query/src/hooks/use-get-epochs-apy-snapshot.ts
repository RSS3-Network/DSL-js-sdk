import { getEpochsApySnapshot } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetEpochsApySnapshot(
	params:
		| Parameters<typeof getEpochsApySnapshot>
		| Parameters<typeof getEpochsApySnapshot>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getEpochsApySnapshot>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetEpochsApySnapshot", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getEpochsApySnapshot(
				...(args as Parameters<typeof getEpochsApySnapshot>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
