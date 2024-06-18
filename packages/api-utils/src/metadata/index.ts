import type { components } from "../types/data.js";
import { getTagType } from "../utils.js";
import type { metadataDoc } from "./doc.js";

type NotUndefined<T> = T extends undefined ? never : T;

type MakeKeysOptional<T> = {
  [K in keyof T]?: T[K];
};

type Doc = typeof metadataDoc;

export type TagTypeMap = MakeKeysOptional<Doc>;

type Handlers = {
  [key in keyof TagTypeMap]: (
    metadata: NotUndefined<NotUndefined<TagTypeMap[key]>["ref"]>,
  ) => void;
};

export function handleMetadata(
  action: components["schemas"]["Action"],
  hs: Handlers,
) {
  const h = hs[getTagType(action)];
  if (!h) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h(action.metadata as any);
}
