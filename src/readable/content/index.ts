import { Activity } from '../../data/client.js'
import { handleMetadata } from '../../metadata/index.js'
import { components } from '../../types/data.js'
import { getActions } from '../../utils.js'

export type Content = {
  author_url?: string
  handle?: string
  profile_id?: string | number | null
  title?: string
  body?: string
  media?: components['schemas']['Media'][]
}

export type PostContent = Content & {
  target?: Content
}

export function formatContent(activity: Activity) {
  const action = getActions(activity)
  if (action.length > 0) {
    return extractContent(activity, action[0])
  }
  return undefined
}

export function extractContent(activity: Activity, action: components['schemas']['Action']): PostContent | undefined {
  let content: PostContent | undefined
  handleMetadata(action, {
    'social-post': (metadata) => {
      content = extractSocialPost(activity, metadata)
    },
    'social-comment': (metadata) => {
      content = extractSocialPost(activity, metadata)
    },
    'social-mint': (metadata) => {
      content = extractSocialPost(activity, metadata)
    },
    'social-share': (metadata) => {
      content = extractSocialPost(activity, metadata)
    },
    'social-revise': (metadata) => {
      content = extractSocialPost(activity, metadata)
    },
    'social-delete': (metadata) => {
      content = extractSocialPost(activity, metadata)
    },
    'governance-propose': (metadata) => {
      content = extractGovernanceProposal(metadata)
    },
    'governance-vote': (metadata) => {
      content = extractGovernanceVote(metadata)
    },
  })
  return content
}

/**
 * The special case for lens post, which will use the first sentence of the body as the title
 */
export function formatTitle(title?: string, body?: string) {
  if (!title) return title
  title = title.replaceAll('…', '')
  if (body?.startsWith(title)) return undefined
  return title
}

export function checkTargetExist(target?: Content) {
  if (!target) return false
  if (!!target.body || !!target.media || !!target.title) return true
  return false
}

function extractSocialPost(activity: Activity, metadata: components['schemas']['SocialPost']): PostContent {
  let target = metadata.target
  target = target
    ? {
        author_url: target.author_url,
        handle: target.handle,
        profile_id: target.profile_id,
        title: formatTitle(target.title, target.body),
        body: target.body,
        media: target.media,
      }
    : undefined
  // remove the first media, which is the avatar of the author
  // this case only happens in mastodon
  if (target && target.media && activity.network.toLowerCase() === 'mastodon') {
    target.media = target.media.slice(1)
  }
  const res = {
    author_url: metadata.author_url,
    handle: metadata.handle,
    profile_id: metadata.profile_id,
    title: formatTitle(metadata.title, metadata.body),
    body: metadata.body,
    media: metadata.media,
    target: target,
  }
  // the same as the target
  if (res.media && activity.network.toLowerCase() === 'mastodon') {
    res.media = res.media.slice(1)
  }
  return res
}

function extractGovernanceProposal(metadata: components['schemas']['GovernanceProposal']) {
  return {
    title: metadata.title,
    body: metadata.body,
  }
}

function extractGovernanceVote(metadata: components['schemas']['GovernanceVote']) {
  return {
    title: metadata.proposal?.title,
    body: metadata.proposal?.body,
  }
}
