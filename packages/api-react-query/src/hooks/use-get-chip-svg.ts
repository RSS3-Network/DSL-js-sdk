import { getChipSvg } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetChipSvg(
	params: Parameters<typeof getChipSvg> | Parameters<typeof getChipSvg>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getChipSvg>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetChipSvg", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getChipSvg(...(args as Parameters<typeof getChipSvg>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
