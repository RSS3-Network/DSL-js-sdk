import { components } from '../types/data'
import { compile } from 'html-to-text'

export const compiledConvert = compile()

export function getActions(activity: components['schemas']['Transaction']): components['schemas']['Transfer'][] {
  if (activity.actions.length === 1) {
    return activity.actions
  } else if (activity.actions) {
    return activity.actions.filter((t) => t.tag === activity.tag && t.type === activity.type)
  }
  return []
}

export function getActionType(
  activity: components['schemas']['Transaction'],
  action: components['schemas']['Transfer'],
): string {
  if (!action) return ''

  if ('action' in action.metadata) {
    return `${activity.tag}-${activity.type}-${action.metadata.action}`
  }

  return `${activity.tag}-${activity.type}`
}
