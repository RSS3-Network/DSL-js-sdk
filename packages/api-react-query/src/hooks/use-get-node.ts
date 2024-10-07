import { getNode } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetNode(
	params: Parameters<typeof getNode> | Parameters<typeof getNode>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getNode>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetNode", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getNode(...(args as Parameters<typeof getNode>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
