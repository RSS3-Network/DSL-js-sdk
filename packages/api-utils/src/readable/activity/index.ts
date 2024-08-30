import type { Action, Activity } from "@rss3/api-core";

import { handleMetadata } from "../../metadata/index.js";
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

export * from "./theme.js";

export function getSummaryActions({ actions, tag, type }: Activity): Action[] {
	if (!actions) return [];
	if (actions.length === 1) return actions;

	const list = ["transaction-multisig"];

	return list.includes(`${tag}-${type}`)
		? actions
		: actions.filter((t) => t.tag === tag && t.type === type);
}

export function formatPlain(activity: Activity): string {
	const list = format(activity, themePlain).filter((s) => s !== "");

	const clean: string[] = [];
	for (let i = 0; i < list.length; i++) {
		if (list[i] === " " && list[i + 1] === " ") continue;
		clean.push(list[i] ?? "");
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
		// biome-ignore lint/style/noNonNullAssertion: The actions[0] is not null here
		return tokenizeAction(activity, actions[0]!);
	}

	// handle unknown activity
	if (activity.tag === "unknown" || activity.type === "unknown") {
		return [token("unknown", "Carried out an activity")];
	}

	const tokens = actions.reduce((acc, action) => {
		if (acc.length > 0) {
			acc.push(tokenSeparator);
		}

		acc.push(...tokenizeAction(activity, action));

		return acc;
	}, [] as Token[]);

	// biome-ignore lint/style/noNonNullAssertion: FIXME: Remove the non-null assertion once GI's OpenAPI spec is updated
	tokens.push(tokenSpace, tokenTime(activity.timestamp!));

	return tokens;
}

export function tokenizeToActions(activity: Activity): Token[][] {
	const actions = activity.actions ?? [];

	// used for social actions, remove the duplicate action
	if (activity.tag === "social" && actions.length > 1) {
		// biome-ignore lint/style/noNonNullAssertion: The actions[0] is not null here
		return [tokenizeAction(activity, actions[0]!)];
	}

	// handle unknown activity
	if (activity.tag === "unknown" || activity.type === "unknown") {
		return [[token("unknown", "Carried out an activity")]];
	}

	return actions.map((action) => tokenizeAction(activity, action));
}

export function tokenizeToSummaryActions(activity: Activity): Token[][] {
	const actions = getSummaryActions(activity);

	// used for social actions, remove the duplicate action
	if (activity.tag === "social" && actions.length > 1) {
		// biome-ignore lint/style/noNonNullAssertion: The actions[0] is not null here
		return [tokenizeAction(activity, actions[0]!)];
	}

	// handle unknown activity
	if (activity.tag === "unknown" || activity.type === "unknown") {
		return [[token("unknown", "Carried out an activity")]];
	}

	return actions.map((action) => tokenizeAction(activity, action));
}

/**
 * Returns a list of tokens that can be used to custom render the output of an action, such as CLI output
 */
