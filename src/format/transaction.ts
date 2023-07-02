import { components } from '../types/data'
import { compiledConvert, getTransfers, getTransferType } from './utils'

/**
 * formatTransaction returns a plain string summary of the txn.
 */
export default function formatTransaction(txn: components['schemas']['Transaction']): string {
  const ts = tokenizeTransaction(txn)

  return ts.reduce((acc, t) => {
    switch (t.type) {
      case 'html':
        return acc + compiledConvert(t.content)
    }
    return acc + t.content
  }, '')
}

/**
 * tokenizeTransaction returns a list of tokens that can be used to custom render the output of a txn, such as CLI output
 * all the symbols in blue color.
 */
export function tokenizeTransaction(txn: components['schemas']['Transaction']): Token[] {
  const ts = getTransfers(txn)

  return ts.reduce((acc, t) => {
    const typ = getTransferType(txn, t)

    const formatter = formatters[typ]

    if (!formatter) throw errTransferType

    if (acc.length === 0) {
      return formatter(t, txn)
    }

    return [...acc, tokenComma, ...formatter(t, txn)]
  }, [] as Token[])
}

export type Token = {
  type: 'text' | 'html' | 'number' | 'symbol' | 'address' | 'name' | 'platform' | 'network'
  content: string
}

interface Tokenizer {
  (transfer: components['schemas']['Transfer'], txn: components['schemas']['Transaction']): Token[]
}

interface Tokenizers {
  [key: string]: Tokenizer
}

const errTransferType = new Error('Invalid transfer type')

const formatters: Tokenizers = {
  'transaction-transfer': (t, txn) => {
    if (t.tag !== 'transaction' || t.type !== 'transfer') {
      throw errTransferType
    }

    if (txn.owner === t.address_from) {
      return join([
        tokenText('Transferred'),
        ...tokenValue(t.metadata),
        tokenText('to'),
        token('address', t.address_to),
      ])
    }

    return join([tokenText('Claimed'), ...tokenValue(t.metadata), tokenText('from'), token('address', t.address_from)])
  },
}

function token(type: Token['type'], content = ''): Token {
  return { type, content }
}

const tokenSpace = tokenText(' ')

const tokenComma = tokenText(', ')

function join(tokens: Token[], sep = tokenSpace): Token[] {
  return tokens.reduce((acc, t) => [...acc, sep, t], [] as Token[]).slice(1)
}

function tokenText(t: string): Token {
  return token('text', t)
}

function tokenValue(t: components['schemas']['Token']) {
  return [token('number', t.value_display || '0'), token('symbol', t.symbol)]
}
