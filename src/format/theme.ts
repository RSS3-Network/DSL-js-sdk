import { TokenType } from './token'
import { compiledConvert } from './utils'

export type Theme<T> = {
  [key in TokenType]: (content: string) => T
}

export const themePlain: Theme<string> = {
  html: (c) => compiledConvert(c),
  platform: (c) => JSON.stringify(c),
  address: (c) => c,
  network: (c) => JSON.stringify(c),
  number: (c) => c,
  symbol: (c) => c,
  text: (c) => c,
  unknown: (c) => c,
}
