import type { components as dataComponents } from "../../types/data-v1.js";
import type { components } from "../../types/search-internal.js";

export function extractWiki(data?: components["schemas"]["WikiDocDTO"]) {
  if (!data) return null;
  if (!data.actions) return null;
  if (data.actions.length < 1) return null;
  const action = data.actions[0] as dataComponents["schemas"]["Transfer"];
  if (action.tag === "social" && action.type === "wiki") {
    const { metadata } = action;
    return {
      media: metadata.media?.map((item) => item.address),
      title: metadata.title,
      summary: metadata.summary,
      categories: metadata.categories,
      tags: metadata.tags,
      url: metadata.target_url,
    };
  }
  return null;
}
