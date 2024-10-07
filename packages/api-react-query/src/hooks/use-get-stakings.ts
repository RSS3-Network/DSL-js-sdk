import { getStakings } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetStakings(
	params: Parameters<typeof getStakings> | Parameters<typeof getStakings>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getStakings>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetStakings", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getStakings(...(args as Parameters<typeof getStakings>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
