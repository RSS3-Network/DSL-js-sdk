import type { Action, Activity } from "@rss3/api-core";

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
	return tokens
		.reduce((acc, t) => {
			acc.push(sep, t);
			return acc;
		}, [] as Token[])
		.slice(1);
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

export type TokenMetadata = {
	symbol?: string;
	decimals?: number;
	image?: string;
	value?: string | null;
};

// maximum value of uint256
const INFINITY_VALUE =
	"115792089237316195423570985008687907853269984665640564039457584007913129639935";

export function tokenValue(t: TokenMetadata | null | undefined) {
	if (!t) return [token("number", "0")];
	if (t.value === INFINITY_VALUE)
		return [token("number", "infinite"), token("symbol", t.symbol)];
	return [
		token("symbolImage", t.image),
		token("number", formatTokenValue(t.value, t.decimals) || "0"),
		token("symbol", t.symbol),
	];
}

export function tokenPlatform(t: Activity | Action) {
	let platform = "";
	if (t.platform) {
		platform = t.platform;
		return [tokenText("on"), token("platform", platform)];
	}
	return [];
}

export function tokenPost(t: Action) {
	if (t.tag !== "social") {
		return tokenText("");
	}

	if (t.metadata) {
		if (
			"title" in t.metadata &&
			t.metadata.title &&
			!(t.platform === "Lens" && t.metadata.title)
		) {
			return token("html", t.metadata.title);
		}

		if ("body" in t.metadata && t.metadata.body) {
			return token("html", t.metadata.body);
		}

		if (
			"target" in t.metadata &&
			t.metadata.target &&
			"body" in t.metadata.target &&
			// FIXME: remove ts-ignore after GI fixing the type
			// @ts-ignore target is not null
			t.metadata.target.body
		) {
			// @ts-ignore target is not null
			return token("html", t.metadata.target.body);
		}
	}

	return token("html", "");
}

export function tokenAsset(name: string, meta?: Token["meta"]) {
	const img = meta?.preview;
	if (img) {
		return [token("assetImage", img), token("name", name, meta)];
	}
	return [token("name", name, meta)];
}
