export function formatLink(arr: string[]): string {
  return arr.find((i) => !!i) || ''
}

export function formatLabel(name: string, value?: string, date?: string) {
  if (!value) return null
  return {
    name,
    value,
    date: date ? new Date(date).getTime() : undefined,
  }
}
