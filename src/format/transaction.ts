import { components } from '../types/data'
import { themePlain } from './themes'
import { Token, token, tokenComma, tokenText, tokenValue, join, tokenPlatform } from './token'
import { getTransfers, getTransferType } from './utils'

/**
 * formatTransaction returns a plain string summary of the txn.
 */
export default function formatTransaction(txn: components['schemas']['Transaction'], theme = themePlain): string {
  const ts = tokenizeTransaction(txn)
  return ts.reduce((acc, t) => acc + theme[t.type](t.content), '')
}

/**
 * tokenizeTransaction returns a list of tokens that can be used to custom render the output of a txn, such as CLI output
 * all the symbols in blue color.
 */
export function tokenizeTransaction(txn: components['schemas']['Transaction']): Token[] {
  const ts = getTransfers(txn)

  return ts.reduce((acc, t) => {
    if (acc.length === 0) {
      return tokenizeTransfer(txn, t)
    }

    return [...acc, tokenComma, ...tokenizeTransfer(txn, t)]
  }, [] as Token[])
}

/**
 * tokenizeTransfer returns a list of tokens that can be used to custom render the output of a transfer, such as CLI output
 */
export function tokenizeTransfer(
  txn: components['schemas']['Transaction'],
  t: components['schemas']['Transfer'],
): Token[] {
  const typ = getTransferType(txn, t)

  const formatter = formatters[typ]

  if (!formatter) throw errTransferType

  return formatter(t, txn)
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
  'exchange-deposit': (t) => {
    if (t.tag !== 'exchange' || t.type !== 'deposit') {
      throw errTransferType
    }

    return join([tokenText('Deposited'), ...tokenValue(t.metadata), ...tokenPlatform(t)])
  },
}
