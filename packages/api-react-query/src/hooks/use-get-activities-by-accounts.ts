import { getActivitiesByAccounts } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetActivitiesByAccounts(
	params:
		| Parameters<typeof getActivitiesByAccounts>
		| Parameters<typeof getActivitiesByAccounts>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getActivitiesByAccounts>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetActivitiesByAccounts", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getActivitiesByAccounts(
				...(args as Parameters<typeof getActivitiesByAccounts>),
			);
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
