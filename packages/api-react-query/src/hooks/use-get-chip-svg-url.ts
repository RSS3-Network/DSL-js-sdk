import { getChipSvgURL } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetChipSvgURL(
	params:
		| Parameters<typeof getChipSvgURL>
		| Parameters<typeof getChipSvgURL>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getChipSvgURL>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetChipSvgURL", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getChipSvgURL(...(args as Parameters<typeof getChipSvgURL>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
