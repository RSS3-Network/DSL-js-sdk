import { getPlatformActivity } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetPlatformActivity(
	params:
		| Parameters<typeof getPlatformActivity>
		| Parameters<typeof getPlatformActivity>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getPlatformActivity>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetPlatformActivity", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getPlatformActivity(
				...(args as Parameters<typeof getPlatformActivity>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
