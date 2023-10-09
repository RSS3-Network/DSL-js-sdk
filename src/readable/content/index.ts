import { Activity } from '../../data/client'
import { handleMetadata } from '../../metadata'
import { components } from '../../types/data'
import { getActions } from '../../utils'

export type Content = {
  author_url?: string
  handle?: string
  profile_id?: string
  title?: string
  body?: string
  media?: components['schemas']['Media'][]
}

export type PostContent = Content & {
  target?: Content
}

export function handleContent(activity: Activity) {
  const action = getActions(activity)
  if (action.length > 0) {
    return extractContent(action[0])
  }
  return undefined
}

export function extractContent(action: components['schemas']['Action']): PostContent | undefined {
  let content: PostContent | undefined
  handleMetadata(action, {
    'social-post': (m) => {
      content = extractSocialPost(m)
    },
    'social-comment': (m) => {
      content = extractSocialPost(m)
    },
    'social-mint': (m) => {
      content = extractSocialPost(m)
    },
    'social-share': (m) => {
      content = extractSocialPost(m)
    },
    'social-revise': (m) => {
      content = extractSocialPost(m)
    },
    'social-delete': (m) => {
      content = extractSocialPost(m)
    },
    'governance-propose': (m) => {
      content = extractGovernanceProposal(m)
    },
    'governance-vote': (m) => {
      content = extractGovernanceVote(m)
    },
  })
  return content
}

function extractSocialPost(metadata: components['schemas']['SocialPost']): PostContent {
  const raw = metadata.target
  const target = raw
    ? {
        author_url: raw.author_url,
        handle: raw.handle,
        profile_id: raw.profile_id,
        title: raw.title,
        body: raw.body,
        media: raw.media,
      }
    : undefined
  return {
    author_url: metadata.author_url,
    handle: metadata.handle,
    profile_id: metadata.profile_id,
    title: metadata.title,
    body: metadata.body,
    media: metadata.media,
    target: target,
  }
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
