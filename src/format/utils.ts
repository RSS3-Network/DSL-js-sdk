import { components } from '../types/data'
import { compile } from 'html-to-text'

export const compiledConvert = compile()

export function getTransfers(txn: components['schemas']['Transaction']): components['schemas']['Transfer'][] {
  if (txn.actions.length === 1) {
    return txn.actions
  } else if (txn.actions) {
    return txn.actions.filter((t) => t.tag === txn.tag && t.type === txn.type)
  }
  return []
}

export function getTransferType(
  txn: components['schemas']['Transaction'],
  transfer: components['schemas']['Transfer'],
): string {
  if (!transfer) return ''

  if ('action' in transfer.metadata) {
    return `${txn.tag}-${txn.type}-${transfer.metadata.action}`
  }

  return `${txn.tag}-${txn.type}`
}
