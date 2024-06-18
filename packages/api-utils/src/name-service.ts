export const SUPPORTED_NAME_SERVICES = [
  ".eth",
  ".lens",
  ".csb",
  ".bnb",
  ".bit",
  ".crypto",
  ".zil",
  ".nft",
  ".x",
  ".wallet",
  ".bitcoin",
  ".dao",
  ".888",
  ".blockchain",
  ".avax",
  ".arb",
  ".cyber",
] as const;

export type SupportedNameService = (typeof SUPPORTED_NAME_SERVICES)[number];

export function isSupportedNameService(
  handle?: string | null,
): handle is `${string}${SupportedNameService}` {
  if (!handle) return false;
  const _handle = handle.toLowerCase();
  return SUPPORTED_NAME_SERVICES.some((ns) => _handle.endsWith(ns));
}
