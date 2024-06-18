import { INFINITY_VALUE } from "../../constants.js";
import type { Activity } from "../../data/client.js";
import type { components } from "../../types/data.js";
import { formatTokenValue } from "../number/index.js";

export type TokenType =
  | "text" // plain text
  | "html" // html text
  | "number" // number value, such as token exchange rate
  | "image" // image url
  | "symbolImage" // symbol image url
  | "assetImage" // asset image url
  | "symbol" // short name for a token, such as BTC, ETH
  | "address" // wallet address or txn address, such as https://help.coinbase.com/en/coinbase/getting-started/crypto-education/what-is-a-transaction-hash-hash-id
  | "name" // name for NFT, etc
  | "platform" // platform name
  | "network" // network name
  | "separator" // separator for actions
  | "time" // time
  | "unknown"; // unknown data type to tokenize

export type Token = {
  type: TokenType;
  content: string;
  meta?: {
    address?: string | null;
    network?: string | null;
    id?: string | null;
    preview?: string;
  };
};

export function token(
  type: Token["type"],
  content = "",
  meta?: Token["meta"],
): Token {
  return { type, content, meta };
}

export const tokenSpace = tokenText(" ");

export const tokenSeparator = token("separator", "; ");

export function join(tokens: Token[], sep = tokenSpace): Token[] {
  return tokens.reduce((acc, t) => [...acc, sep, t], [] as Token[]).slice(1);
}

export function tokenText(t: string): Token {
  return token("text", t);
}

export function tokenName(t: string): Token {
  return token("name", t);
}

export function tokenImage(t: string | null | undefined) {
  return token("image", t || "");
}

export function tokenNetwork(t: string | null | undefined) {
  return token("network", t || "");
}

export function tokenTime(t: number) {
  return token("time", new Date(t * 1000).toJSON());
}

export function tokenAddr(t: string | null | undefined) {
  return token("address", t || "");
}

export function tokenHandle(
  t: string | null | undefined,
  addr: string | null | undefined,
  network: string | null | undefined,
) {
  if (!addr) return token("address", t || "");
  return token("address", t || "", { address: addr, network: network || "" });
}

export function tokenValue(
  t: components["schemas"]["TokenMetadata"] | null | undefined,
) {
  if (!t) return [token("number", "0")];
  if (t.value === INFINITY_VALUE)
    return [token("number", "infinite"), token("symbol", t.symbol)];
  return [
    token("symbolImage", t.image),
    token("number", formatTokenValue(t.value, t.decimals) || "0"),
    token("symbol", t.symbol),
  ];
}

export function tokenPlatform(t: Activity | components["schemas"]["Action"]) {
  let platform = "";
  if (t.platform) {
    platform = t.platform;
    return [tokenText("on"), token("platform", platform)];
  } else {
    return [];
  }
}

export function tokenPost(t: components["schemas"]["Action"]) {
  if (t.tag !== "social") {
    return tokenText("");
  }

  let out = "";

  const platform = t.platform || "";

  if (
    "title" in t.metadata &&
    t.metadata.title &&
    !(platform === "Lens" && t.metadata.title)
  ) {
    out = t.metadata.title;
    return token("html", out);
  }

  if ("body" in t.metadata && t.metadata.body) {
    out = t.metadata.body;
  } else if (
    "target" in t.metadata &&
    t.metadata.target &&
    t.metadata.target.body
  ) {
    out = t.metadata.target.body;
  }

  return token("html", out);
}

export function tokenAsset(name: string, meta?: Token["meta"]) {
  const img = meta?.preview;
  if (img) {
    return [token("assetImage", img), token("name", name, meta)];
  } else {
    return [token("name", name, meta)];
  }
}
