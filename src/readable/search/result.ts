import { components } from '../../types/search-external.js'
import { isAddress, isSupportedNS } from '../address/index.js'

export function extractHighlight(data: components['schemas']['ActivitiesExDTO']) {
  const { highlighting } = data
  if (!highlighting) return {}
  return highlighting
}

export function extractExtension(data: components['schemas']['FeedRankDoc4ExternalDTO']) {
  const action = extractAction(data)
  if (!action) return {}
  const { search_extension } = action
  if (!search_extension) return {}
  search_extension.media = search_extension.media?.filter(Boolean)
  return search_extension
}

export function extractAction(data: components['schemas']['FeedRankDoc4ExternalDTO']) {
  if (!data.actions || data.actions.length < 1) {
    return null
  }
  return data.actions[0]
}

export function extractAuthor(data: components['schemas']['FeedRankDoc4ExternalDTO']) {
  const action = extractAction(data)
  const info = extractExtension(data)
  const raw = info.author || action?.address_from
  const list = raw?.split(' ').sort((a) => (isAddress(a) || isSupportedNS(a) ? -1 : 1))
  if (list && list.length > 0) {
    return list[0]
  } else {
    return ''
  }
}
