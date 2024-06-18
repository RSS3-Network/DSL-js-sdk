import type { Activity } from "../../data/client.js";
import { handleMetadata } from "../../metadata/index.js";
import type { components } from "../../types/data.js";
import { getActions, getSummaryActions } from "../../utils.js";
import { type Theme, themePlain } from "./theme.js";
import {
  type Token,
  join,
  token,
  tokenAddr,
  tokenAsset,
  tokenHandle,
  tokenImage,
  tokenName,
  tokenNetwork,
  tokenPlatform,
  tokenPost,
  tokenSeparator,
  tokenSpace,
  tokenText,
  tokenTime,
  tokenValue,
} from "./token.js";

export function formatPlain(activity: Activity): string {
  const list = format(activity, themePlain).filter((s) => s !== "");

  const clean: string[] = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i] === " " && list[i + 1] === " ") continue;
    clean.push(list[i]);
  }

  return clean.join("");
}

/**
 * Format an activity into a list of tokens that can be used to custom render the output of a activity, such as CLI output.
 */
export function format<T>(activity: Activity, theme: Theme<T>): T[] {
  const ts = tokenizeActivity(activity);
  return ts.map((t) => {
    if (!theme[t.type]) {
      return theme.unknown(t.content);
    }

    return theme[t.type](t.content);
  });
}

/**
 * Returns a list of tokens that can be used to custom render the output of a activity, such as CLI output
 * all the symbols in blue color.
 */
export function tokenizeActivity(activity: Activity): Token[] {
  const actions = getSummaryActions(activity);

  // used for social actions, remove the duplicate action
  if (activity.tag === "social" && actions.length > 1) {
    return tokenizeAction(activity, actions[0]);
  }

  // handle unknown activity
  if (activity.tag === "unknown" || activity.type === "unknown") {
    return [token("unknown", "Carried out an activity")];
  }

  const ts = actions.reduce((acc, action) => {
    if (acc.length === 0) {
      return tokenizeAction(activity, action);
    }

    return [...acc, tokenSeparator, ...tokenizeAction(activity, action)];
  }, [] as Token[]);

  ts.push(tokenSpace, tokenTime(activity.timestamp));

  return ts;
}

export function tokenizeToActions(activity: Activity): Token[][] {
  const actions = getActions(activity);
  const ts: Token[][] = [];

  // used for social actions, remove the duplicate action
  if (activity.tag === "social" && actions.length > 1) {
    return [tokenizeAction(activity, actions[0])];
  }

  // handle unknown activity
  if (activity.tag === "unknown" || activity.type === "unknown") {
    return [[token("unknown", "Carried out an activity")]];
  }

  actions.map((action) => {
    ts.push(tokenizeAction(activity, action));
  });

  return ts;
}

export function tokenizeToSummaryActions(activity: Activity): Token[][] {
  const actions = getSummaryActions(activity);
  const ts: Token[][] = [];

  // used for social actions, remove the duplicate action
  if (activity.tag === "social" && actions.length > 1) {
    return [tokenizeAction(activity, actions[0])];
  }

  // handle unknown activity
  if (activity.tag === "unknown" || activity.type === "unknown") {
    return [[token("unknown", "Carried out an activity")]];
  }

  actions.map((action) => {
    ts.push(tokenizeAction(activity, action));
  });

  return ts;
}

/**
 * Returns a list of tokens that can be used to custom render the output of an action, such as CLI output
 */
