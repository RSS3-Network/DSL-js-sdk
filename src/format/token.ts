import { components } from '../types/data'

export type TokenType =
  | 'text' // plain text
  | 'html' // html text
  | 'number' // number value, such as token exchange rate
  | 'symbol' // short name for a token, such as BTC, ETH
  | 'address' // wallet address or txn address, such as https://help.coinbase.com/en/coinbase/getting-started/crypto-education/what-is-a-transaction-hash-hash-id
  | 'name' // name for NFT, etc
  | 'platform' // platform name
  | 'network' // network name
  | 'separator' // separator for actions
  | 'unknown' // unknown data type to tokenize

export type Token = {
  type: TokenType
  content: string
}

export function token(type: Token['type'], content = ''): Token {
  return { type, content }
}

export const tokenSpace = tokenText(' ')

export const tokenSeparator = token('separator', '; ')

export function join(tokens: Token[], sep = tokenSpace): Token[] {
  return tokens.reduce((acc, t) => [...acc, sep, t], [] as Token[]).slice(1)
}

export function tokenText(t: string): Token {
  return token('text', t)
}

export function tokenName(t: string): Token {
  return token('name', t)
}

export function tokenAddr(d: string | null | undefined) {
  return token('address', d || '')
}

export function tokenValue(t: components['schemas']['Token'] | null | undefined) {
  if (!t) return [token('number', '0')]
  return [token('number', t.value_display || '0'), token('symbol', t.symbol)]
}

export function tokenPlatform(t: components['schemas']['Action']) {
  let platform = ''
  if (t.platform) platform = t.platform
  if ('platform' in t.metadata) platform = t.metadata.platform
  return [tokenText('on'), tokenText('platform'), token('platform', platform)]
}

export function tokenPost(t: components['schemas']['Action']) {
  if (t.tag !== 'social') {
    return tokenText('')
  }

  let out = ''

  if ('title' in t.metadata && t.metadata.title) {
    out = t.metadata.title
  } else if ('body' in t.metadata && t.metadata.body) {
    out = t.metadata.body
  } else if ('target' in t.metadata && t.metadata.target && t.metadata.target.body) {
    out = t.metadata.target.body
  }

  return token('html', out)
}
