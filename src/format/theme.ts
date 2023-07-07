import { TokenType } from './token'
import { compiledConvert } from './utils'

export type Theme<T> = {
  [key in TokenType]: (content: string) => T
}

export const themePlain: Theme<string> = {
  html: (c) => JSON.stringify(ellipsis(compiledConvert(c))),
  name: (c) => JSON.stringify(c),
  platform: (c) => JSON.stringify(c),
  address: (c) => c,
  network: (c) => JSON.stringify(c),
  number: (c) => c,
  symbol: (c) => c,
  text: (c) => c,
  separator: (c) => c,
  unknown: (c) => c,
}

function ellipsis(s: string): string {
  let trimmed = false
  const max = 50
  if (s.length > max) {
    s = s.slice(0, max)
    trimmed = true
  }

  if (/\n/.test(s)) {
    s = s.replace(/\n[\s\S]+/g, '')
    trimmed = true
  }

  return s + (trimmed ? '...' : '')
}
