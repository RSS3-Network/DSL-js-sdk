import { getStakingStat } from "@rss3/api-core";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetStakingStat(
	params:
		| Parameters<typeof getStakingStat>
		| Parameters<typeof getStakingStat>[0],
	options?: Omit<
		UseQueryOptions<ReturnType<typeof getStakingStat>>,
		"queryKey" | "queryFn"
	>,
) {
	const queryKey = ["useGetStakingStat", params];
	const query = useQuery({
		queryKey,
		queryFn: () => {
			const args = Array.isArray(params) ? params : [params];
			return getStakingStat(...(args as Parameters<typeof getStakingStat>));
		},
		...options,
	});
	return {
		...query,
		queryKey,
	};
}
