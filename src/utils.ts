import { components as searchComponents } from './types/search-internal'
import { components as dataComponents } from './types/data'
import Debug from 'debug'
import { TagTypeMap } from './metadata'
import { Activity } from './data/client'

export type Res<Data, Meta> = Promise<{ data: Data; meta: Meta }>

export const debug = Debug('@rss3/js-sdk')

export function fetchWithLog(logger: typeof debug, f: typeof fetch = fetch): typeof fetch {
  return (input, init) => {
    if (init?.body) logger('%s %s %s', init?.method, input, init?.body)
    else logger('%s %s', init?.method, input)
    return f(input, init)
  }
}

export type TimeRange = 'all' | 'day' | 'week' | 'month' | 'year'

export function timeRange(range: TimeRange = 'all'): searchComponents['schemas']['FeedSearchReqDTO']['between'] {
  const now = Date.now()
  const day = 24 * 60 * 60 * 1000
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  switch (range) {
    case 'all':
      return { lte: -1, gte: -1 }
    case 'day':
      return { lte: now, gte: now - day }
    case 'week':
      return { lte: now, gte: now - week }
    case 'month':
      return { lte: now, gte: now - month }
    case 'year':
      return { lte: now, gte: now - year }
  }
}

export function getActions(activity: Activity): dataComponents['schemas']['Action'][] {
  if (activity.actions.length === 1) {
    return activity.actions
  } else if (activity.actions) {
    return activity.actions.filter((t) => t.tag === activity.tag && t.type === activity.type)
  }
  return []
}

export function getTagType(action: dataComponents['schemas']['Action']): keyof TagTypeMap {
  return `${action.tag}-${action.type}` as keyof TagTypeMap
}

export function markdownToTxt(raw: string) {
  // remove images from markdown
  let str = raw?.replaceAll(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g, '')
  // remove html tags from markdown
  str = str?.replace(/(<([^>]+)>)/gi, ' ')
  // remove all the markdown headers
  str = str?.replace(/(#+\s)/gi, '')
  return str
}
