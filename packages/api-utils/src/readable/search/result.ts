import type { Activity } from "../../data/client.js";
import type { components } from "../../types/search-external.js";
import { isAddress, isSupportedNS } from "../address/index.js";
import { formatContent } from "../content/index.js";

export function extractHighlight(
  data: components["schemas"]["SakuinPostSearchRespDTO"],
) {
  const { highlighting } = data;
  if (!highlighting) return {};
  return highlighting;
}

export function extractAction(
  data: components["schemas"]["SakuinPostSearchRespDTO"],
) {
  if (!data.actions || data.actions.length < 1) {
    return null;
  }
  return data.actions[0];
}

export function extractAuthorFromExtension(
  data: components["schemas"]["SakuinPostSearchRespDTO"],
) {
  const highlight = extractHighlight(data);
  const action = extractAction(data);
  const raw = highlight.author || action?.from;
  const list = raw
    ?.split(" ")
    .sort((a) => (isAddress(a) || isSupportedNS(a) ? -1 : 1));
  if (list && list.length > 0) {
    return list[0];
  } else {
    return "";
  }
}

export function extractMetadata(
  data: components["schemas"]["SakuinPostSearchRespDTO"],
) {
  const action = extractAction(data);
  if (!action) return {};
  const metadata = action.metadata;
  return metadata;
}

export function extractAuthorFromStringArray(data?: string[]) {
  if (!data || data.length < 1) return undefined;
  const list = data.sort((a) => (isAddress(a) || isSupportedNS(a) ? -1 : 1));
  const res = list.find((a) => isAddress(a) || isSupportedNS(a));
  return res;
}

export function extractMetadataContent(
  data: components["schemas"]["SakuinPostDetailDTO"],
) {
  // SakuinPostDetailDTO type missing `spam` field
  // so we use as Activity here
  const activity = data as Activity;
  const content = formatContent(activity);
  return content;
}
