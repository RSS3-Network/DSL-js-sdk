import pkg from "../package.json";

import type * as requests from "../src/requests/index.js";
import type { paths } from "../src/schema.js";
import type { HttpMethod } from "../src/types/utilities.js";

import openAPI from "./openapi.json";
import { writeFileSync } from "./utils/write-file-sync.js";

type ValidMethods<T extends Record<string, unknown>> = Exclude<
  {
    [K in keyof T]: T[K] extends undefined ? never : K;
  }[Extract<keyof T, HttpMethod>],
  undefined
>;

const pathToRequestMap = {
  "/decentralized/tx/{id}": {
    get: "getActivity",
  },
  "/decentralized/{account}": {
    get: "getActivities",
  },
  "/rss/{path}": {
    get: "getRSSActivity",
  },
  "/nta/bridgings/transactions": {
    get: "getBridgingTransactions",
  },
  "/nta/bridgings/transactions/{transaction_hash}": {
    get: "getBridgingTransaction",
  },
  "/nta/stakings/transactions": {
    get: "getStakingTransactions",
  },
  "/nta/stakings/transactions/{transaction_hash}": {
    get: "getStakingTransaction",
  },
  "/nta/stakings/stakings": {
    get: "getStakings",
  },
  "/nta/stakings/{staker_address}/profit": {
    get: "getStakingProfit",
  },
  "/nta/chips": {
    get: "getChips",
  },
  "/nta/chips/{chip_id}": {
    get: "getChip",
  },
  "/nta/chips/{chip_id}/image.svg": {
    get: {
      mainFn: "getChipSvg",
      alsoExports: ["getChipSvgURL", "getChipSvgSrc"],
    },
  },
  "/nta/snapshots/nodes/count": {
    get: "getNodeCountSnapshot",
  },
  "/nta/snapshots/nodes/min_tokens_to_stake": {
    post: "getMinimumStakingAmountSnapshotOfNodes",
  },
  "/nta/snapshots/stakers/count": {
    get: "getStakerCountSnapshot",
  },
  "/nta/snapshots/stakers/profit": {
    get: "getStakerProfitSnapshot",
  },
  "/nta/snapshots/nodes/operation/profit": {
    get: "getOperationProfitSnapshot",
  },
  "/nta/snapshots/epochs/apy": {
    get: "getEpochsApySnapshot",
  },
  "/nta/nodes": {
    get: "getAllNodes",
  },
  "/nta/nodes/{address}": {
    get: "getNode",
  },
  "/nta/nodes/{address}/avatar.svg": {
    get: {
      mainFn: "getNodeAvatarSvg",
      alsoExports: ["getNodeAvatarSvgURL", "getNodeAvatarSvgSrc"],
    },
  },
  "/nta/nodes/{address}/events": {
    get: "getNodeEvents",
  },
  "/nta/nodes/{address}/operation/profit": {
    get: "getNodeOperationProfit",
  },
  "/nta/epochs": {
    get: "getEpochs",
  },
  "/nta/epochs/{epoch_id}": {
    get: "getEpoch",
  },
  "/nta/epochs/distributions/{transaction_hash}": {
    get: "getEpochTransaction",
  },
  "/nta/epochs/{address}/rewards": {
    get: "getNodeRewards",
  },
  "/nta/epochs/apy": {
    get: "getAverageEpochsApy",
  },
  "/nta/networks": {
    get: "getCompatibleNetworks",
  },
  "/nta/networks/{network_name}/list_workers": {
    get: "getAvailableWorkers",
  },
  "/nta/networks/{network_name}/workers/{worker_name}": {
    get: "getWorkerConfig",
  },
} satisfies {
  [K in keyof paths]: {
    [M in ValidMethods<paths[K]>]:
      | keyof typeof requests
      | {
          mainFn: keyof typeof requests;
          alsoExports: (keyof typeof requests)[];
        };
  };
} as Record<
  string,
  Record<string, string | { mainFn: string; alsoExports: string[] }>
>;

const groupedFnNames: Record<string, string[]> = {};

for (const [path, pathMeta] of Object.entries(openAPI.paths)) {
  for (const [httpMethod, methodMeta] of Object.entries(pathMeta)) {
    if ("tags" in methodMeta && Array.isArray(methodMeta.tags)) {
      for (const tag of methodMeta.tags) {
        const requestFnName = pathToRequestMap[path]?.[httpMethod];
        const fnTypes = (fnName: string) => [
          `type ${capitalize(fnName)}Params`,
          `type ${capitalize(fnName)}Result`,
        ];

        groupedFnNames[tag] ??= [];

        if (typeof requestFnName === "string") {
          groupedFnNames[tag]?.push(requestFnName, ...fnTypes(requestFnName));
        } else if (requestFnName) {
          groupedFnNames[tag]?.push(
            requestFnName.mainFn,
            ...fnTypes(requestFnName.mainFn),
            ...requestFnName.alsoExports,
          );
        } else {
          throw new Error(
            `No request function found for ${path} ${httpMethod}`,
          );
        }
      }
    }
  }
}

const comment = "// This file is generated by `scripts/categorize-requests.ts`";
const exports: Record<
  string,
  { types: string; import: string; default: string }
> = { ...pkg.exports };
const files = ["package.json", "dist", "src", "README.md", "schema"];

for (const [tag, fnNames] of Object.entries(groupedFnNames)) {
  const filename = tag.toLowerCase();

  writeFileSync(
    import.meta,
    `../src/${filename}.ts`,
    `${comment}\nexport { ${fnNames.join(",")} } from "./requests/index.js";`,
  );

  writeFileSync(
    import.meta,
    `../${filename}/package.json`,
    JSON.stringify(
      {
        types: `../dist/esm/${filename}.d.ts`,
        module: `../dist/esm/${filename}.js`,
        main: `../dist/cjs/${filename}.js`,
      },
      null,
      2,
    ),
  );

  files.push(filename);
  exports[`./${filename}`] = {
    types: `./dist/esm/${filename}.d.ts`,
    import: `./dist/esm/${filename}.js`,
    default: `./dist/cjs/${filename}.js`,
  };
}

files.sort();

writeFileSync(
  import.meta,
  "../package.json",
  JSON.stringify({ ...pkg, exports, files }, null, 2),
);

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
