import { getActivity } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetActivity(
	params: Parameters<typeof getActivity> | Parameters<typeof getActivity>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getActivity>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetActivity", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getActivity(...(args as Parameters<typeof getActivity>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
