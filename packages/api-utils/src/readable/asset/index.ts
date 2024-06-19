import type { Action } from "@rss3/api-core";

import type { _components } from "../../metadata/doc.js";
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
    "collectible-auction": (m) => {
      res = extractNFT(m);
    },
    "donation-donate": (m) => {
      res = extractDonation(m);
    },
  });

  return res;
}

export function extractNFT(
  m:
    | _components["schemas"]["CollectibleTransfer"]
    | _components["schemas"]["CollectibleTrade"]
    | _components["schemas"]["CollectibleApproval"]
    | _components["schemas"]["CollectibleAuction"],
) {
  return {
    contract: m.contract_address,
    id: m.id,
    url: m.image_url,
    title: m.title || m.name,
    description: m.description,
  };
}

export function extractDonation(m: _components["schemas"]["Donation"]) {
  return {
    url: m.logo,
    title: m.title,
    description: m.description,
  };
}
