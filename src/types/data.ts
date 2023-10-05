// generated by src/types/generate.ts

/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/accounts/activities": {
    post: operations["batchGetAccountsActivitiesFm"];
  };
  "/accounts/{account}/activities": {
    get: operations["getAccountActivitiesFm"];
  };
  "/accounts/{account}/profiles": {
    get: operations["getAccountProfilesFm"];
  };
  "/activities/{id}": {
    get: operations["getActivityFm"];
  };
  "/mastodon/{account}/activities": {
    get: operations["getMastodonActivitiesFm"];
  };
  "/networks/{network}/activities": {
    get: operations["getNetworkActivitiesFm"];
  };
  "/openapi.json": {
    /** @description It responds the OpenAPI doc for this service in JSON format. */
    get: operations["func2"];
  };
  "/platforms/{platform}/activities": {
    get: operations["getPlatformActivitiesFm"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /**
     * AccountsActivitiesRequest
     * @description github.com/naturalselectionlabs/data-api/internal/service/explorer/explorer/v2/handler.AccountsActivitiesRequest
     */
    AccountsActivitiesRequest: {
      /** @description accounts size limit */
      account: string[];
      /**
       * @description actions limit, default is 10
       * @default 10
       */
      action_limit?: number;
      cursor?: string | null;
      direction?: components["schemas"]["Direction"] | null;
      end_timestamp?: number | null;
      /**
       * @description transactions limit, default is 100
       * @default 10
       */
      limit?: number;
      network?: components["schemas"]["Network"][];
      platform?: components["schemas"]["Platform"][];
      start_timestamp?: number | null;
      status?: components["schemas"]["Status"] | null;
      tag?: components["schemas"]["Tag"][];
      type?: components["schemas"]["Type"][];
    };
    /**
     * Action
     * @description github.com/naturalselectionlabs/data-api/internal/database/model.Action
     */
    Action: {
      from: string;
      metadata: components["schemas"]["Metadata"];
      platform?: string;
      related_urls?: string[];
      tag: components["schemas"]["Tag"];
      to: string;
      type: components["schemas"]["Type"];
    };
    /**
     * Activity
     * @description github.com/naturalselectionlabs/data-api/common/schema/v2.Activity
     */
    Activity: {
      actions: components["schemas"]["Action"][];
      direction?: components["schemas"]["Direction"];
      feeToken?: string | null;
      feeValue?: components["schemas"]["Decimal"] | null;
      from: string;
      id: string;
      network: string;
      owner?: string;
      platform?: components["schemas"]["Platform"] | null;
      status: components["schemas"]["Status"];
      tag: components["schemas"]["Tag"];
      timestamp: number;
      to: string;
      type: components["schemas"]["Type1"];
    };
    /** @description github.com/ethereum/go-ethereum/common.Address */
    Address: string;
    /** @description github.com/ethereum/go-ethereum/common/hexutil.Bytes */
    Bytes: string;
    /**
     * Chain
     * @description github.com/naturalselectionlabs/sakuin/common/schema.Chain
     */
    Chain: {
      chain_id: number;
      name?: string;
      network: components["schemas"]["Network1"];
      symbol?: string;
    };
    /**
     * CollectibleApproval
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.CollectibleApproval
     */
    CollectibleApproval: {
      action: components["schemas"]["CollectibleApprovalAction"];
      animation_url?: string;
      contract_address?: string | null;
      decimals?: number;
      description?: string;
      external_url?: string;
      id?: components["schemas"]["Decimal"] | null;
      image?: string;
      image_url?: string;
      logo?: string;
      media_url?: string;
      name?: string;
      properties?: components["schemas"]["RawMessage"];
      standard?: components["schemas"]["Standard"];
      symbol?: string;
      title?: string;
      uri?: string;
      value?: components["schemas"]["Decimal"] | null;
    };
    /**
     * CollectibleApprovalAction
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.CollectibleApprovalAction
     * @enum {unknown}
     */
    CollectibleApprovalAction: "approve" | "revoke";
    /**
     * CollectibleAuction
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.CollectibleAuction
     */
    CollectibleAuction: {
      action: components["schemas"]["CollectibleAuctionAction"];
      animation_url?: string;
      contract_address?: string | null;
      cost?: components["schemas"]["TokenMetadata"] | null;
      decimals?: number;
      description?: string;
      external_url?: string;
      id?: components["schemas"]["Decimal"] | null;
      image?: string;
      image_url?: string;
      logo?: string;
      media_url?: string;
      name?: string;
      properties?: components["schemas"]["RawMessage"];
      standard?: components["schemas"]["Standard"];
      symbol?: string;
      title?: string;
      uri?: string;
      value?: components["schemas"]["Decimal"] | null;
    };
    /**
     * CollectibleAuctionAction
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.CollectibleAuctionAction
     * @enum {unknown}
     */
    CollectibleAuctionAction: "bid" | "cancel" | "create" | "finalize" | "invalidate" | "update";
    /**
     * CollectibleTrade
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.CollectibleTrade
     */
    CollectibleTrade: {
      action: components["schemas"]["CollectibleTradeAction"];
      animation_url?: string;
      contract_address?: string | null;
      cost?: components["schemas"]["TokenMetadata"] | null;
      decimals?: number;
      description?: string;
      external_url?: string;
      id?: components["schemas"]["Decimal"] | null;
      image?: string;
      image_url?: string;
      logo?: string;
      media_url?: string;
      name?: string;
      properties?: components["schemas"]["RawMessage"];
      standard?: components["schemas"]["Standard"];
      symbol?: string;
      title?: string;
      uri?: string;
      value?: components["schemas"]["Decimal"] | null;
    };
    /**
     * CollectibleTradeAction
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.CollectibleTradeAction
     * @enum {unknown}
     */
    CollectibleTradeAction: "buy" | "cancel" | "invalidate" | "offer" | "sell" | "set" | "update";
    /**
     * CollectibleTransfer
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.CollectibleTransfer
     */
    CollectibleTransfer: {
      animation_url?: string;
      contract_address?: string | null;
      decimals?: number;
      description?: string;
      external_url?: string;
      id?: components["schemas"]["Decimal"] | null;
      image?: string;
      image_url?: string;
      logo?: string;
      media_url?: string;
      name?: string;
      properties?: components["schemas"]["RawMessage"];
      standard?: components["schemas"]["Standard"];
      symbol?: string;
      title?: string;
      uri?: string;
      value?: components["schemas"]["Decimal"] | null;
    };
    /**
     * CollectibleType
     * @description github.com/naturalselectionlabs/sakuin/common/schema/filter.CollectibleType
     * @enum {unknown}
     */
    CollectibleType: "approval" | "auction" | "burn" | "mint" | "trade" | "transfer";
    /**
     * CommonError[github.com/naturalselectionlabs/data-api/internal/service/explorer/explorer/v2/errorx.ErrorCode]
     * @description github.com/NaturalSelectionLabs/goapi/lib/openapi.CommonError[github.com/naturalselectionlabs/data-api/internal/service/explorer/explorer/v2/errorx.ErrorCode]
     */
    CommonError: {
      code: components["schemas"]["ErrorCode"];
      details?: components["schemas"]["CommonError"][];
      innererror?: unknown;
      message?: string;
      target?: string;
    };
    /** @description github.com/shopspring/decimal.Decimal */
    Decimal: string;
    /**
     * Direction
     * @description github.com/naturalselectionlabs/sakuin/common/schema/filter.Direction
     * @enum {unknown}
     */
    Direction: "in" | "out";
    /**
     * Donation
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.Donation
     */
    Donation: {
      description?: string;
      logo?: string;
      title?: string;
      token: components["schemas"]["TokenMetadata"];
    };
    /**
     * DonationType
     * @description github.com/naturalselectionlabs/sakuin/common/schema/filter.DonationType
     * @enum {unknown}
     */
    DonationType: "donate";
    /**
     * Error
     * @description github.com/naturalselectionlabs/data-api/internal/service/explorer/explorer/v2/errorx.Error
     */
    Error: {
      code: components["schemas"]["ErrorCode"];
      details?: unknown;
      innererror?: unknown;
      message?: string;
      target?: string;
    };
    /**
     * ErrorCode
     * @description github.com/naturalselectionlabs/data-api/internal/service/explorer/explorer/v2/errorx.ErrorCode
     * @enum {unknown}
     */
    ErrorCode: "address_is_empty" | "address_is_invalid" | "bad_params" | "bad_request" | "internal_error" | "not_found" | "validate_failed";
    /**
     * ExchangeLiquidity
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.ExchangeLiquidity
     */
    ExchangeLiquidity: {
      action: components["schemas"]["ExchangeLiquidityAction"];
      tokens: components["schemas"]["TokenMetadata"][];
    };
    /**
     * ExchangeLiquidityAction
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.ExchangeLiquidityAction
     * @enum {unknown}
     */
    ExchangeLiquidityAction: "add" | "borrow" | "collect" | "remove" | "repay" | "supply" | "withdraw";
    /**
     * ExchangeLoan
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.ExchangeLoan
     */
    ExchangeLoan: {
      action: components["schemas"]["ExchangeLoanAction"];
      amount?: components["schemas"]["TokenMetadata"] | null;
      collateral: components["schemas"]["TokenMetadata"];
    };
    /**
     * ExchangeLoanAction
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.ExchangeLoanAction
     * @enum {unknown}
     */
    ExchangeLoanAction: "create" | "liquidate" | "refinance" | "repay" | "seize";
    /**
     * ExchangeSwap
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.ExchangeSwap
     */
    ExchangeSwap: {
      from: components["schemas"]["TokenMetadata"];
      to: components["schemas"]["TokenMetadata"];
    };
    /**
     * ExchangeType
     * @description github.com/naturalselectionlabs/sakuin/common/schema/filter.ExchangeType
     * @enum {unknown}
     */
    ExchangeType: "liquidity" | "loan" | "staking" | "swap";
    /**
     * GovernanceOrganization
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.GovernanceOrganization
     */
    GovernanceOrganization: {
      about?: string;
      id: string;
      name: string;
    };
    /**
     * GovernanceProposal
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.GovernanceProposal
     */
    GovernanceProposal: {
      body?: string;
      end_at?: components["schemas"]["Time"] | null;
      end_block?: components["schemas"]["Decimal"] | null;
      id: string;
      link?: string;
      options?: string[];
      organization?: components["schemas"]["GovernanceOrganization"] | null;
      start_at?: components["schemas"]["Time"] | null;
      start_block?: components["schemas"]["Decimal"] | null;
      title?: string;
    };
    /**
     * GovernanceType
     * @description github.com/naturalselectionlabs/sakuin/common/schema/filter.GovernanceType
     * @enum {unknown}
     */
    GovernanceType: "propose" | "vote";
    /**
     * GovernanceVote
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.GovernanceVote
     */
    GovernanceVote: {
      choice: string;
      count?: components["schemas"]["Decimal"] | null;
      proposal: components["schemas"]["GovernanceProposal"] | null;
      reason?: string;
    };
    /**
     * Int
     * @description math/big.Int
     */
    Int: number;
    /**
     * Media
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.Media
     */
    Media: {
      address: string;
      mime_type: string;
    };
    /**
     * MetaCursor
     * @description github.com/naturalselectionlabs/data-api/internal/service/explorer/explorer/v2/handler.MetaCursor
     */
    MetaCursor: {
      cursor: string;
    };
    /**
     * MetaTotalPages
     * @description github.com/naturalselectionlabs/data-api/internal/service/explorer/explorer/v2/handler.MetaTotalPages
     */
    MetaTotalPages: {
      totalPages: number;
    };
    /**
     * Metadata
     * @description github.com/naturalselectionlabs/sakuin/common/schema.Metadata
     */
    Metadata: components["schemas"]["CollectibleApproval"] | components["schemas"]["CollectibleAuction"] | components["schemas"]["CollectibleTrade"] | components["schemas"]["CollectibleTransfer"] | components["schemas"]["Donation"] | components["schemas"]["ExchangeLiquidity"] | components["schemas"]["ExchangeLoan"] | components["schemas"]["ExchangeSwap"] | components["schemas"]["GovernanceProposal"] | components["schemas"]["GovernanceVote"] | components["schemas"]["MetaverseTrade"] | components["schemas"]["MetaverseTransfer"] | components["schemas"]["SocialFollow"] | components["schemas"]["SocialPost"] | components["schemas"]["SocialProfile"] | components["schemas"]["SocialProxy"] | components["schemas"]["TransactionApproval"] | components["schemas"]["TransactionBridge"] | components["schemas"]["TransactionDeploy"] | components["schemas"]["TransactionMultisig"] | components["schemas"]["TransactionTransfer"];
    /**
     * MetaverseTrade
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.MetaverseTrade
     */
    MetaverseTrade: {
      action?: components["schemas"]["MetaverseTradeAction"];
      animation_url?: string;
      contract_address?: string | null;
      cost?: components["schemas"]["TokenMetadata"];
      decimals?: number;
      description?: string;
      external_url?: string;
      id?: components["schemas"]["Decimal"] | null;
      image?: string;
      image_url?: string;
      logo?: string;
      media_url?: string;
      name?: string;
      properties?: components["schemas"]["RawMessage"];
      standard?: components["schemas"]["Standard"];
      symbol?: string;
      title?: string;
      uri?: string;
      value?: components["schemas"]["Decimal"] | null;
    };
    /**
     * MetaverseTradeAction
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.MetaverseTradeAction
     * @enum {unknown}
     */
    MetaverseTradeAction: "buy" | "list" | "sell";
    /**
     * MetaverseTransfer
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.MetaverseTransfer
     */
    MetaverseTransfer: {
      animation_url?: string;
      contract_address?: string | null;
      decimals?: number;
      description?: string;
      external_url?: string;
      id?: components["schemas"]["Decimal"] | null;
      image?: string;
      image_url?: string;
      logo?: string;
      media_url?: string;
      name?: string;
      properties?: components["schemas"]["RawMessage"];
      standard?: components["schemas"]["Standard"];
      symbol?: string;
      title?: string;
      uri?: string;
      value?: components["schemas"]["Decimal"] | null;
    };
    /**
     * MetaverseType
     * @description github.com/naturalselectionlabs/sakuin/common/schema/filter.MetaverseType
     * @enum {unknown}
     */
    MetaverseType: "approval" | "burn" | "claim" | "mint" | "trade" | "transfer";
    /**
     * Network
     * @description github.com/naturalselectionlabs/data-api/common/schema.Network
     * @enum {unknown}
     */
    Network: "arbitrum_nova" | "arbitrum_one" | "arweave" | "avalanche" | "base" | "binance_smart_chain" | "crossbell" | "erc1577" | "ethereum" | "farcaster" | "gnosis" | "optimism" | "polygon" | "zksync_era" | "zksync_lite";
    /**
     * Network
     * @description github.com/naturalselectionlabs/sakuin/common/schema/filter.Network
     * @enum {unknown}
     */
    Network1: "arweave" | "erc1577" | "ethereum" | "farcaster" | "unknown" | "zksync_lite";
    /**
     * Platform
     * @description github.com/naturalselectionlabs/sakuin/common/schema/filter.Platform
     * @enum {unknown}
     */
    Platform: "1inch" | "AAVE" | "Aavegotchi" | "Arbitrum" | "Base" | "BendDAO" | "Blur" | "Carv" | "Cow" | "Crossbell" | "Curve" | "ENS" | "Farcaster" | "Foundation" | "Gitcoin" | "IQ.Wiki" | "Lens" | "Lido" | "Mars4" | "MetaMask" | "Mira" | "Mirror" | "Nouns" | "OpenSea" | "Optimism" | "POAP" | "PlanetIX" | "Polygon" | "RSS3" | "Rainbow" | "Safe" | "Synapse" | "Uniswap" | "Zerion" | "Zora" | "zkSync Era" | "zkSync Lite" | "zkSync";
    /**
     * Profile
     * @description github.com/naturalselectionlabs/data-api/common/schema/v2.Profile
     */
    Profile: {
      action?: components["schemas"]["SocialProfileAction"];
      address?: components["schemas"]["Address"];
      bannerURI?: string[];
      bio?: string;
      expireAt?: components["schemas"]["Time"] | null;
      expiry?: components["schemas"]["Time"] | null;
      handle?: string;
      image_uri?: string;
      key?: string;
      name?: string;
      network: string;
      platform: string;
      profileURI?: string[];
      profile_id?: string;
      socialURI?: string[];
      url?: string;
      value?: string;
    };
    /**
     * RawMessage
     * @description encoding/json.RawMessage
     */
    RawMessage: unknown;
    /**
     * SocialFollow
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.SocialFollow
     */
    SocialFollow: {
      from?: components["schemas"]["SocialProfile"];
      to?: components["schemas"]["SocialProfile"];
    };
    /**
     * SocialPost
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.SocialPost
     */
    SocialPost: {
      author_url?: string;
      body?: string;
      content_uri?: string;
      handle?: string;
      media?: components["schemas"]["Media"][];
      profile_id?: string;
      publication_id?: string;
      summary?: string;
      tags?: string[];
      target?: {
        author_url?: string;
        body?: string;
        content_uri?: string;
        handle?: string;
        media?: components["schemas"]["Media"][];
        profile_id?: string;
        publication_id?: string;
        summary?: string;
        tags?: string[];
        target?: unknown;
        target_url?: string;
        title?: string;
      } | null;
      target_url?: string;
      title?: string;
    };
    /**
     * SocialProfile
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.SocialProfile
     */
    SocialProfile: {
      action?: components["schemas"]["SocialProfileAction"];
      address?: components["schemas"]["Address"];
      bio?: string;
      expiry?: components["schemas"]["Time"] | null;
      handle?: string;
      image_uri?: string;
      key?: string;
      name?: string;
      profile_id?: string;
      value?: string;
    };
    /**
     * SocialProfileAction
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.SocialProfileAction
     * @enum {unknown}
     */
    SocialProfileAction: "create" | "renew" | "transfer" | "unwrap" | "update" | "wrap";
    /**
     * SocialProxy
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.SocialProxy
     */
    SocialProxy: {
      action?: components["schemas"]["SocialProxyAction"];
      profile?: components["schemas"]["SocialProfile"];
      proxy_address: components["schemas"]["Address"];
    };
    /**
     * SocialProxyAction
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.SocialProxyAction
     * @enum {unknown}
     */
    SocialProxyAction: "appoint" | "remove";
    /**
     * SocialType
     * @description github.com/naturalselectionlabs/sakuin/common/schema/filter.SocialType
     * @enum {unknown}
     */
    SocialType: "comment" | "delete" | "follow" | "mint" | "post" | "profile" | "proxy" | "revise" | "share" | "unfollow";
    /**
     * Standard
     * @description github.com/naturalselectionlabs/sakuin/common/ethereum/contract.Standard
     */
    Standard: number;
    /**
     * Status
     * @description github.com/naturalselectionlabs/sakuin/common/schema/filter.Status
     * @enum {unknown}
     */
    Status: "failed" | "successful";
    /**
     * Tag
     * @description github.com/naturalselectionlabs/sakuin/common/schema/filter.Tag
     * @enum {unknown}
     */
    Tag: "collectible" | "donation" | "exchange" | "governance" | "metaverse" | "social" | "transaction" | "unknown";
    /**
     * Time
     * @description time.Time
     */
    Time: string;
    /**
     * TokenMetadata
     * @description github.com/naturalselectionlabs/sakuin/common/schema.TokenMetadata
     */
    TokenMetadata: {
      animation_url?: string;
      contract_address?: string | null;
      decimals?: number;
      description?: string;
      external_url?: string;
      id?: components["schemas"]["Decimal"] | null;
      image?: string;
      image_url?: string;
      logo?: string;
      media_url?: string;
      name?: string;
      properties?: components["schemas"]["RawMessage"];
      standard?: components["schemas"]["Standard"];
      symbol?: string;
      title?: string;
      uri?: string;
      value?: components["schemas"]["Decimal"] | null;
    };
    /**
     * TransactionApproval
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.TransactionApproval
     */
    TransactionApproval: {
      action: components["schemas"]["TransactionApprovalAction"];
      animation_url?: string;
      contract_address?: string | null;
      decimals?: number;
      description?: string;
      external_url?: string;
      id?: components["schemas"]["Decimal"] | null;
      image?: string;
      image_url?: string;
      logo?: string;
      media_url?: string;
      name?: string;
      properties?: components["schemas"]["RawMessage"];
      standard?: components["schemas"]["Standard"];
      symbol?: string;
      title?: string;
      uri?: string;
      value?: components["schemas"]["Decimal"] | null;
    };
    /**
     * TransactionApprovalAction
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.TransactionApprovalAction
     * @enum {unknown}
     */
    TransactionApprovalAction: "approve" | "revoke";
    /**
     * TransactionBridge
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.TransactionBridge
     */
    TransactionBridge: {
      action: components["schemas"]["TransactionBridgeAction"];
      source_network: components["schemas"]["Chain"];
      target_network: components["schemas"]["Chain"];
      token: components["schemas"]["TokenMetadata"];
    };
    /**
     * TransactionBridgeAction
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.TransactionBridgeAction
     * @enum {unknown}
     */
    TransactionBridgeAction: "deposit" | "withdraw";
    /**
     * TransactionDeploy
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.TransactionDeploy
     */
    TransactionDeploy: {
      address: string;
      code?: components["schemas"]["Bytes"];
      name?: string;
    };
    /**
     * TransactionMultisig
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.TransactionMultisig
     */
    TransactionMultisig: {
      action: components["schemas"]["TransactionMultisigAction"];
      owner?: string | null;
      success?: boolean | null;
      threshold?: components["schemas"]["Int"] | null;
      vault: components["schemas"]["TransactionMultisigVault"];
    };
    /**
     * TransactionMultisigAction
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.TransactionMultisigAction
     * @enum {unknown}
     */
    TransactionMultisigAction: "add_owner" | "change_threshold" | "create" | "execution" | "rejection" | "remove_owner";
    /**
     * TransactionMultisigVault
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.TransactionMultisigVault
     */
    TransactionMultisigVault: {
      address: string;
      version: string;
    };
    /**
     * TransactionTransfer
     * @description github.com/naturalselectionlabs/sakuin/common/schema/metadata.TransactionTransfer
     */
    TransactionTransfer: {
      animation_url?: string;
      contract_address?: string | null;
      decimals?: number;
      description?: string;
      external_url?: string;
      id?: components["schemas"]["Decimal"] | null;
      image?: string;
      image_url?: string;
      logo?: string;
      media_url?: string;
      name?: string;
      properties?: components["schemas"]["RawMessage"];
      standard?: components["schemas"]["Standard"];
      symbol?: string;
      title?: string;
      uri?: string;
      value?: components["schemas"]["Decimal"] | null;
    };
    /**
     * TransactionType
     * @description github.com/naturalselectionlabs/sakuin/common/schema/filter.TransactionType
     * @enum {unknown}
     */
    TransactionType: "approval" | "bridge" | "burn" | "deploy" | "mint" | "multisig" | "transfer";
    /**
     * Type
     * @description github.com/naturalselectionlabs/data-api/common/schema.Type
     * @enum {unknown}
     */
    Type: "approval" | "auction" | "bridge" | "burn" | "claim" | "comment" | "delete" | "deploy" | "donate" | "follow" | "liquidity" | "loan" | "mint" | "multisig" | "post" | "profile" | "propose" | "proxy" | "revise" | "share" | "staking" | "swap" | "trade" | "transfer" | "unfollow" | "unknown" | "vote";
    /**
     * Type
     * @description github.com/naturalselectionlabs/sakuin/common/schema/filter.Type
     */
    Type1: components["schemas"]["CollectibleType"] | components["schemas"]["DonationType"] | components["schemas"]["ExchangeType"] | components["schemas"]["GovernanceType"] | components["schemas"]["MetaverseType"] | components["schemas"]["SocialType"] | components["schemas"]["TransactionType"] | components["schemas"]["UnknownType"];
    /**
     * UnknownType
     * @description github.com/naturalselectionlabs/sakuin/common/schema/filter.UnknownType
     * @enum {unknown}
     */
    UnknownType: "unknown";
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  batchGetAccountsActivitiesFm: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AccountsActivitiesRequest"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": {
            data: (components["schemas"]["Activity"] | null)[];
            meta: components["schemas"]["MetaCursor"] | null;
          };
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": {
            error: components["schemas"]["Error"];
          };
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": {
            error: components["schemas"]["Error"];
          };
        };
      };
    };
  };
  getAccountActivitiesFm: {
    parameters: {
      query?: {
        /** @description transactions limit, maximum 500 */
        limit?: number;
        /** @description actions limit, maximum 20 */
        action_limit?: number;
        cursor?: string;
        start_timestamp?: number;
        end_timestamp?: number;
        status?: components["schemas"]["Status"];
        direction?: components["schemas"]["Direction"];
        network?: components["schemas"]["Network"][];
        tag?: components["schemas"]["Tag"][];
        type?: components["schemas"]["Type"][];
        platform?: components["schemas"]["Platform"][];
      };
      path: {
        /** @description account */
        account: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": {
            data: (components["schemas"]["Activity"] | null)[];
            meta: components["schemas"]["MetaCursor"] | null;
          };
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": {
            error: components["schemas"]["Error"];
          };
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": {
            error: components["schemas"]["Error"];
          };
        };
      };
    };
  };
  getAccountProfilesFm: {
    parameters: {
      query?: {
        network?: components["schemas"]["Network"][];
        platform?: components["schemas"]["Platform"][];
      };
      path: {
        /** @description account */
        account: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": {
            data: (components["schemas"]["Profile"] | null)[];
          };
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": {
            error: components["schemas"]["Error"];
          };
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": {
            error: components["schemas"]["Error"];
          };
        };
      };
    };
  };
  getActivityFm: {
    parameters: {
      query?: {
        /** @description actions limit, minimum 1, maximum 20 */
        action_limit?: number;
        /** @description actions pag, minimum 1 */
        action_page?: number;
      };
      path: {
        /** @description id */
        id: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": {
            data: components["schemas"]["Activity"] | null;
            meta: components["schemas"]["MetaTotalPages"] | null;
          };
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": {
            error: components["schemas"]["Error"];
          };
        };
      };
      /** @description Not Found */
      404: {
        content: {
          "application/json": {
            error: components["schemas"]["Error"];
          };
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": {
            error: components["schemas"]["Error"];
          };
        };
      };
    };
  };
  getMastodonActivitiesFm: {
    parameters: {
      query?: {
        /** @description mastodon limit, maximum 40 */
        limit?: number;
      };
      path: {
        /** @description mastodon handle */
        account: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": {
            data: (components["schemas"]["Activity"] | null)[];
            meta: components["schemas"]["MetaCursor"] | null;
          };
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": {
            error: components["schemas"]["Error"];
          };
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": {
            error: components["schemas"]["Error"];
          };
        };
      };
    };
  };
  getNetworkActivitiesFm: {
    parameters: {
      query?: {
        /** @description transactions limit, maximum 500 */
        limit?: number;
        /** @description actions limit, maximum 20 */
        action_limit?: number;
        cursor?: string;
        start_timestamp?: number;
        end_timestamp?: number;
        status?: components["schemas"]["Status"];
        direction?: components["schemas"]["Direction"];
      };
      path: {
        network: components["schemas"]["Network"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": {
            data: (components["schemas"]["Activity"] | null)[];
            meta: components["schemas"]["MetaCursor"] | null;
          };
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": {
            error: components["schemas"]["Error"];
          };
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": {
            error: components["schemas"]["Error"];
          };
        };
      };
    };
  };
  /** @description It responds the OpenAPI doc for this service in JSON format. */
  func2: {
    responses: {
      /** @description It will return the OpenAPI doc in JSON format. */
      200: {
        content: {
          "application/json": unknown;
        };
      };
    };
  };
  getPlatformActivitiesFm: {
    parameters: {
      query?: {
        /** @description transactions limit, maximum 500 */
        limit?: number;
        /** @description actions limit, maximum 20 */
        action_limit?: number;
        cursor?: string;
        start_timestamp?: number;
        end_timestamp?: number;
        status?: components["schemas"]["Status"];
        direction?: components["schemas"]["Direction"];
        network?: components["schemas"]["Network"][];
        tag?: components["schemas"]["Tag"][];
        type?: components["schemas"]["Type"][];
      };
      path: {
        platform: components["schemas"]["Platform"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": {
            data: (components["schemas"]["Activity"] | null)[];
            meta: components["schemas"]["MetaCursor"] | null;
          };
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": {
            error: components["schemas"]["Error"];
          };
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": {
            error: components["schemas"]["Error"];
          };
        };
      };
    };
  };
}
