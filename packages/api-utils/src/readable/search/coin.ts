export const DAY_OPTIONS = [
  {
    name: "1D",
    value: "1",
  },
  {
    name: "7D",
    value: "7",
  },
  {
    name: "1M",
    value: "30",
  },
  {
    name: "3M",
    value: "90",
  },
  {
    name: "1Y",
    value: "365",
  },
  {
    name: "ALL",
    value: "max",
  },
];

export function formatLink(arr: string[]): string {
  return arr.find((i) => !!i) || "";
}

export function formatLabel(name: string, value?: string, date?: string) {
  if (!value) return null;
  return {
    name,
    value,
    date: date ? new Date(date).getTime() : undefined,
  };
}
