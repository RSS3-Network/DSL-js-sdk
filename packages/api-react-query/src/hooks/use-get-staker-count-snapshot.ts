import { getStakerCountSnapshot } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetStakerCountSnapshot(
	params:
		| Parameters<typeof getStakerCountSnapshot>
		| Parameters<typeof getStakerCountSnapshot>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getStakerCountSnapshot>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetStakerCountSnapshot", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getStakerCountSnapshot(
				...(args as Parameters<typeof getStakerCountSnapshot>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
