import { getFederatedActivity } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetFederatedActivity(
	params:
		| Parameters<typeof getFederatedActivity>
		| Parameters<typeof getFederatedActivity>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getFederatedActivity>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetFederatedActivity", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getFederatedActivity(
				...(args as Parameters<typeof getFederatedActivity>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
