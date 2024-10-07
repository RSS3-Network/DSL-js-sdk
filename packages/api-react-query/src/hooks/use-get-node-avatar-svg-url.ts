import { getNodeAvatarSvgURL } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetNodeAvatarSvgURL(
	params:
		| Parameters<typeof getNodeAvatarSvgURL>
		| Parameters<typeof getNodeAvatarSvgURL>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getNodeAvatarSvgURL>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetNodeAvatarSvgURL", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getNodeAvatarSvgURL(
				...(args as Parameters<typeof getNodeAvatarSvgURL>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
