import { getNodeCountSnapshot } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetNodeCountSnapshot(
	params:
		| Parameters<typeof getNodeCountSnapshot>
		| Parameters<typeof getNodeCountSnapshot>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getNodeCountSnapshot>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetNodeCountSnapshot", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getNodeCountSnapshot(
				...(args as Parameters<typeof getNodeCountSnapshot>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
