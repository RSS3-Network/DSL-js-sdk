import { getAvailableWorkers } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetAvailableWorkers(
	params:
		| Parameters<typeof getAvailableWorkers>
		| Parameters<typeof getAvailableWorkers>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getAvailableWorkers>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetAvailableWorkers", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getAvailableWorkers(
				...(args as Parameters<typeof getAvailableWorkers>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
