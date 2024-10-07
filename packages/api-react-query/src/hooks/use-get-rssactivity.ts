import { getRSSActivity } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetRSSActivity(
	params:
		| Parameters<typeof getRSSActivity>
		| Parameters<typeof getRSSActivity>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getRSSActivity>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetRSSActivity", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getRSSActivity(...(args as Parameters<typeof getRSSActivity>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
