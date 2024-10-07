import { getNodeEvents } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetNodeEvents(
	params:
		| Parameters<typeof getNodeEvents>
		| Parameters<typeof getNodeEvents>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getNodeEvents>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetNodeEvents", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getNodeEvents(...(args as Parameters<typeof getNodeEvents>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
