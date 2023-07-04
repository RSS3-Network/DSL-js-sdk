import { components } from '../types/data'
import { compile } from 'html-to-text'

export const compiledConvert = compile()

export function getActions(feed: components['schemas']['Transaction']): components['schemas']['Transfer'][] {
  if (feed.actions.length === 1) {
    return feed.actions
  } else if (feed.actions) {
    return feed.actions.filter((t) => t.tag === feed.tag && t.type === feed.type)
  }
  return []
}

export function getActionType(
  feed: components['schemas']['Transaction'],
  action: components['schemas']['Transfer'],
): string {
  if (!action) return ''

  if ('action' in action.metadata) {
    return `${feed.tag}-${feed.type}-${action.metadata.action}`
  }

  return `${feed.tag}-${feed.type}`
}
