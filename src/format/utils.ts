import { components } from '../types/data'
import { compile } from 'html-to-text'

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

export const compiledConvert = compile()

export function fmtPostBrief(t: components['schemas']['Transfer']) {
  if (t.tag !== 'social') {
    return ''
  }

  let out = ''

  if ('title' in t.metadata && t.metadata.title) {
    out = t.metadata.title
  } else if ('body' in t.metadata && t.metadata.body) {
    out = t.metadata.body
  } else if ('target' in t.metadata && t.metadata.target && t.metadata.target.body) {
    out = t.metadata.target.body
  }

  out = compiledConvert(out)

  let trimmed = false
  const max = 50
  if (out.length > max) {
    out = out.slice(0, max)
    trimmed = true
  }

  if (/\n/.test(out)) {
    out = out.replace(/\n[\s\S]+/g, '')
    trimmed = true
  }

  return JSON.stringify(out + (trimmed ? '...' : ''))
}

export function fmtName(t: components['schemas']['Transfer']) {
  if (!('name' in t.metadata)) {
    return ''
  }
  return JSON.stringify(t.metadata.name)
}

export function fmtPlatform(t: components['schemas']['Transfer']) {
  let platform = ''
  if (t.platform) platform = t.platform
  if ('platform' in t.metadata) platform = t.metadata.platform
  return ` on platform ${platform}`
}
