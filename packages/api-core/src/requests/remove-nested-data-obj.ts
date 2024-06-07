export type RemoveNestedDataObj<T> = T extends { data: { data: infer D } }
  ? Omit<T, "data"> & { data: D }
  : T extends { data: { data?: infer D } }
    ? Omit<T, "data"> & { data?: D }
    : T;

export function removeNestedDataObj<T>(obj: T): RemoveNestedDataObj<T> {
  if (isObject(obj) && "data" in obj && isObject(obj.data)) {
    if (hasOnlyDataKey(obj.data)) {
      return {
        ...obj,
        data: obj.data.data,
      } as RemoveNestedDataObj<T>;
    }
  }

  return obj as RemoveNestedDataObj<T>;
}

function isObject(data: unknown): data is object {
  return !!data && typeof data === "object";
}

function hasOnlyDataKey(data: unknown): data is { data: unknown } {
  return isObject(data) && Object.keys(data).length === 1 && "data" in data;
}
