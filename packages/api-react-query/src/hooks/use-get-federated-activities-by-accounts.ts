import { getFederatedActivitiesByAccounts } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetFederatedActivitiesByAccounts(
	params:
		| Parameters<typeof getFederatedActivitiesByAccounts>
		| Parameters<typeof getFederatedActivitiesByAccounts>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getFederatedActivitiesByAccounts>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetFederatedActivitiesByAccounts", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getFederatedActivitiesByAccounts(
				...(args as Parameters<typeof getFederatedActivitiesByAccounts>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