export function tokenizeAction(
  activity: Activity,
  action: components["schemas"]["Action"],
): Token[] {
  const direction = activity.direction;
  let res = [tokenText("Carried out an activity")];
  handleMetadata(action, {
    "transaction-transfer": (m) => {
      if (direction === "in") {
        res = join([
          tokenAddr(action.to),
          tokenText("received"),
          ...tokenValue(m),
          tokenText("from"),
          tokenAddr(action.from),
        ]);
      } else {
        res = join([
          tokenAddr(action.from),
          tokenText("sent"),
          ...tokenValue(m),
          tokenText("to"),
          tokenAddr(action.to),
        ]);
      }
    },
    "transaction-approval": (m) => {
      if (m.action === "approve") {
        res = join([
          tokenAddr(action.from),
          tokenText("approved"),
          ...tokenValue(m),
          tokenText("to"),
          tokenAddr(action.to),
        ]);
      } else {
        res = join([
          tokenAddr(action.from),
          tokenText("revoked the approval of"),
          ...tokenValue(m),
          tokenText("to"),
          tokenAddr(action.to),
        ]);
      }
    },
    "transaction-mint": (m) => {
      res = join([
        tokenAddr(action.from),
        tokenText("minted"),
        ...tokenValue(m),
      ]);
    },
    "transaction-burn": (m) => {
      res = join([
        tokenAddr(action.from),
        tokenText("burned"),
        ...tokenValue(m),
      ]);
    },
    // todo need to double check the multisig action
    "transaction-multisig": (m) => {
      if (m.action === "create") {
        res = join([
          tokenAddr(action.from),
          tokenText("created a multisig transaction"),
          tokenText("to"),
          tokenAddr(action.to),
          ...tokenPlatform(activity),
        ]);
      } else if (m.action === "add_owner") {
        res = join([
          tokenAddr(action.from),
          tokenText("added"),
          tokenAddr(m.owner),
          tokenText("to"),
          tokenAddr(m.vault.address),
          ...tokenPlatform(activity),
        ]);
      } else if (m.action === "remove_owner") {
        res = join([
          tokenAddr(action.from),
          tokenText("removed"),
          tokenAddr(m.owner),
          tokenText("from"),
          tokenAddr(m.vault.address),
          ...tokenPlatform(activity),
        ]);
      } else if (m.action === "change_threshold") {
        res = join([
          tokenAddr(action.from),
          tokenText("changed the threshold of"),
          tokenAddr(m.vault.address),
          ...tokenPlatform(activity),
        ]);
      } else if (m.action === "execution") {
        res = join([
          tokenAddr(action.from),
          tokenText("executed a multisig transaction"),
          ...tokenPlatform(activity),
        ]);
      }
    },
    "transaction-bridge": (m) => {
      let network: Token[] = [];
      if (m.source_network && m.source_network.name) {
        network = [
          tokenText("from"),
          tokenNetwork(m.source_network.name),
          tokenText("to"),
          tokenNetwork(m.target_network.name),
        ];
      }
      if (m.action === "deposit") {
        res = join([
          tokenAddr(action.from),
          tokenText("deposited"),
          ...tokenValue(m.token),
          ...network,
          ...tokenPlatform(activity),
        ]);
      } else {
        res = join([
          tokenAddr(action.from),
          tokenText("withdrew"),
          ...tokenValue(m.token),
          ...network,
          ...tokenPlatform(activity),
        ]);
      }
    },
    "transaction-deploy": (m) => {
      res = join([
        tokenAddr(action.from),
        tokenText("deployed a contract"),
        tokenAddr(m.address),
      ]);
    },
    // for collectible or nft related action, it will use image_url as the image link
    "collectible-transfer": (m) => {
      const meta = {
        address: m.contract_address,
        id: m.id,
        network: activity.network,
        preview: m.image_url,
      };
      res = join([
        tokenAddr(action.from),
        tokenText("transferred"),
        ...tokenAsset(m.title || m.name || "an asset", meta),
        tokenText("to"),
        tokenAddr(action.to),
      ]);
    },
    "collectible-approval": (m) => {
      const meta = {
        address: m.contract_address,
        id: m.id,
        network: activity.network,
        preview: m.image_url,
      };
      if (m.action === "approve") {
        res = join([
          tokenAddr(action.from),
          tokenText("approved"),
          tokenImage(m.image_url),
          ...tokenAsset(m.title || m.name || "collection", meta),
          tokenText("to"),
          tokenAddr(action.to),
        ]);
      } else {
        res = join([
          tokenAddr(action.from),
          tokenText("revoked the approval of"),
          ...tokenAsset(m.title || m.name || "collection", meta),
          tokenText("to"),
          tokenAddr(action.to),
        ]);
      }
    },
    "collectible-mint": (m) => {
      const meta = {
        address: m.contract_address,
        id: m.id,
        network: activity.network,
        preview: m.image_url,
      };
      res = join([
        tokenAddr(action.from),
        tokenText("minted"),
        ...tokenAsset(m.title || m.name || "an asset", meta),
        tokenText("to"),
        tokenAddr(action.to),
      ]);
    },
    "collectible-burn": (m) => {
      const meta = {
        address: m.contract_address,
        id: m.id,
        network: activity.network,
        preview: m.image_url,
      };
      res = join([
        tokenAddr(action.from),
        tokenText("burned"),
        ...tokenAsset(m.title || m.name || "an asset", meta),
      ]);
    },
    "collectible-trade": (m) => {
      const meta = {
        address: m.contract_address,
        id: m.id,
        network: activity.network,
        preview: m.image_url,
      };
      if (m.action === "buy") {
        res = join([
          tokenAddr(action.to),
          tokenText("bought"),
          ...tokenAsset(m.title || m.name || "an asset", meta),
          tokenText("from"),
          tokenAddr(action.from),
          ...tokenPlatform(action),
        ]);
      } else {
        res = join([
          tokenAddr(action.from),
          tokenText("sold"),
          ...tokenAsset(m.title || m.name || "an asset", meta),
          tokenText("to"),
          tokenAddr(action.to),
          ...tokenPlatform(action),
        ]);
      }
    },
    "collectible-auction": (m) => {
      const meta = {
        address: m.contract_address,
        id: m.id,
        network: activity.network,
        preview: m.image_url,
      };
      if (m.action === "create") {
        res = join([
          tokenAddr(action.from),
          tokenText("created an auction for"),
          ...tokenAsset(m.title || m.name || "an asset", meta),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "bid") {
        res = join([
          tokenAddr(action.from),
          tokenText("made a bid for"),
          ...tokenAsset(m.title || m.name || "an asset", meta),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "cancel") {
        res = join([
          tokenAddr(action.from),
          tokenText("canceled an auction for"),
          ...tokenAsset(m.title || m.name || "an asset", meta),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "update") {
        res = join([
          tokenAddr(action.from),
          tokenText("updated an auction for"),
          ...tokenAsset(m.title || m.name || "an asset", meta),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "finalize") {
        res = join([
          tokenAddr(action.from),
          tokenText("won an auction for"),
          ...tokenAsset(m.title || m.name || "an asset", meta),
          ...tokenPlatform(action),
        ]);
      } else {
        res = join([
          tokenAddr(action.from),
          tokenText("invalidated an auction for"),
          ...tokenAsset(m.title || m.name || "an asset", meta),
          ...tokenPlatform(action),
        ]);
      }
    },
    "exchange-swap": (m) => {
      res = join([
        tokenAddr(action.from),
        tokenText("swapped"),
        ...tokenValue(m.from),
        tokenText("to"),
        ...tokenValue(m.to),
        ...tokenPlatform(action),
      ]);
    },
    // todo add the action invoker
    "exchange-liquidity": (m) => {
      const tokens = m.tokens
        .flatMap((t) => join([...tokenValue(t), tokenText(",")]))
        .slice(0, -1);
      if (m.action === "add") {
        res = join([
          tokenAddr(action.from),
          tokenText("added"),
          ...tokens,
          tokenText("to liquidity"),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "remove") {
        res = join([
          tokenAddr(action.from),
          tokenText("removed"),
          ...tokens,
          tokenText("from liquidity"),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "collect") {
        res = join([
          tokenAddr(action.from),
          tokenText("collected"),
          ...tokens,
          tokenText("from liquidity"),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "borrow") {
        res = join([
          tokenAddr(action.from),
          tokenText("borrowed"),
          ...tokens,
          tokenText("from liquidity"),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "repay") {
        res = join([
          tokenAddr(action.from),
          tokenText("repaid"),
          ...tokens,
          tokenText("to liquidity"),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "supply") {
        res = join([
          tokenAddr(action.from),
          tokenText("supplied"),
          ...tokens,
          tokenText("to liquidity"),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "withdraw") {
        res = join([
          tokenAddr(action.from),
          tokenText("withDrew"),
          ...tokens,
          tokenText("from liquidity"),
          ...tokenPlatform(action),
        ]);
      }
    },
    // todo add the action invoker
    "exchange-loan": (m) => {
      if (m.action === "create") {
        res = join([
          tokenAddr(action.from),
          tokenText("created loan"),
          ...tokenValue(m.amount),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "liquidate") {
        res = join([
          tokenAddr(action.from),
          tokenText("liquidated loan"),
          ...tokenValue(m.amount),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "refinance") {
        res = join([
          tokenAddr(action.from),
          tokenText("refinanced loan"),
          ...tokenValue(m.amount),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "repay") {
        res = join([
          tokenAddr(action.from),
          tokenText("repaid loan"),
          ...tokenValue(m.amount),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "seize") {
        res = join([
          tokenAddr(action.from),
          tokenText("seized loan"),
          ...tokenValue(m.amount),
          ...tokenPlatform(action),
        ]);
      }
    },
    "donation-donate": (m) => {
      res = join([
        tokenAddr(action.from),
        tokenText("donated"),
        ...tokenValue(m.token),
        tokenText("to"),
        tokenImage(m.logo),
        tokenName(m.title || ""),
        ...tokenPlatform(action),
      ]);
    },
    "governance-propose": (m) => {
      res = join([
        tokenAddr(action.from),
        tokenText("proposed for"),
        tokenName(m.title || ""),
        ...tokenPlatform(action),
      ]);
    },
    "governance-vote": (m) => {
      res = join([
        tokenAddr(action.from),
        tokenText("voted for"),
        tokenName(m.proposal?.options?.join(",") || ""),
        ...tokenPlatform(action),
      ]);
    },
    "social-post": (m) => {
      res = join([
        tokenHandle(m.handle || action.from, action.from, activity.network),
        tokenText("published a post"),
        tokenPost(action),
        ...tokenPlatform(action),
      ]);
    },
    "social-comment": (m) => {
      res = join([
        tokenHandle(m.handle || action.from, action.from, activity.network),
        tokenText("made a comment"),
        tokenPost(action),
        ...tokenPlatform(action),
      ]);
    },
    "social-share": () => {
      res = join([
        tokenAddr(action.from),
        tokenText("shared a post"),
        tokenPost(action),
        ...tokenPlatform(action),
      ]);
    },
    "social-mint": () => {
      res = join([
        tokenAddr(action.from),
        tokenText("minted a post"),
        tokenPost(action),
        ...tokenPlatform(action),
      ]);
    },
    "social-revise": (m) => {
      res = join([
        tokenAddr(m.handle || action.from),
        tokenText("revised a post"),
        tokenPost(action),
        ...tokenPlatform(action),
      ]);
    },
    "social-profile": (m) => {
      if (m.action === "create") {
        res = join([
          tokenAddr(m.handle || action.from),
          tokenText("created a profile"),
          tokenImage(m.image_uri),
          tokenName(m.name || m.handle || ""),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "update") {
        res = join([
          tokenAddr(m.handle || action.from),
          tokenText("updated a profile"),
          tokenImage(m.image_uri),
          tokenName(m.name || m.handle || ""),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "renew") {
        res = join([
          tokenAddr(m.handle || action.from),
          tokenText("renewed a profile"),
          tokenImage(m.image_uri),
          tokenName(m.name || m.handle || ""),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "wrap") {
        res = join([
          tokenAddr(m.handle || action.from),
          tokenText("wrapped a profile"),
          tokenImage(m.image_uri),
          tokenName(m.name || m.handle || ""),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "unwrap") {
        res = join([
          tokenAddr(m.handle || action.from),
          tokenText("unwrapped a profile"),
          tokenImage(m.image_uri),
          tokenName(m.name || m.handle || ""),
          ...tokenPlatform(action),
        ]);
      }
    },
    "social-delete": () => {
      res = join([
        tokenAddr(action.from),
        tokenText("deleted a post"),
        tokenPost(action),
        ...tokenPlatform(action),
      ]);
    },
    "social-proxy": (m) => {
      if (m.action === "appoint") {
        res = join([
          tokenAddr(action.from),
          tokenText("approved a proxy"),
          ...tokenPlatform(action),
        ]);
      } else {
        res = join([
          tokenAddr(action.from),
          tokenText("removed a proxy"),
          ...tokenPlatform(action),
        ]);
      }
    },
    "metaverse-transfer": (m) => {
      res = join([
        tokenAddr(action.from),
        tokenText("transferred"),
        tokenImage(m.image_url),
        tokenName(m.name || m.title || "an asset"),
        tokenText("to"),
        tokenAddr(action.to),
      ]);
    },
    "metaverse-mint": (m) => {
      res = join([
        tokenAddr(action.from),
        tokenText("minted"),
        tokenImage(m.image_url),
        tokenName(m.name || m.title || "an asset"),
        ...tokenPlatform(action),
      ]);
    },
    "metaverse-burn": (m) => {
      res = join([
        tokenAddr(action.from),
        tokenText("burned"),
        tokenImage(m.image_url),
        tokenName(m.name || m.title || "an asset"),
        ...tokenPlatform(action),
      ]);
    },
    "metaverse-trade": (m) => {
      if (m.action === "buy") {
        res = join([
          tokenAddr(action.from),
          tokenText("bought"),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || "an asset"),
          tokenText("from"),
          tokenAddr(action.from),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "sell") {
        res = join([
          tokenAddr(action.from),
          tokenText("sold"),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || "an asset"),
          tokenText("from"),
          tokenAddr(action.from),
          ...tokenPlatform(action),
        ]);
      } else if (m.action === "list") {
        res = join([
          tokenAddr(action.from),
          tokenText("listed"),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || "an asset"),
          tokenText("from"),
          tokenAddr(action.from),
          ...tokenPlatform(action),
        ]);
      }
    },
  });
  return res;
}

export function hasMultiPrimaryActions(activity: Activity): boolean {
  const actions = getSummaryActions(activity);
  let count = 0;
  actions.forEach((action) => {
    if (action.type === activity.type && action.tag === activity.tag) {
      count++;
    }
  });
  return count > 1;
}

export function flatActivity(activity: Activity) {
  const hasMulti = hasMultiPrimaryActions(activity);

  if (hasMulti) {
    const res: Activity[] = [];
    const actions = getSummaryActions(activity);
    actions.forEach((action) => {
      res.push({
        ...activity,
        actions: [action],
      });
    });
    return res;
  } else {
    return [activity];
  }
}
