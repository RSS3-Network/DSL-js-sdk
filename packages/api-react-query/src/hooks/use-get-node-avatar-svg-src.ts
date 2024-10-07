import { getNodeAvatarSvgSrc } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetNodeAvatarSvgSrc(
	params:
		| Parameters<typeof getNodeAvatarSvgSrc>
		| Parameters<typeof getNodeAvatarSvgSrc>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getNodeAvatarSvgSrc>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetNodeAvatarSvgSrc", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getNodeAvatarSvgSrc(
				...(args as Parameters<typeof getNodeAvatarSvgSrc>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
