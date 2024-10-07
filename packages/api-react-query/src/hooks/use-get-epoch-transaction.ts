import { getEpochTransaction } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetEpochTransaction(
	params:
		| Parameters<typeof getEpochTransaction>
		| Parameters<typeof getEpochTransaction>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getEpochTransaction>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetEpochTransaction", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getEpochTransaction(
				...(args as Parameters<typeof getEpochTransaction>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
