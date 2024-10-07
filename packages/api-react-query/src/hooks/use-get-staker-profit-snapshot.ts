import { getStakerProfitSnapshot } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetStakerProfitSnapshot(
	params:
		| Parameters<typeof getStakerProfitSnapshot>
		| Parameters<typeof getStakerProfitSnapshot>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getStakerProfitSnapshot>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetStakerProfitSnapshot", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getStakerProfitSnapshot(
				...(args as Parameters<typeof getStakerProfitSnapshot>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
