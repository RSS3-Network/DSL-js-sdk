import { getAllNodes } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetAllNodes(
	params: Parameters<typeof getAllNodes> | Parameters<typeof getAllNodes>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getAllNodes>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetAllNodes", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getAllNodes(...(args as Parameters<typeof getAllNodes>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
