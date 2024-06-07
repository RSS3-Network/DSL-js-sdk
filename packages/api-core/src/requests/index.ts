import type { FetchResponse, MaybeOptionalInit } from "openapi-fetch";
import { objectToCamel, objectToSnake } from "ts-case-convert";

import type { paths } from "../types/openapi-schema.js";
import type {
  CamelCaseData,
  HttpMethod,
  PathParams,
} from "../types/utilities.js";
import { type Client, client as defaultClient } from "./client.js";
import {
  type RemoveNestedDataObj,
  removeNestedDataObj,
} from "./remove-nested-data-obj.js";

type CreateRequestResult<
  Path extends keyof paths,
  Method extends HttpMethod,
  FetchInit extends MaybeOptionalInit<paths[Path], Method>,
> = RemoveNestedDataObj<
  CamelCaseData<
    FetchResponse<paths[Path][Method], FetchInit, `${string}/${string}`>
  >
>;

function buildRequest<Path extends keyof paths, Method extends HttpMethod>(
  path: Path,
  method: Method,
) {
  const formatResult = <T extends Record<string, unknown>>(res: T) => {
    const result = removeNestedDataObj(res);

    if (result.data && typeof result.data === "object") {
      result.data = objectToCamel(result.data);
    }

    return result;
  };

  return {
    withParams<
      FetchInit extends MaybeOptionalInit<paths[Path], Method>,
      Params = PathParams<Path, Method>,
    >(getInit: (params: Params) => FetchInit) {
      return async (
        params: Params,
        init?: Omit<MaybeOptionalInit<paths[Path], Method>, "params"> | null,
        client: Client = defaultClient,
      ): Promise<CreateRequestResult<Path, Method, FetchInit>> =>
        formatResult(
          // biome-ignore lint/suspicious/noExplicitAny: Too complex to type
          await (client as any)[method.toUpperCase()](path, {
            ...getInit(params),
            ...init,
          }),
        );
    },

    withoutParams() {
      return async (
        init?: MaybeOptionalInit<paths[Path], Method> | null,
        client: Client = defaultClient,
      ): Promise<
        CreateRequestResult<
          Path,
          Method,
          MaybeOptionalInit<paths[Path], Method>
        >
      > =>
        formatResult(
          // biome-ignore lint/suspicious/noExplicitAny: Too complex to type
          await (client as any)[method.toUpperCase() as Uppercase<Method>](
            path,
            init,
          ),
        );
    },
  };
}

type RequestParams<T> = T extends (
  // biome-ignore lint/suspicious/noExplicitAny: Need any here
  init?: any,
  client?: Client,
  // biome-ignore lint/suspicious/noExplicitAny: Need any here
) => any
  ? undefined
  : T extends (
        params: infer P,
        // biome-ignore lint/suspicious/noExplicitAny: Need any here
        init?: any,
        client?: Client,
        // biome-ignore lint/suspicious/noExplicitAny: Need any here
      ) => any
    ? P
    : never;

// biome-ignore lint/suspicious/noExplicitAny: Need any here
type RequestResult<T extends (...args: any) => Promise<any>> = Exclude<
  Awaited<ReturnType<T>>["data"],
  undefined
>;

export type GetActivityParams = RequestParams<typeof getActivity>;
export type GetActivityResult = RequestResult<typeof getActivity>;
export const getActivity = buildRequest(
  "/decentralized/tx/{id}",
  "get",
).withParams(({ id, ...query }) => ({
  params: objectToSnake({ path: { id }, query: query }),
}));

export type GetAccountActivitiesParams = RequestParams<
  typeof getAccountActivities
>;
export type GetAccountActivitiesResult = RequestResult<
  typeof getAccountActivities
>;
export const getAccountActivities = buildRequest(
  "/decentralized/{account}",
  "get",
).withParams(({ account, ...query }) => ({
  params: objectToSnake({ path: { account }, query: query }),
}));

export type GetRSSActivityParams = RequestParams<typeof getRSSActivity>;
export type GetRSSActivityResult = RequestResult<typeof getRSSActivity>;
export const getRSSActivity = buildRequest("/rss/{path}", "get").withParams(
  (path) => ({
    params: objectToSnake({ path }),
  }),
);

export type GetBridgingTransactionsParams = RequestParams<
  typeof getBridgingTransactions
>;
export type GetBridgingTransactionsResult = RequestResult<
  typeof getBridgingTransactions
>;
export const getBridgingTransactions = buildRequest(
  "/nta/bridge/transactions",
  "get",
).withParams((query) => ({
  params: objectToSnake({ query }),
}));

export type GetBridgingTransactionParams = RequestParams<
  typeof getBridgingTransaction
>;
export type GetBridgingTransactionResult = RequestResult<
  typeof getBridgingTransaction
>;
export const getBridgingTransaction = buildRequest(
  "/nta/bridge/transactions/{transaction_hash}",
  "get",
).withParams((path) => ({
  params: objectToSnake({ path }),
}));

