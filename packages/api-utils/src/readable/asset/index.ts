import type {
	Action,
	CollectibleApproval,
	CollectibleTrade,
	CollectibleTransfer,
} from "@rss3/api-core";

import { handleMetadata } from "../../metadata/index.js";

export type BriefAsset = {
	contract?: string | null;
	id?: string | null;
	url?: string;
	title?: string;
	description?: string;
};

export function extractAsset(action: Action) {
	let res: BriefAsset | undefined;

	handleMetadata(action, {
		"collectible-transfer": (m) => {
			res = extractNFT(m);
		},
		"collectible-approval": (m) => {
			res = extractNFT(m);
		},
		"collectible-mint": (m) => {
			res = extractNFT(m);
		},
		"collectible-burn": (m) => {
			res = extractNFT(m);
		},
		"collectible-trade": (m) => {
			res = extractNFT(m);
		},
	});

	return res;
}

export function extractNFT(
	m: CollectibleTransfer | CollectibleTrade | CollectibleApproval,
) {
	return {
		address: m.address,
		id: m.id,
		url: m.parsedImageUrl,
		title: m.name,
		standard: m.standard,
	};
}
