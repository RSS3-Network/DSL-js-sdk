import { getTokenTvl } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetTokenTvl(
	params: Parameters<typeof getTokenTvl> | Parameters<typeof getTokenTvl>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getTokenTvl>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetTokenTvl", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getTokenTvl(...(args as Parameters<typeof getTokenTvl>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