export type GetStakingTransactionsParams = RequestParams<
  typeof getStakingTransactions
>;
export type GetStakingTransactionsResult = RequestResult<
  typeof getStakingTransactions
>;
export const getStakingTransactions = buildRequest(
  "/nta/stake/transactions",
  "get",
).withParams((query) => ({
  params: objectToSnake({ query }),
}));

export type GetStakingTransactionParams = RequestParams<
  typeof getStakingTransaction
>;
export type GetStakingTransactionResult = RequestResult<
  typeof getStakingTransaction
>;
export const getStakingTransaction = buildRequest(
  "/nta/stake/transactions/{transaction_hash}",
  "get",
).withParams((path) => ({
  params: objectToSnake({ path }),
}));

export type GetStakingsParams = RequestParams<typeof getStakings>;
export type GetStakingsResult = RequestResult<typeof getStakings>;
export const getStakings = buildRequest(
  "/nta/stake/stakings",
  "get",
).withParams((query) => ({
  params: objectToSnake({ query }),
}));

export type GetStakingProfitParams = RequestParams<typeof getStakingProfit>;
export type GetStakingProfitResult = RequestResult<typeof getStakingProfit>;
export const getStakingProfit = buildRequest(
  "/nta/stake/{staker_address}/profit",
  "get",
).withParams((path) => ({
  params: objectToSnake({ path }),
}));

export type GetChipsParams = RequestParams<typeof getChips>;
export type GetChipsResult = RequestResult<typeof getChips>;
export const getChips = buildRequest("/nta/chips", "get").withParams(
  (query) => ({
    params: objectToSnake({ query }),
  }),
);

export type GetChipParams = RequestParams<typeof getChip>;
export type GetChipResult = RequestResult<typeof getChip>;
export const getChip = buildRequest("/nta/chips/{chip_id}", "get").withParams(
  (path) => ({
    params: objectToSnake({ path }),
  }),
);

export type GetChipSvgParams = RequestParams<typeof getChipSvg>;
export type GetChipSvgResult = RequestResult<typeof getChipSvg>;
export const getChipSvgURL = (
  params: GetChipSvgParams,
  client: Client = defaultClient,
) => new URL(`/nta/chips/${params.chipId}/image.svg`, client.baseUrl);
export const getChipSvgSrc = (
  params: GetChipSvgParams,
  client: Client = defaultClient,
) => getChipSvgURL(params, client).href;
export const getChipSvg = buildRequest(
  "/nta/chips/{chip_id}/image.svg",
  "get",
).withParams((path) => ({
  params: objectToSnake({ path }),
}));

export type GetNodeCountSnapshotParams = RequestParams<
  typeof getNodeCountSnapshot
>;
export type GetNodeCountSnapshotResult = RequestResult<
  typeof getNodeCountSnapshot
>;
export const getNodeCountSnapshot = buildRequest(
  "/nta/snapshots/nodes/count",
  "get",
).withoutParams();

export type GetMinimumStakingAmountSnapshotOfNodesParams = RequestParams<
  typeof getMinimumStakingAmountSnapshotOfNodes
>;
export type GetMinimumStakingAmountSnapshotOfNodesResult = RequestResult<
  typeof getMinimumStakingAmountSnapshotOfNodes
>;
export const getMinimumStakingAmountSnapshotOfNodes = buildRequest(
  "/nta/snapshots/nodes/min_tokens_to_stake",
  "post",
).withParams((body) => ({
  body: objectToSnake(body),
}));

export type GetStakerCountSnapshotParams = RequestParams<
  typeof getStakerCountSnapshot
>;
export type GetStakerCountSnapshotResult = RequestResult<
  typeof getStakerCountSnapshot
>;
export const getStakerCountSnapshot = buildRequest(
  "/nta/snapshots/stakers/count",
  "get",
).withoutParams();

export type GetStakerProfitSnapshotParams = RequestParams<
  typeof getStakerProfitSnapshot
>;
export type GetStakerProfitSnapshotResult = RequestResult<
  typeof getStakerProfitSnapshot
>;
export const getStakerProfitSnapshot = buildRequest(
  "/nta/snapshots/stakers/profit",
  "get",
).withParams((query) => ({
  params: objectToSnake({ query }),
}));

export type GetOperationProfitSnapshotParams = RequestParams<
  typeof getOperationProfitSnapshot
>;
export type GetOperationProfitSnapshotResult = RequestResult<
  typeof getOperationProfitSnapshot
>;
export const getOperationProfitSnapshot = buildRequest(
  "/nta/snapshots/nodes/operation/profit",
  "get",
).withParams((query) => ({
  params: objectToSnake({ query }),
}));

export type GetEpochsApySnapshotParams = RequestParams<
  typeof getEpochsApySnapshot
>;
export type GetEpochsApySnapshotResult = RequestResult<
  typeof getEpochsApySnapshot
>;
export const getEpochsApySnapshot = buildRequest(
  "/nta/snapshots/epochs/apy",
  "get",
).withoutParams();

