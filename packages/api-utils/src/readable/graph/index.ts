import type { Activity } from "../../data/client.js";
import { handleMetadata } from "../../metadata/index.js";
import type { components } from "../../types/data.js";
import { getActions } from "../../utils.js";
import { tokenPost, tokenValue } from "../activity/token.js";
import type { Dot, Value } from "./dot.js";

export function formatGraph(activity: Activity): Dot[] {
  const actions = getActions(activity);
  const dots = actions.map((action) => activityToDot(activity, action));
  return dots;
}

export function activityToDot(
  activity: Activity,
  action: components["schemas"]["Action"],
): Dot {
  const res = {
    from: action.from,
    to: action.to,
    verb: action.type,
    voice: activity.direction === "in" ? "passive" : "active",
    object: {
      type: "unknown",
      content: "",
    },
  };

  if (action.tag === "social") {
    delete res.to;
  }

  let obj: Value = {
    type: "unknown",
    content: "",
  };

  handleMetadata(action, {
    "transaction-transfer": (m) => (obj = formatToken(m)),
    "transaction-approval": (m) => (obj = formatToken(m)),
    "transaction-mint": (m) => (obj = formatToken(m)),
    "transaction-burn": (m) => (obj = formatToken(m)),
    "transaction-bridge": (m) => (obj = formatToken(m.token)),
    "transaction-deploy": (m) => (obj = formatContract(m.address)),
    "collectible-transfer": (m) => (obj = formatAsset(m)),
    "collectible-approval": (m) => (obj = formatAsset(m)),
    "collectible-mint": (m) => (obj = formatAsset(m)),
    "collectible-burn": (m) => (obj = formatAsset(m)),
    "collectible-trade": (m) => (obj = formatAsset(m)),
    "collectible-auction": (m) => (obj = formatAsset(m)),
    "exchange-swap": (m) => (obj = formatExchange(m)),
    // todo add the action invoker
    "exchange-liquidity": (m) => (obj = formatLiquidity(m)),
    // todo add the action invoker
    "exchange-loan": (m) => (obj = formatLoan(m.amount)),
    "donation-donate": (m) => (obj = formatDonation(m)),
    "governance-propose": (m) => (obj = formatPropose(m)),
    "governance-vote": (m) => (obj = formatVote(m)),
    "social-post": () => (obj = formatPost(action)),
    "social-comment": () => (obj = formatPost(action)),
    "social-share": () => (obj = formatPost(action)),
    "social-mint": () => (obj = formatPost(action)),
    "social-revise": () => (obj = formatPost(action)),
    "social-profile": (m) => (obj = formatProfile(m)),
    "social-delete": () => (obj = formatPost(action)),
    "social-proxy": () => {
      // todo
    },
    "metaverse-transfer": (m) => (obj = formatMetaverse(m)),
    "metaverse-mint": (m) => (obj = formatMetaverse(m)),
    "metaverse-burn": (m) => (obj = formatMetaverse(m)),
    "metaverse-trade": (m) => (obj = formatMetaverse(m)),
  });

  res.object = obj;

  return res;
}

function formatToken(
  m: components["schemas"]["TokenMetadata"] | null | undefined,
) {
  if (!m)
    return {
      type: "token",
      content: "0 eth",
    };
  const token = tokenValue(m);
  const content = token
    .filter((t) => t.type !== "symbolImage")
    .map((t) => t.content)
    .join(" ");
  return {
    type: "token",
    content,
  };
}

function formatContract(contract: string) {
  return {
    type: "contract",
    content: contract,
  };
}

function formatAsset(
  m:
    | components["schemas"]["CollectibleTrade"]
    | components["schemas"]["CollectibleTransfer"]
    | components["schemas"]["CollectibleAuction"]
    | components["schemas"]["CollectibleApproval"],
) {
  const content = m.title || m.name || "untitled";
  return {
    type: "collectible",
    content,
  };
}

function formatExchange(m: components["schemas"]["ExchangeSwap"]) {
  const from = tokenValue(m.from);
  const to = tokenValue(m.to);
  const content = [from, to]
    .map((item) =>
      item.filter((t) => t.type !== "symbolImage").map((t) => t.content),
    )
    .join(" to ");
  return {
    type: "exchange",
    content: content,
  };
}

function formatLiquidity(m: components["schemas"]["ExchangeLiquidity"]) {
  const tokens = m.tokens.map((t) => tokenValue(t));
  return {
    type: "liquidity",
    content: tokens
      .map((item) => item.map((t) => t.content).join(" "))
      .join(" "),
  };
}

function formatLoan(
  m: components["schemas"]["TokenMetadata"] | null | undefined,
) {
  const res = formatToken(m);
  if (!res) return res;
  res.type = "loan";
  return res;
}

function formatDonation(m: components["schemas"]["Donation"]) {
  return {
    type: "donation",
    content: m.title || "Untitled",
  };
}

function formatPropose(m: components["schemas"]["GovernanceProposal"]) {
  return {
    type: "proposal",
    content: m.title || "Untitled",
  };
}

function formatVote(m: components["schemas"]["GovernanceVote"]) {
  return {
    type: "vote",
    content: m.proposal?.options?.join(",") || "",
  };
}

function formatPost(action: components["schemas"]["Action"]) {
  const token = tokenPost(action);
  return {
    type: "post",
    content: token.content || "",
  };
}

function formatProfile(m: components["schemas"]["SocialProfile"]) {
  return {
    type: "profile",
    content: m.name || m.handle || "",
  };
}

function formatMetaverse(
  m:
    | components["schemas"]["MetaverseTransfer"]
    | components["schemas"]["MetaverseTrade"],
) {
  return {
    type: "metaverse",
    content: m.name || m.title || "Untitled",
  };
}
