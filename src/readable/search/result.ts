import { components } from '../../types/search-external.js'
import { isAddress, isSupportedNS } from '../address/index.js'
import { PostContent } from '../content/index.js'

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

export function extractAuthorFromExtension(data: components['schemas']['FeedRankDoc4ExternalDTO']) {
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

export function extractMetadata(data: components['schemas']['FeedRankDoc4ExternalDetailDTO']) {
  const actions = data.actions
  if (!actions || actions?.length < 1) return {}
  const metadata = actions[0].metadata
  return metadata
}

export function extractAuthorFromStringArray(data?: string[]) {
  if (!data || data.length < 1) return undefined
  const list = data.sort((a) => (isAddress(a) || isSupportedNS(a) ? -1 : 1))
  const res = list.find((a) => isAddress(a) || isSupportedNS(a))
  return res
}

export function extractMetadataContent(data: components['schemas']['FeedRankDoc4ExternalDetailDTO']): PostContent {
  const action = extractAction(data)
  const metadata = extractMetadata(data)
  if (!metadata) return {}
  const raw = metadata.target
  const target = raw
    ? {
        author_url: undefined,
        handle: extractAuthorFromStringArray(raw.author) || '',
        address: action?.address_to,
        profile_id: raw.profile_id,
        title: raw.title,
        body: raw.body || raw.summary,
        media: raw.media,
      }
    : undefined
  // remove the first media, which is the avatar of the author
  // this case only happens in mastodon
  if (target && target.media && data.network?.toLowerCase() === 'mastodon') {
    target.media = target.media.slice(1)
  }
  const res = {
    author_url: undefined,
    handle: extractAuthorFromStringArray(metadata.author) || action?.address_from || '',
    address: action?.address_from,
    profile_id: metadata.profile_id,
    title: metadata.title,
    body: metadata.body || metadata.summary,
    media: metadata.media,
    target: target,
  }
  // the same as the target
  if (res.media && data.network?.toLowerCase() === 'mastodon') {
    res.media = res.media.slice(1)
  }
  return res
}
