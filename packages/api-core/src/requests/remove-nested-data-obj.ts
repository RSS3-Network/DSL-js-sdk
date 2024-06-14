export type RemoveNestedDataObj<T> = T extends { data?: infer D }
  ? [Exclude<keyof T, "data">] extends [never]
    ? D
    : T
  : T;

export function removeNestedDataObj<T>(obj: T): RemoveNestedDataObj<T> {
  if (hasOnlyDataKey(obj)) {
    return obj.data as RemoveNestedDataObj<T>;
  }

  return obj as RemoveNestedDataObj<T>;
}

function isObject(data: unknown): data is object {
  return !!data && typeof data === "object";
}

function hasOnlyDataKey(data: unknown): data is { data: unknown } {
  return isObject(data) && Object.keys(data).length === 1 && "data" in data;
}
