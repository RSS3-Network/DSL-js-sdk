import type { Action } from "@rss3/api-core";

import type { MetadataDoc } from "./doc.js";

type Handlers = {
	[K in keyof MetadataDoc]: (metadata: MetadataDoc[K]["ref"]) => void;
};

export function getTagType(action: Action) {
	return `${action.tag}-${action.type}` as keyof Handlers;
}

export function handleMetadata(action: Action, handlers: Partial<Handlers>) {
	// biome-ignore lint/suspicious/noExplicitAny: Use of any is necessary here
	handlers[getTagType(action)]?.(action.metadata as any);
}

export { renderItemActionToHTML } from "./parser.js";
