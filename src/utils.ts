import { components } from './types/search-internal'
import Debug from 'debug'

export const debug = Debug('@rss3/js-sdk')

export function fetchWithLog(logger: typeof debug, f: typeof fetch = fetch): typeof fetch {
  return (input, init) => {
    if (init?.body) logger('%s %s %s', init?.method, input, init?.body)
    else logger('%s %s', init?.method, input)
    return f(input, init)
  }
}

export type TimeRange = 'all' | 'day' | 'week' | 'month' | 'year'

export function timeRange(range: TimeRange = 'all'): components['schemas']['FeedSearchReqDTO']['between'] {
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
