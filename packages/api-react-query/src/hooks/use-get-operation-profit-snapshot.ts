import { getOperationProfitSnapshot } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetOperationProfitSnapshot(
	params:
		| Parameters<typeof getOperationProfitSnapshot>
		| Parameters<typeof getOperationProfitSnapshot>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getOperationProfitSnapshot>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetOperationProfitSnapshot", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getOperationProfitSnapshot(
				...(args as Parameters<typeof getOperationProfitSnapshot>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
