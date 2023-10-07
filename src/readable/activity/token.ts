import { INFINITY_VALUE } from '../../constants'
import { Activity } from '../../data/client'
import { components } from '../../types/data'
import { handleTokenValue } from '../number'

export type TokenType =
  | 'text' // plain text
  | 'html' // html text
  | 'number' // number value, such as token exchange rate
  | 'image' // image url
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

export function tokenSocialProfile(p?: components['schemas']['SocialProfile']) {
  if (p?.name) return [tokenName(p.name)]
  return tokenAddr(p ? p.handle || p.address || '' : '')
}

export function tokenAddr(t: string | null | undefined) {
  return [tokenImage(`https://cdn.stamp.fyi/avatar/${t || 'address'}?s=300`), token('address', t || '')]
}

export function tokenImage(t: string | null | undefined) {
  return token('image', t || '')
}

export function tokenNetwork(t: string | null | undefined) {
  return token('network', t || '')
}

export function tokenValue(t: components['schemas']['TokenMetadata'] | null | undefined) {
  if (!t) return [token('number', '0')]
  if (t.value === INFINITY_VALUE) return [token('number', 'infinite'), token('symbol', t.symbol)]
  return [tokenImage(t.image), token('number', handleTokenValue(t.value, t.decimals) || '0'), token('symbol', t.symbol)]
}

export function tokenPlatform(t: Activity | components['schemas']['Action']) {
  let platform = ''
  if (t.platform) {
    platform = t.platform
    return [tokenText('on'), token('platform', platform)]
  } else {
    return []
  }
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
