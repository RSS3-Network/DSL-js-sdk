import createClient from 'openapi-fetch'
import { components, paths, operations } from '../types/data.js'
import { ClientOptions } from '../types/utils.js'
import { DEFAULT_RSS3_NET } from '../constants.js'
import { Res, debug, fetchWithLog, querySerializer } from '../utils.js'

export type Activity = components['schemas']['Activity']
export type Profile = components['schemas']['Profile']
export type Tag = components['schemas']['Tag']
export type Type = components['schemas']['Type']
export type Direction = components['schemas']['Direction']
export type Platform = components['schemas']['Platform']
export type Network = components['schemas']['Network']
export type TotalPage = components['schemas']['MetaTotalPages']
export type Cursor = components['schemas']['MetaCursor']
export type Media = components['schemas']['Media']
export type Error = components['schemas']['Error']

/**
 * Data client for interacting with the data server.
 */
export function client(opt: ClientOptions = {}) {
  if (!opt.baseUrl) opt.baseUrl = DEFAULT_RSS3_NET + '/data'
  if (!opt.querySerializer) opt.querySerializer = querySerializer

  opt.fetch = fetchWithLog(debug.extend('data').extend('fetch'), opt.fetch)

  const client = createClient<paths>(opt)

  /**
   * Query transactions.
   */
  async function activity(
    id: string,
    query?: operations['GetActivity']['parameters']['query'],
  ): Res<Activity, TotalPage> {
    const { data, error } = await client.GET('/activities/{id}', { params: { path: { id }, query } })
    if (error || !data) throw error

    if (!data.data) return data as never

    if (!data.meta) return { data: data.data }

    return {
      data: data.data,
      meta: data.meta,
      nextPage: () => {
        if (!query) query = {}
        return activity(id, { ...query, action_page: (query.action_page || 0) + 1 })
      },
    }
  }

  /**
   * Query activities.
   */
  async function activities(
    account: string,
    query?: operations['GetAccountActivities']['parameters']['query'],
  ): Res<Activity[], Cursor> {
    const { data, error } = await client.GET('/accounts/{account}/activities', {
      params: {
        path: { account },
        query,
      },
    })
    if (error || !data) throw error

    const list = data.data?.filter((a): a is Activity => !!a) || []

    if (!data.meta) return { data: list }

    return {
      data: list,
      meta: data.meta,
      nextPage: () => {
        if (!data.meta) return {} as never
        return activities(account, { ...query, cursor: data.meta.cursor })
      },
    }
  }

  /**
   * Query activities by multiple accounts.
   */
  async function activitiesBatch(query: components['schemas']['AccountsActivitiesRequest']): Res<Activity[], Cursor> {
    const { data, error } = await client.POST('/accounts/activities', {
      body: query,
    })
    if (error || !data) throw error

    const list = data.data?.filter((a): a is Activity => !!a) || []

    if (!data.meta) return { data: list }

    return {
      data: list,
      meta: data.meta,
      nextPage: () => {
        if (!data.meta) return {} as never
        return activitiesBatch({ ...query, cursor: data.meta.cursor })
      },
    }
  }

  /**
   * Query mastodon activities.
   */
  async function mastodonActivities(
    account: string,
    query?: operations['GetMastodonActivities']['parameters']['query'],
  ): Res<Activity[], Cursor> {
    const client = createClient<paths>(opt)

    const { data, error } = await client.GET('/mastodon/{account}/activities', {
      params: {
        path: { account },
        query,
      },
    })
    if (error || !data) throw error

    if (!data.meta) return data as never

    const list = data.data?.filter((a): a is Activity => !!a) || []

    return {
      data: list,
      meta: data.meta,
    }
  }

  /**
   * Query profiles.
   */
  async function profiles(
    account: string,
    query?: operations['GetAccountProfiles']['parameters']['query'],
  ): Res<Profile[], null> {
    const { data, error } = await client.GET('/accounts/{account}/profiles', {
      params: {
        path: { account },
        query,
      },
    })
    if (error || !data) throw error

    const list = data.data?.filter((a): a is Profile => !!a) || []

    return {
      data: list,
      meta: null,
    }
  }

  /**
   * Query mastodon profiles.
   */
  async function mastodonProfiles(account: string): Res<Profile[], null> {
    const [handle, domain] = account.split('@')

    const data = await fetch(`https://${domain}/api/v2/search?q=${handle}&resolve=false&limit=1`)
      .then((res) => res.json())
      .catch(() => {
        return { data: [] }
      })

    if (data.accounts.length === 0) {
      return { data: [], meta: null }
    } else {
      const profile = data.accounts[0]
      return {
        data: [
          {
            address: `${profile.username}@${domain}`,
            bio: profile.note,
            handle: `${profile.username}@${domain}`,
            name: profile.username,
            network: 'Mastodon',
            platform: 'Mastodon',
            profileURI: [profile.avatar],
            url: profile.url,
          },
        ],
        meta: null,
      }
    }
  }

  /**
   * Query platform activities.
   */
  async function platformActivities(
    platform: components['schemas']['Platform'],
    query?: operations['GetPlatformActivities']['parameters']['query'],
  ): Res<Activity[], Cursor> {
    const { data, error } = await client.GET('/platforms/{platform}/activities', {
      params: {
        path: { platform },
        query,
      },
    })
    if (error || !data) throw error

    const list = data.data?.filter((a): a is Activity => !!a) || []

    if (!data.meta) return { data: list }

    return {
      data: list,
      meta: data.meta,
    }
  }

  return {
    activity,
    activities,
    activitiesBatch,
    mastodonActivities,
    profiles,
    mastodonProfiles,
    platformActivities,
  }
}
