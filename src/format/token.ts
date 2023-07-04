import { components } from '../types/data'

export type TokenType =
  | 'text' // plain text
  | 'html' // html text
  | 'number' // number value, such as token exchange rate
  | 'symbol' // short name for a token, such as BTC, ETH
  | 'address' // wallet address or txn address, such as https://help.coinbase.com/en/coinbase/getting-started/crypto-education/what-is-a-transaction-hash-hash-id
  | 'platform' // platform name
  | 'network' // network name
  | 'unknown' // unknown data type to tokenize

export type Token = {
  type: TokenType
  content: string
}

export function token(type: Token['type'], content = ''): Token {
  return { type, content }
}

export const tokenSpace = tokenText(' ')

export const tokenComma = tokenText(', ')

export function join(tokens: Token[], sep = tokenSpace): Token[] {
  return tokens.reduce((acc, t) => [...acc, sep, t], [] as Token[]).slice(1)
}

export function tokenText(t: string): Token {
  return token('text', t)
}

export function tokenValue(t: components['schemas']['Token']) {
  return [token('number', t.value_display || '0'), token('symbol', t.symbol)]
}

export function tokenPlatform(t: components['schemas']['Transfer']) {
  let platform = ''
  if (t.platform) platform = t.platform
  if ('platform' in t.metadata) platform = t.metadata.platform
  return [tokenText('on'), tokenText('platform'), token('platform', platform)]
}
