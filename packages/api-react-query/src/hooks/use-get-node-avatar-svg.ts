import { getNodeAvatarSvg } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetNodeAvatarSvg(
	params:
		| Parameters<typeof getNodeAvatarSvg>
		| Parameters<typeof getNodeAvatarSvg>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getNodeAvatarSvg>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetNodeAvatarSvg", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getNodeAvatarSvg(...(args as Parameters<typeof getNodeAvatarSvg>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
