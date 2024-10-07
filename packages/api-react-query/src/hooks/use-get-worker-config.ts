import { getWorkerConfig } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetWorkerConfig(
	params:
		| Parameters<typeof getWorkerConfig>
		| Parameters<typeof getWorkerConfig>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getWorkerConfig>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetWorkerConfig", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getWorkerConfig(...(args as Parameters<typeof getWorkerConfig>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