export function tokenizeAction(activity: Activity, action: Action): Token[] {
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
		"transaction-bridge": (m) => {
			let network: Token[] = [];
			if (m.sourceNetwork) {
				network = [
					tokenText("from"),
					tokenNetwork(m.sourceNetwork),
					tokenText("to"),
					tokenNetwork(m.targetNetwork),
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
		// for collectible or nft related action, it will use image_url as the image link
		"collectible-transfer": (m) => {
			const meta = {
				address: m.address,
				id: m.id,
				network: activity.network,
				preview: m.parsedImageUrl,
			};
			res = join([
				tokenAddr(action.from),
				tokenText("transferred"),
				...tokenAsset(m.name || "an asset", meta),
				tokenText("to"),
				tokenAddr(action.to),
			]);
		},
		"collectible-approval": (m) => {
			const meta = {
				address: m.address,
				id: m.id,
				network: activity.network,
				preview: m.parsedImageUrl,
			};
			if (m.action === "approve") {
				res = join([
					tokenAddr(action.from),
					tokenText("approved"),
					tokenImage(m.parsedImageUrl),
					...tokenAsset(m.name || "collection", meta),
					tokenText("to"),
					tokenAddr(action.to),
				]);
			} else {
				res = join([
					tokenAddr(action.from),
					tokenText("revoked the approval of"),
					...tokenAsset(m.name || "collection", meta),
					tokenText("to"),
					tokenAddr(action.to),
				]);
			}
		},
		"collectible-mint": (m) => {
			const meta = {
				address: m.address,
				id: m.id,
				network: activity.network,
				preview: m.parsedImageUrl,
			};
			res = join([
				tokenAddr(action.from),
				tokenText("minted"),
				...tokenAsset(m.name || "an asset", meta),
				tokenText("to"),
				tokenAddr(action.to),
			]);
		},
		"collectible-burn": (m) => {
			const meta = {
				address: m.address,
				id: m.id,
				network: activity.network,
				preview: m.parsedImageUrl,
			};
			res = join([
				tokenAddr(action.from),
				tokenText("burned"),
				...tokenAsset(m.name || "an asset", meta),
			]);
		},
		"collectible-trade": (m) => {
			const meta = {
				address: m.address,
				id: m.id,
				network: activity.network,
				preview: m.parsedImageUrl,
			};
			if (m.action === "buy") {
				res = join([
					tokenAddr(action.to),
					tokenText("bought"),
					...tokenAsset(m.name || "an asset", meta),
					tokenText("from"),
					tokenAddr(action.from),
					...tokenPlatform(action),
				]);
			} else {
				res = join([
					tokenAddr(action.from),
					tokenText("sold"),
					...tokenAsset(m.name || "an asset", meta),
					tokenText("to"),
					tokenAddr(action.to),
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
					tokenImage(m.imageUri),
					tokenName(m.name || m.handle || ""),
					...tokenPlatform(action),
				]);
			} else if (m.action === "update") {
				res = join([
					tokenAddr(m.handle || action.from),
					tokenText("updated a profile"),
					tokenImage(m.imageUri),
					tokenName(m.name || m.handle || ""),
					...tokenPlatform(action),
				]);
			} else if (m.action === "renew") {
				res = join([
					tokenAddr(m.handle || action.from),
					tokenText("renewed a profile"),
					tokenImage(m.imageUri),
					tokenName(m.name || m.handle || ""),
					...tokenPlatform(action),
				]);
			} else if (m.action === "wrap") {
				res = join([
					tokenAddr(m.handle || action.from),
					tokenText("wrapped a profile"),
					tokenImage(m.imageUri),
					tokenName(m.name || m.handle || ""),
					...tokenPlatform(action),
				]);
			} else if (m.action === "unwrap") {
				res = join([
					tokenAddr(m.handle || action.from),
					tokenText("unwrapped a profile"),
					tokenImage(m.imageUri),
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
				tokenImage(m.parsedImageUrl),
				tokenName(m.name || "an asset"),
				tokenText("to"),
				tokenAddr(action.to),
			]);
		},
		"metaverse-mint": (m) => {
			res = join([
				tokenAddr(action.from),
				tokenText("minted"),
				tokenImage(m.parsedImageUrl),
				tokenName(m.name || "an asset"),
				...tokenPlatform(action),
			]);
		},
		"metaverse-burn": (m) => {
			res = join([
				tokenAddr(action.from),
				tokenText("burned"),
				tokenImage(m.parsedImageUrl),
				tokenName(m.name || "an asset"),
				...tokenPlatform(action),
			]);
		},
		"metaverse-trade": (m) => {
			if (m.action === "buy") {
				res = join([
					tokenAddr(action.from),
					tokenText("bought"),
					tokenImage(m.parsedImageUrl),
					tokenName(m.name || "an asset"),
					tokenText("from"),
					tokenAddr(action.from),
					...tokenPlatform(action),
				]);
			} else if (m.action === "sell") {
				res = join([
					tokenAddr(action.from),
					tokenText("sold"),
					tokenImage(m.parsedImageUrl),
					tokenName(m.name || "an asset"),
					tokenText("from"),
					tokenAddr(action.from),
					...tokenPlatform(action),
				]);
			} else if (m.action === "list") {
				res = join([
					tokenAddr(action.from),
					tokenText("listed"),
					tokenImage(m.parsedImageUrl),
					tokenName(m.name || "an asset"),
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

	for (const action of actions) {
		if (action.type === activity.type && action.tag === activity.tag) {
			count++;

			if (count > 1) {
				return true;
			}
		}
	}

	return false;
}

export function flatActivity(activity: Activity) {
	const hasMulti = hasMultiPrimaryActions(activity);

	if (hasMulti) {
		return getSummaryActions(activity).map(
			(action): Activity => ({
				...activity,
				actions: [action],
			}),
		);
	}
	return [activity];
}
