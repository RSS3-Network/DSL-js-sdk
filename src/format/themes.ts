import { TokenType } from './token'
import { compiledConvert } from './utils'

export type Theme = {
  [key in TokenType]: (content: string) => string
}

export const themePlain: Theme = {
  html: (c) => compiledConvert(c),
  platform: (c) => JSON.stringify(c),
  address: (c) => c,
  network: (c) => JSON.stringify(c),
  number: (c) => c,
  symbol: (c) => c,
  text: (c) => c,
}
