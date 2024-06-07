export interface paths {
  "/decentralized/tx/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Activity by ID */
    get: {
      parameters: {
        query?: {
          /**
           * @description Specify the number of actions within the activity to retrieve
           * @example 10
           */
          action_limit?: number;
          /**
           * @description Specify the pagination for actions
           * @example 1
           */
          action_page?: number;
        };
        header?: never;
        path: {
          /**
           * @description Retrieve details for the specified activity ID
           * @example 0x000000000000000000000000113f4b4c3765e5f05fd197c5c35b8a8a9b34245b
           */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description A successful response with the details of the activity. */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["ActivityResponse"];
          };
        };
        /** @description The request is malformed or contains invalid parameters. */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description The specified activity ID was not found. */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description An internal server error occurred while processing the request. */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/decentralized/{account}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Account Activities */
    get: {
      parameters: {
        query?: {
          /**
           * @description Specify the number of activities to retrieve
           * @example 20
           */
          limit?: number;
          /**
           * @description Specify the number of actions within the activity to retrieve
           * @example 10
           */
          action_limit?: number;
          /** @description Specify the cursor used for pagination */
          cursor?: string;
          /** @description Retrieve activities starting from this timestamp */
          since_timestamp?: number;
          /** @description Retrieve activities up to this timestamp */
          until_timestamp?: number;
          /** @description Retrieve activities based on success status */
          success?: boolean;
          /** @description Retrieve activities based on direction */
          direction?: components["schemas"]["Direction"];
          /** @description Retrieve activities from the specified network(s) */
          network?: components["schemas"]["Network"][];
          /** @description Retrieve activities from the specified tag(s) */
          tag?: components["schemas"]["Tag"][];
          /** @description Retrieve activities from the specified type(s) */
          type?: string[];
          /** @description Retrieve activities from the specified platform(s) */
          platform?: components["schemas"]["Platform"][];
        };
        header?: never;
        path: {
          /**
           * @description Retrieve activities from the specified account
           * @example 0xd8da6bf26964af9d7eed9e03e53415d37aa96045
           */
          account: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description A successful response with the activities from the specified account. */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["ActivitiesResponse"];
          };
        };
        /** @description The request is malformed or contains invalid parameters. */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description The specified account was not found. */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description An internal server error occurred while processing the request. */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/rss/{path}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get RSS Activity by Path */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          /**
           * @description Retrieve details for the specified RSS path
           * @example abc
           */
          path: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description A successful response with the details of the RSS activity. */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["ActivitiesResponse"];
          };
        };
        /** @description The request is malformed or contains invalid parameters. */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description The specified RSS path was not found. */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description An internal server error occurred while processing the request. */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/bridge/transactions": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get bridging transactions
     * @description Get bridging transactions
     */
    get: {
      parameters: {
        query?: {
          cursor?: string;
          sender?: string;
          receiver?: string;
          address?: string;
          type?: "deposit" | "withdraw";
          limit?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: components["schemas"]["BridgeTransaction"][];
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/bridge/transactions/{transaction_hash}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get bridging transaction by hash
     * @description Get bridging transaction by transaction hash
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          transaction_hash: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: components["schemas"]["BridgeTransaction"];
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/stake/transactions": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get staking transactions
     * @description Get staking transactions
     */
    get: {
      parameters: {
        query?: {
          cursor?: string;
          staker?: string;
          node?: string;
          type?: "deposit" | "withdraw" | "stake" | "unstake";
          pending?: boolean;
          limit?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: components["schemas"]["StakeTransaction"][];
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/stake/transactions/{transaction_hash}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get staking transaction by hash
     * @description Get staking transaction by transaction hash
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          transaction_hash: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: components["schemas"]["StakeTransaction"];
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/stake/stakings": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get a list of stakers and Nodes
     * @description Get a list of stakers and Nodes
     */
    get: {
      parameters: {
        query?: {
          staker_address?: string;
          node_address?: string;
          limit?: number;
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: components["schemas"]["StakeStaking"][];
              /** @example 0x08d66b34054a174841e2361bd4746ff9f4905cc2 */
              cursor?: string;
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/stake/{staker_address}/profit": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get staking profit of a staker
     * @description Get staking profit of a staker
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          staker_address: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: {
                owner?: string;
                total_chip_amount?: string;
                total_chip_value?: string;
                oneDay?: components["schemas"]["ChipPNL"];
                oneWeek?: components["schemas"]["ChipPNL"];
                oneMonth?: components["schemas"]["ChipPNL"];
              };
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/chips": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get all chips
     * @description Get all chips
     */
    get: {
      parameters: {
        query?: {
          cursor?: string;
          id?: number[];
          node?: string;
          owner?: string;
          limit?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: components["schemas"]["Chips"][];
              cursor?: string;
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/chips/{chip_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get Chips by chip id
     * @description Get Chips by chip id
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          chip_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Chips"];
          };
        };
        /** @description Not found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/chips/{chip_id}/image.svg": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get Chips image by id
     * @description Get Chips image by chip id
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          chip_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "image/svg+xml": string;
          };
        };
        /** @description Not found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/snapshots/nodes/count": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get snapshots of Node count
     * @description Get snapshots of Node count
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: {
                date?: string;
                count?: number;
              }[];
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/snapshots/nodes/min_tokens_to_stake": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Get snapshots of the minimum staking amount
     * @description Get snapshots of the minimum staking amount for Nodes
     */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: {
        content: {
          "application/json": {
            node_addresses?: string[];
            /** @description If true, only return the start and end min_tokens_to_stake */
            only_start_and_end?: boolean;
          };
        };
      };
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: components["schemas"]["NodeMinTokensToStakeSnapshot"][];
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/snapshots/stakers/count": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get snapshots of staker count
     * @description Get snapshots of total staker count
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: {
                date?: string;
                count?: number;
              }[];
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/snapshots/stakers/profit": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get snapshots of the staker profit
     * @description Get snapshots of the staker profit
     */
    get: {
      parameters: {
        query: {
          staker_address: string;
          cursor?: string;
          /** @description The number of snapshots to return, if not provided, return all snapshots */
          limit?: number;
          /** @description The date before which the snapshots are returned */
          beforeDate?: string;
          /** @description The date after which the snapshots are returned */
          afterDate?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: components["schemas"]["StakerProfitSnapshot"][];
              cursor?: string;
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/snapshots/nodes/operation/profit": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get snapshots of operation profit
     * @description Get snapshots of operation profit
     */
    get: {
      parameters: {
        query: {
          node_address: string;
          cursor?: string;
          /** @description The number of snapshots to return, if not provided, return all snapshots */
          limit?: number;
          /** @description The date before which the snapshots are returned */
          beforeDate?: string;
          /** @description The date after which the snapshots are returned */
          afterDate?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: components["schemas"]["OperationProfit"][];
              cursor?: string;
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/snapshots/epochs/apy": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get the apy of epoch snapshots
     * @description Get the apy of epoch snapshots
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: components["schemas"]["EpochAPYSnapshot"][];
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/nodes": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get all Nodes
     * @description Get all Nodes
     */
    get: {
      parameters: {
        query?: {
          cursor?: string;
          /** @description The number of Nodes to return, default is 10, maximum is 50 */
          limit?: number;
          node_address?: string[];
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Node"][];
          };
        };
        /** @description Not found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Internal Server Error */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/nodes/{address}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get Node by address
     * @description Get Node by address
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          address: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Node"];
          };
        };
        /** @description Not found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Internal Server Error */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/nodes/{address}/avatar.svg": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get Node avatar by address
     * @description Get Node avatar by address
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          address: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "image/svg+xml": string;
          };
        };
        /** @description Not found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Internal Server Error */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/nodes/{address}/events": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get Node transaction events by address
     * @description Get Node transaction events by address
     */
    get: {
      parameters: {
        query?: {
          cursor?: string;
          limit?: number;
        };
        header?: never;
        path: {
          address: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: components["schemas"]["NodeEvent"][];
              cursor?: string;
            };
          };
        };
        /** @description Not found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Internal Server Error */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/nodes/{node_address}/operation/profit": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get Node operation profit by address
     * @description Get Node operation profit by Node address
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          node_address: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: {
                address?: string;
                operation_pool?: string;
                oneDay?: components["schemas"]["OperationProfitPNL"];
                oneWeek?: components["schemas"]["OperationProfitPNL"];
                oneMonth?: components["schemas"]["OperationProfitPNL"];
              };
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/epochs": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get all epochs
     * @description Get all epochs
     */
    get: {
      parameters: {
        query?: {
          cursor?: string;
          limit?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: components["schemas"]["BriefEpoch"][];
              cursor?: string;
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/epochs/{epoch_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get epoch by id
     * @description Get epoch by epoch id
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          epoch_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Epoch"];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/epochs/distributions/{transaction_hash}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get epoch transaction by hash
     * @description Get epoch transaction by hash
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          transaction_hash: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: components["schemas"]["EpochDistribution"][];
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/epochs/{node_address}/rewards": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get Node rewards by epoch
     * @description Get Node rewards by epoch
     */
    get: {
      parameters: {
        query?: {
          cursor?: string;
          limit?: number;
        };
        header?: never;
        path: {
          node_address: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: components["schemas"]["Epoch"][];
              cursor?: string;
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/epochs/apy": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get the average of epochs APY
     * @description Get the average of epochs APY
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: string;
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/networks": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get all compatible networks
     * @description Get all compatible networks
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": string[];
          };
        };
        /** @description Not found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Internal Server Error */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/networks/{network_name}/list_workers": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get available workers by network
     * @description Get available workers by network
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          network_name: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": string[];
          };
        };
        /** @description Not found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Internal Server Error */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nta/networks/{network_name}/workers/{worker_name}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get config by network and worker
     * @description Get config by network and worker
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          network_name: string;
          worker_name: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data?: components["schemas"]["NetworkWorker"][];
            };
          };
        };
        /** @description Not found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Internal Server Error */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /** @description Represents an individual action within an activity. */
    Action: {
      /** @description The address from which the action originated. */
      from?: string;
      /** @description Additional metadata related to the action. */
      metadata?: Record<string, never>;
      platform?: components["schemas"]["Platform"];
      /** @description A list of URLs related to the action. */
      related_urls?: string[];
      tag?: components["schemas"]["Tag"];
      /** @description The address to which the action is directed. */
      to?: string;
      /** @description The type of action performed. */
      type?: string;
    };
    /** @description The response structure for a list of activities. */
    ActivitiesResponse: {
      /** @description The list of activities. */
      data?: components["schemas"]["Activity"][];
      meta?: components["schemas"]["MetaCursor"];
    };
    Activity: {
      /** @description The list of actions within the activity. */
      actions?: components["schemas"]["Action"][];
      calldata?: components["schemas"]["Calldata"];
      direction?: components["schemas"]["Direction"];
      fee?: components["schemas"]["Fee"];
      /** @description The address from which the activity originated. */
      from?: string;
      /** @description The unique identifier for the activity. */
      id?: string;
      /** @description The index of the activity in the list. */
      index?: number;
      network?: components["schemas"]["Network"];
      /** @description The owner of the activity. */
      owner?: string;
      platform?: components["schemas"]["Platform"];
      /** @description Indicates whether the activity was successful. */
      success?: boolean;
      tag?: components["schemas"]["Tag"];
      /** @description The timestamp of when the activity occurred. */
      timestamp?: number;
      /** @description The address to which the activity is directed. */
      to?: string;
      /** @description The total number of actions within the activity. */
      total_actions?: number;
      /** @description The type of activity performed. */
      type?: string;
    };
    ActivityResponse: {
      data?: components["schemas"]["Activity"];
      meta?: components["schemas"]["MetaTotalPages"];
    };
    /** @description Represents the call data associated with an activity. */
    Calldata: {
      /** @description The hash of the function called. */
      function_hash?: string;
      /** @description The parsed function name. */
      parsed_function?: string;
      /** @description The raw call data. */
      raw?: string;
    };
    /**
     * @description The direction of an activity.
     * @enum {string}
     */
    Direction: "in" | "out" | "self";
    /**
     * @description A tag used to categorize activities.
     * @enum {string}
     */
    Tag:
      | "collectible"
      | "exchange"
      | "metaverse"
      | "rss"
      | "social"
      | "transaction"
      | "unknown";
    /**
     * @description The network on which activities occur.
     * @enum {string}
     */
    Network:
      | "arbitrum"
      | "arweave"
      | "avax"
      | "base"
      | "binance-smart-chain"
      | "crossbell"
      | "ethereum"
      | "farcaster"
      | "gnosis"
      | "linea"
      | "optimism"
      | "polygon"
      | "vsl";
    /**
     * @description The platform on which activities occur.
     * @enum {string}
     */
    Platform:
      | "1inch"
      | "AAVE"
      | "Aavegotchi"
      | "Crossbell"
      | "Curve"
      | "ENS"
      | "Farcaster"
      | "Highlight"
      | "IQWiki"
      | "KiwiStand"
      | "Lens"
      | "Lido"
      | "LooksRare"
      | "Matters"
      | "Mirror"
      | "OpenSea"
      | "Optimism"
      | "Paragraph"
      | "RSS3"
      | "SAVM"
      | "Stargate"
      | "Uniswap"
      | "Unknown"
      | "VSL";
    /** @description Represents fee information for an activity. */
    Fee: {
      /** @description The address to which the fee is paid. */
      address?: string;
      /** @description The amount of the fee. */
      amount?: string;
      /** @description The decimal precision of the fee amount. */
      decimal?: number;
    };
    /** @description Metadata for paginated responses. */
    MetaCursor: {
      /** @description The cursor for the next set of results. */
      cursor?: string;
    };
    /** @description Metadata indicating the total number of pages. */
    MetaTotalPages: {
      /** @description The total number of pages available. */
      totalPages?: number;
    };
    /** @example {
     *       "id": "0xdbfa26e70977dfe2d68f3da7dd7d9e0c04136ecf14e80b98b209314ae7c462ff",
     *       "sender": "0x3b6d02a24df681ffdf621d35d70aba7adaac07c1",
     *       "receiver": "0x3b6d02a24df681ffdf621d35d70aba7adaac07c1",
     *       "token": {
     *         "address": {
     *           "l1": "0x3ef1d5be1e2ce46c583a0c8e511f015706a0ab23",
     *           "l2": "0x4200000000000000000000000000000000000042"
     *         },
     *         "value": "10000000000000000000000"
     *       },
     *       "event": {
     *         "deposit": {
     *           "initialized": {
     *             "block": {
     *               "hash": "0x7735d45a54e91e836881c2f185766b391f335b53734b0a57f6c8843f66d03a13",
     *               "number": 5223592,
     *               "timestamp": 1707118764
     *             },
     *             "transaction": {
     *               "hash": "0x28e8d8f6cbbdfcf14501ebf0bbd11647dfabab371fc7a989a1e441321af6a6ee",
     *               "index": 49
     *             }
     *           },
     *           "finalized": {
     *             "block": {
     *               "hash": "0xb0208c1b76aca5d51cb3cde5d10a90f20c2e520c935fbb99af0b66031489433e",
     *               "number": 117285,
     *               "timestamp": 1707118890
     *             },
     *             "transaction": {
     *               "hash": "0x493972cb6219c74071c69fd9279df74b8cebbac4d087259991253e58930a4edb",
     *               "index": 1
     *             }
     *           }
     *         }
     *       }
     *     } */
    BridgeTransaction: {
      id?: string;
      sender?: string;
      receiver?: string;
      token?: {
        address?: {
          l1?: string;
          l2?: string;
        };
        value?: string;
      };
      event?: {
        deposit?: {
          initialized?: components["schemas"]["TransactionEvent"];
          finalized?: components["schemas"]["TransactionEvent"];
        } | null;
        withdraw?: {
          initialized?: components["schemas"]["TransactionEvent"];
          proved?: components["schemas"]["TransactionEvent"];
          finalized?: components["schemas"]["TransactionEvent"];
        } | null;
      };
    };
    /** @example {
     *       "id": "0xbfbb8cbffc01c13c1f849ecfb53099309e189b362fd621addbfa9f5d03dcd0c1",
     *       "staker": "0xc8b960d09c0078c18dcbe7eb9ab9d816bcca8944",
     *       "node": "0x6727a51caefcaf1bc189a8316ea09f844644b195",
     *       "value": "8239445455124262851652",
     *       "chips": [
     *         {
     *           "id": 2105,
     *           "node": "0x6727a51caefcaf1bc189a8316ea09f844644b195",
     *           "owner": "0xc8b960d09c0078c18dcbe7eb9ab9d816bcca8944",
     *           "metadata": {
     *             "name": "Chip #2105",
     *             "description": "Chip is a unique NFT that represents a Node in the network. It is generated based on the node's address and token ID.",
     *             "image": "https://gi.rss3.dev/chips/2105/image.svg"
     *           }
     *         }
     *       ],
     *       "event": {
     *         "deposit": {
     *           "deposited": {
     *             "block": {
     *               "hash": "0x37af6202ef8303485aa3db32be6668070b6b9c7e46521325f959369847482015",
     *               "number": 128115,
     *               "timestamp": 1707140550
     *             },
     *             "transaction": {
     *               "hash": "0x823d988f7a18215ea850010131e5fa138d8d882ae4f95716d5791a45fac57833",
     *               "index": 1
     *             }
     *           }
     *         }
     *       }
     *     } */
    StakeTransaction: {
      id?: string;
      staker?: string;
      node?: string;
      value?: string;
      chips?: components["schemas"]["Chips"][] | null;
      event?: {
        deposit?: {
          requested?: components["schemas"]["TransactionEvent"];
          claimed?: components["schemas"]["TransactionEvent"];
        } | null;
        withdraw?: {
          deposited?: components["schemas"]["TransactionEvent"];
        } | null;
        stake?: {
          staked?: components["schemas"]["TransactionEvent"];
        } | null;
        unstake?: {
          requested?: components["schemas"]["TransactionEvent"];
          claimed?: components["schemas"]["TransactionEvent"];
        } | null;
      };
    };
    /** @example {
     *       "block": {
     *         "hash": "0x200b26e118e51f23d052ef3aa92bc411dbd0a6ce811f511adb9f6049dc938614",
     *         "number": 726419,
     *         "timestamp": 1708337158
     *       },
     *       "transaction": {
     *         "hash": "0x6595192f1193c2584c28e7d4b50b9208242bf9b4538933f0081d3f4625373d2f",
     *         "index": 1
     *       }
     *     } */
    TransactionEvent: {
      block?: {
        hash?: string;
        number?: number;
        timestamp?: number;
      };
      transaction?: {
        hash?: string;
        index?: number;
      };
    } | null;
    /** @example {
     *       "staker": 3.3926146615919217e+47,
     *       "node": "0x08d66b34054a174841e2361bd4746ff9f4905cc2",
     *       "chips": {
     *         "total": 200,
     *         "showcase": [
     *           {
     *             "id": 275,
     *             "node": "0x08d66b34054a174841e2361bd4746ff9f4905cc2",
     *             "owner": "0x3b6d02a24df681ffdf621d35d70aba7adaac07c1",
     *             "metadata": {
     *               "name": "Chip #275",
     *               "description": "Chip is a unique NFT that represents a Node in the network. It is generated based on the node's address and token ID.",
     *               "image": "https://gi.rss3.dev/chips/275/image.svg"
     *             }
     *           },
     *           {
     *             "id": 276,
     *             "node": "0x08d66b34054a174841e2361bd4746ff9f4905cc2",
     *             "owner": "0x3b6d02a24df681ffdf621d35d70aba7adaac07c1",
     *             "metadata": {
     *               "name": "Chip #276",
     *               "description": "Chip is a unique NFT that represents a Node in the network. It is generated based on the node's address and token ID.",
     *               "image": "https://gi.rss3.dev/chips/275/image.svg"
     *             }
     *           },
     *           {
     *             "id": 277,
     *             "node": "0x08d66b34054a174841e2361bd4746ff9f4905cc2",
     *             "owner": "0x3b6d02a24df681ffdf621d35d70aba7adaac07c1",
     *             "metadata": {
     *               "name": "Chip #277",
     *               "description": "Chip is a unique NFT that represents a Node in the network. It is generated based on the node's address and token ID.",
     *               "image": "https://gi.rss3.dev/chips/275/image.svg"
     *             }
     *           },
     *           {
     *             "id": 278,
     *             "node": "0x08d66b34054a174841e2361bd4746ff9f4905cc2",
     *             "owner": "0x3b6d02a24df681ffdf621d35d70aba7adaac07c1",
     *             "metadata": {
     *               "name": "Chip #278",
     *               "description": "Chip is a unique NFT that represents a Node in the network. It is generated based on the node's address and token ID.",
     *               "image": "https://gi.rss3.dev/chips/275/image.svg"
     *             }
     *           },
     *           {
     *             "id": 279,
     *             "node": "0x08d66b34054a174841e2361bd4746ff9f4905cc2",
     *             "owner": "0x3b6d02a24df681ffdf621d35d70aba7adaac07c1",
     *             "metadata": {
     *               "name": "Chip #279",
     *               "description": "Chip is a unique NFT that represents a Node in the network. It is generated based on the node's address and token ID.",
     *               "image": "https://gi.rss3.dev/chips/275/image.svg"
     *             }
     *           }
     *         ]
     *       }
     *     } */
    StakeStaking: {
      staker?: string;
      node?: string;
      chips?: {
        total?: number;
        showcase?: components["schemas"]["Chips"][];
      };
    };
    /** @example {
     *       "id": 474,
     *       "node": "0x08d66b34054a174841e2361bd4746ff9f4905cc2",
     *       "owner": "0x3b6d02a24df681ffdf621d35d70aba7adaac07c1",
     *       "metadata": {
     *         "name": "Chip #474",
     *         "description": "Chip is a unique NFT that represents a Node in the network. It is generated based on the node's address and token ID.",
     *         "image": "https://gi.rss3.dev/chips/474/image.svg"
     *       },
     *       "value": "5000000000000000000000",
     *       "latest_value": "5500000000000000000000"
     *     } */
    Chips: {
      id?: number;
      node?: string;
      owner?: string;
      metadata?: {
        name?: string;
        description?: string;
        image?: string;
      };
      /** @description the value at time of minting */
      value?: string;
      /** @description The latest value of the chip */
      latest_value?: string;
    };
    /** @example {
     *       "id": 1,
     *       "address": "0xc5999271b01afc77ed7a6738b40c34677c2a581c",
     *       "name": "RSS3 Node",
     *       "description": "Get started with RSS3 Node with symphonia",
     *       "tax_rate_basis_points": 1000,
     *       "is_public_good": false,
     *       "operation_pool_tokens": "10000000000000000000000",
     *       "staking_pool_tokens": "0",
     *       "total_shares": "0",
     *       "slashed_tokens": "0",
     *       "status": "online",
     *       "last_heartbeat": 1709117916,
     *       "local": [
     *         {
     *           "country": "CN",
     *           "region": "GD",
     *           "city": "SZ",
     *           "latitude": 22.5431,
     *           "longitude": 114.0579
     *         }
     *       ],
     *       "avatar": [
     *         {
     *           "name": "Node Avatar",
     *           "description": "",
     *           "image": "http://127.0.0.1/nodes/0xC5999271b01AfC77ED7a6738b40C34677C2A581c/avatar.svg"
     *         }
     *       ],
     *       "min_tokens_to_stake": "0",
     *       "created_at": 1709087910
     *     } */
    Node: {
      id?: number;
      address?: string;
      name?: string;
      description?: string;
      tax_rate_basis_points?: number | null;
      is_public_good?: boolean;
      operation_pool_tokens?: string;
      staking_pool_tokens?: string;
      total_shares?: string;
      slashed_tokens?: string;
      /** @enum {string} */
      status?: "registered" | "online" | "offline" | "exited";
      /** @description The timestamp of the last heartbeat */
      last_heartbeat?: number;
      local?: {
        country?: string;
        region?: string;
        city?: string;
        latitude?: number;
        longitude?: number;
      }[];
      avatar?: {
        name?: string;
        image?: string;
        description?: string;
      };
      min_tokens_to_stake?: string;
      /** @description The timestamp of the Node creation */
      created_at?: number;
    };
    NodeEvent: {
      address_from?: string;
      address_to?: string;
      node_id?: number;
      /** @enum {string} */
      type?: "node_created" | "node_updated" | "node_updated_to_public_good";
      log_index?: number;
      chain_id?: number;
      block?: {
        hash?: string;
        number?: number;
        timestamp?: number;
      };
      transaction?: {
        hash?: string;
        index?: number;
      };
      metadata?: {
        node_created?: {
          node_id?: number;
          address?: string;
          name?: string;
          description?: string;
          tax_rate_basis_points?: number;
          is_public_good?: boolean;
        };
        node_updated?: {
          address?: string;
          name?: string;
          description?: string;
        };
        node_updated_to_public_good?: {
          address?: string;
          is_public_good?: boolean;
        };
      };
    };
    NodeMinTokensToStakeSnapshot: {
      node_address?: string;
      snapshots?: {
        /** @example 2024-03-13T00:08:38+08:00 */
        date?: string;
        epoch_id?: number;
        node_address?: string;
        min_tokens_to_stake?: string;
        created_at?: string;
        updated_at?: string;
      }[];
    };
    StakerProfitSnapshot: {
      owner_address?: string;
      /** @example 2024-03-13T00:08:38+08:00 */
      date?: string;
      epoch_id?: number;
      total_chip_amount?: string;
      total_chip_value?: string;
    };
    ChipPNL: {
      date?: string;
      total_chip_amount?: string;
      total_chip_value?: string;
      profit_and_loss?: string;
    };
    OperationProfit: {
      node_address?: string;
      /** @example 2024-03-13T00:08:38+08:00 */
      date?: string;
      epoch_id?: number;
      operation_pool?: string;
    };
    OperationProfitPNL: {
      date?: string;
      operation_pool?: string;
      profit_and_loss?: string;
    };
    BriefEpoch: {
      id?: number;
      start_timestamp?: number;
      end_timestamp?: number;
      total_operation_rewards?: string;
      total_staking_rewards?: string;
      total_request_counts?: string;
      total_reward_items?: number;
      distributions?: components["schemas"]["BriefEpochDistribution"][];
    };
    Epoch: {
      id?: number;
      start_timestamp?: number;
      end_timestamp?: number;
      total_operation_rewards?: string;
      total_staking_rewards?: string;
      total_request_counts?: string;
      total_reward_items?: number;
      distributions?: components["schemas"]["EpochDistribution"][];
    };
    BriefEpochDistribution: {
      id?: number;
      start_timestamp?: number;
      end_timestamp?: number;
      transaction?: {
        hash?: string;
        index?: number;
      };
      block?: {
        hash?: string;
        number?: number;
        timestamp?: number;
      };
      total_operation_rewards?: string;
      total_staking_rewards?: string;
      total_request_counts?: string;
      total_reward_items?: number;
    };
    EpochDistribution: {
      id?: number;
      start_timestamp?: number;
      end_timestamp?: number;
      transaction?: {
        hash?: string;
        index?: number;
      };
      block?: {
        hash?: string;
        number?: number;
        timestamp?: number;
      };
      total_operation_rewards?: string;
      total_staking_rewards?: string;
      total_request_counts?: string;
      total_reward_items?: number;
      reward_items?: {
        epoch_id?: number;
        index?: number;
        transaction_hash?: string;
        node_address?: string;
        operation_rewards?: string;
        staking_rewards?: string;
        tax_collected?: string;
        request_counts?: string;
      }[];
    };
    WorkerDetail: {
      is_required?: boolean;
      type?: string;
      value?: string;
      description?: string;
    };
    /** @example {
     *       "id": {
     *         "is_required": true,
     *         "type": "string",
     *         "value": "ethereum-core",
     *         "description": "You can define your own worker id, you are recommended to use `[network]-[worker]`"
     *       },
     *       "network": {
     *         "is_required": true,
     *         "type": "string",
     *         "value": "ethereum",
     *         "description": "Your worker is running on the defined network"
     *       },
     *       "worker": {
     *         "is_required": true,
     *         "type": "string",
     *         "value": "core",
     *         "description": "Your worker is running the defined worker"
     *       },
     *       "endpoint": {
     *         "is_required": true,
     *         "type": "string",
     *         "value": "https://rpc.ankr.com/eth",
     *         "description": "You can fill this field with a global endpoint id (should be pre-defined in endpoints part) or a url"
     *       },
     *       "parameters": {
     *         "rpc_thread_blocks": {
     *           "is_required": false,
     *           "type": "uint",
     *           "value": "8",
     *           "description": "The number of blocks to process in a thread"
     *         },
     *         "rpc_batch_blocks": {
     *           "is_required": false,
     *           "type": "uint",
     *           "value": "8",
     *           "description": "The number of blocks to process in a batch"
     *         },
     *         "rpc_batch_receipts": {
     *           "is_required": false,
     *           "type": "uint",
     *           "value": "200",
     *           "description": "The number of receipts to process in a batch"
     *         },
     *         "rpc_batch_block_receipts": {
     *           "is_required": false,
     *           "type": "uint",
     *           "value": "8",
     *           "description": "The number of block receipts to process in a batch"
     *         }
     *       }
     *     } */
    NetworkWorker: {
      id?: components["schemas"]["WorkerDetail"];
      network?: components["schemas"]["WorkerDetail"];
      worker?: components["schemas"]["WorkerDetail"];
      endpoint?: components["schemas"]["WorkerDetail"];
      parameters?: {
        rpc_thread_blocks?: components["schemas"]["WorkerDetail"];
        rpc_batch_blocks?: components["schemas"]["WorkerDetail"];
        rpc_batch_receipts?: components["schemas"]["WorkerDetail"];
        rpc_batch_block_receipts?: components["schemas"]["WorkerDetail"];
      };
    };
    /** @example {
     *       "date": "2024-03-13T00:08:38+08:00",
     *       "epoch_id": 1,
     *       "apy": "0.1"
     *     } */
    EpochAPYSnapshot: {
      date?: string;
      epoch_id?: number;
      apy?: string;
    };
    /** @enum {unknown} */
    Type:
      | "approval"
      | "bridge"
      | "burn"
      | "comment"
      | "delete"
      | "feed"
      | "liquidity"
      | "mint"
      | "post"
      | "profile"
      | "proxy"
      | "revise"
      | "reward"
      | "share"
      | "staking"
      | "swap"
      | "trade"
      | "transfer"
      | "unknown";
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
