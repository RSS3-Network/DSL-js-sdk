import { getTotalRequests } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetTotalRequests(
	params:
		| Parameters<typeof getTotalRequests>
		| Parameters<typeof getTotalRequests>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getTotalRequests>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetTotalRequests", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getTotalRequests(...(args as Parameters<typeof getTotalRequests>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
