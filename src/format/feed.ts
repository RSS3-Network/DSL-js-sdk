import { components } from '../types/data'
import { Theme, themePlain } from './theme'
import { Token, token, tokenComma, tokenText, tokenValue, join, tokenPlatform } from './token'
import { getActions, getActionType } from './utils'

export function formatPlain(feed: components['schemas']['Transaction']): string {
  return format(feed, themePlain).join('')
}

/**
 * returns a plain string summary of the feed.
 */
export function format<T>(feed: components['schemas']['Transaction'], theme: Theme<T>): T[] {
  const ts = tokenizeFeed(feed)
  return ts.map((t) => theme[t.type](t.content))
}

/**
 * Returns a list of tokens that can be used to custom render the output of a feed, such as CLI output
 * all the symbols in blue color.
 */
export function tokenizeFeed(feed: components['schemas']['Transaction']): Token[] {
  const ts = getActions(feed)

  return ts.reduce((acc, t) => {
    if (acc.length === 0) {
      return tokenizeAction(feed, t)
    }

    return [...acc, tokenComma, ...tokenizeAction(feed, t)]
  }, [] as Token[])
}

/**
 * Returns a list of tokens that can be used to custom render the output of an action, such as CLI output
 */
export function tokenizeAction(
  feed: components['schemas']['Transaction'],
  action: components['schemas']['Transfer'],
): Token[] {
  const typ = getActionType(feed, action)

  const formatter = formatters[typ]

  if (!formatter) return [token('unknown', errActionType.message)]

  return formatter(action, feed)
}

interface Tokenizer {
  (action: components['schemas']['Transfer'], feed: components['schemas']['Transaction']): Token[]
}

interface Tokenizers {
  [key: string]: Tokenizer
}

const errActionType = new Error('Invalid action type')

const formatters: Tokenizers = {
  'transaction-transfer': (a, f) => {
    if (a.tag !== 'transaction' || a.type !== 'transfer') {
      throw errActionType
    }

    if (f.owner === a.address_from) {
      return join([
        tokenText('Transferred'),
        ...tokenValue(a.metadata),
        tokenText('to'),
        token('address', a.address_to),
      ])
    }

    return join([tokenText('Claimed'), ...tokenValue(a.metadata), tokenText('from'), token('address', a.address_from)])
  },
  'exchange-deposit': (a) => {
    if (a.tag !== 'exchange' || a.type !== 'deposit') {
      throw errActionType
    }

    return join([tokenText('Deposited'), ...tokenValue(a.metadata), ...tokenPlatform(a)])
  },
}
