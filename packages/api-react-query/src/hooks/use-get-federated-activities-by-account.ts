import { getFederatedActivitiesByAccount } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetFederatedActivitiesByAccount(
	params:
		| Parameters<typeof getFederatedActivitiesByAccount>
		| Parameters<typeof getFederatedActivitiesByAccount>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getFederatedActivitiesByAccount>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetFederatedActivitiesByAccount", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getFederatedActivitiesByAccount(
				...(args as Parameters<typeof getFederatedActivitiesByAccount>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
