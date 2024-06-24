import type { Action, Activity, SocialPost } from "@rss3/api-core";

import { handleMetadata } from "../../metadata/index.js";

export type Content = {
  author_url?: string;
  handle?: string;
  address?: string;
  profile_id?: string | number | null;
  title?: string;
  body?: string;
  media?: SocialPost["media"];
};

export type PostContent = Content & {
  target?: Content;
};

export function formatContent(activity: Activity) {
  const [action] = activity.actions ?? [];
  return action ? extractContent(activity, action) : undefined;
}

export function extractContent(
  activity: Activity,
  action: Action,
): PostContent | undefined {
  let content: PostContent | undefined;
  handleMetadata(action, {
    "social-post": (metadata) => {
      content = extractSocialPost(activity, action, metadata);
    },
    "social-comment": (metadata) => {
      content = extractSocialPost(activity, action, metadata);
    },
    "social-mint": (metadata) => {
      content = extractSocialPost(activity, action, metadata);
    },
    "social-share": (metadata) => {
      content = extractSocialPost(activity, action, metadata);
    },
    "social-revise": (metadata) => {
      content = extractSocialPost(activity, action, metadata);
    },
    "social-delete": (metadata) => {
      content = extractSocialPost(activity, action, metadata);
    },
  });
  return content;
}

/**
 * The special case for lens post, which will use the first sentence of the body as the title
 */
export function formatTitle(title?: string, body?: string) {
  if (!title) return title;

  const _title = title.replaceAll("…", "");

  return body?.startsWith(_title) ? undefined : _title;
}

export function checkTargetExist(target?: Content) {
  if (!target) return false;
  if (!!target.body || !!target.media || !!target.title) return true;
  return false;
}

function extractSocialPost(
  activity: Activity,
  action: Action,
  metadata: SocialPost,
): PostContent {
  const raw = metadata.target;
  const target = raw
    ? {
        author_url: raw.author_url,
        handle: raw.handle,
        address: action.to,
        profile_id: raw.profile_id,
        title: formatTitle(raw.title, raw.body),
        body: raw.body,
        media: raw.media,
      }
    : undefined;
  // remove the first media, which is the avatar of the author
  // this case only happens in mastodon
  if (target?.media && activity.network?.toLowerCase() === "mastodon") {
    target.media = target.media.slice(1);
  }
  const res = {
    author_url: metadata.author_url,
    handle: metadata.handle,
    address: action.from,
    profile_id: metadata.profile_id,
    title: formatTitle(metadata.title, metadata.body),
    body: metadata.body,
    media: metadata.media,
    target: target,
  };
  // the same as the target
  if (res.media && activity.network?.toLowerCase() === "mastodon") {
    res.media = res.media.slice(1);
  }
  return res;
}
