import { getChipSvgSrc } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetChipSvgSrc(
	params:
		| Parameters<typeof getChipSvgSrc>
		| Parameters<typeof getChipSvgSrc>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getChipSvgSrc>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetChipSvgSrc", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getChipSvgSrc(...(args as Parameters<typeof getChipSvgSrc>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