export type GetAllNodesParams = RequestParams<typeof getAllNodes>;
export type GetAllNodesResult = RequestResult<typeof getAllNodes>;
export const getAllNodes = buildRequest("/nta/nodes", "get").withParams(
  (query) => ({
    params: objectToSnake({ query }),
  }),
);

export type GetNodeParams = RequestParams<typeof getNode>;
export type GetNodeResult = RequestResult<typeof getNode>;
export const getNode = buildRequest("/nta/nodes/{address}", "get").withParams(
  (path) => ({
    params: objectToSnake({ path }),
  }),
);

export type GetNodeAvatarSvgParams = RequestParams<typeof getNodeAvatarSvg>;
export type GetNodeAvatarSvgResult = RequestResult<typeof getNodeAvatarSvg>;
export const getNodeAvatarSvgURL = (
  params: GetNodeAvatarSvgParams,
  client: Client = defaultClient,
) => new URL(`/nta/nodes/${params.address}/avatar.svg`, client.baseUrl);
export const getNodeAvatarSvgSrc = (
  params: GetNodeAvatarSvgParams,
  client: Client = defaultClient,
) => getNodeAvatarSvgURL(params, client).href;
export const getNodeAvatarSvg = buildRequest(
  "/nta/nodes/{address}/avatar.svg",
  "get",
).withParams((path) => ({
  params: objectToSnake({ path }),
}));

export type GetNodeEventsParams = RequestParams<typeof getNodeEvents>;
export type GetNodeEventsResult = RequestResult<typeof getNodeEvents>;
export const getNodeEvents = buildRequest(
  "/nta/nodes/{address}/events",
  "get",
).withParams(({ address, ...query }) => ({
  params: objectToSnake({ path: { address }, query }),
}));

export type GetNodeOperationProfitParams = RequestParams<
  typeof getNodeOperationProfit
>;
export type GetNodeOperationProfitResult = RequestResult<
  typeof getNodeOperationProfit
>;
export const getNodeOperationProfit = buildRequest(
  "/nta/nodes/{node_address}/operation/profit",
  "get",
).withParams((path) => ({
  params: objectToSnake({ path }),
}));

export type GetEpochsParams = RequestParams<typeof getEpochs>;
export type GetEpochsResult = RequestResult<typeof getEpochs>;
export const getEpochs = buildRequest("/nta/epochs", "get").withParams(
  (query) => ({
    params: objectToSnake({ query }),
  }),
);

export type GetEpochParams = RequestParams<typeof getEpoch>;
export type GetEpochResult = RequestResult<typeof getEpoch>;
export const getEpoch = buildRequest(
  "/nta/epochs/{epoch_id}",
  "get",
).withParams((path) => ({
  params: objectToSnake({ path }),
}));

export type GetEpochTransactionParams = RequestParams<
  typeof getEpochTransaction
>;
export type GetEpochTransactionResult = RequestResult<
  typeof getEpochTransaction
>;
export const getEpochTransaction = buildRequest(
  "/nta/epochs/distributions/{transaction_hash}",
  "get",
).withParams((path) => ({
  params: objectToSnake({ path }),
}));

export type GetNodeRewardsParams = RequestParams<typeof getNodeRewards>;
export type GetNodeRewardsResult = RequestResult<typeof getNodeRewards>;
export const getNodeRewards = buildRequest(
  "/nta/epochs/{node_address}/rewards",
  "get",
).withParams(({ nodeAddress, ...query }) => ({
  params: objectToSnake({ path: { nodeAddress }, query }),
}));

export type GetAverageEpochsApyParams = RequestParams<
  typeof getAverageEpochsApy
>;
export type GetAverageEpochsApyResult = RequestResult<
  typeof getAverageEpochsApy
>;
export const getAverageEpochsApy = buildRequest(
  "/nta/epochs/apy",
  "get",
).withoutParams();

export type GetCompatibleNetworksParams = RequestParams<
  typeof getCompatibleNetworks
>;
export type GetCompatibleNetworksResult = RequestResult<
  typeof getCompatibleNetworks
>;
export const getCompatibleNetworks = buildRequest(
  "/nta/networks",
  "get",
).withoutParams();

export type GetAvailableWorkersParams = RequestParams<
  typeof getAvailableWorkers
>;
export type GetAvailableWorkersResult = RequestResult<
  typeof getAvailableWorkers
>;
export const getAvailableWorkers = buildRequest(
  "/nta/networks/{network_name}/list_workers",
  "get",
).withParams((path) => ({
  params: objectToSnake({ path }),
}));

export type GetWorkerConfigParams = RequestParams<typeof getWorkerConfig>;
export type GetWorkerConfigResult = RequestResult<typeof getWorkerConfig>;
export const getWorkerConfig = buildRequest(
  "/nta/networks/{network_name}/workers/{worker_name}",
  "get",
).withParams((path) => ({
  params: objectToSnake({ path }),
}));
