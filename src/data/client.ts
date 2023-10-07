import createClient from 'openapi-fetch'
import { components, paths, operations } from '../types/data'
import { ClientOptions } from '../types/utils'
import { DEFAULT_RSS3_NET } from '../constants'
import { Res, debug, fetchWithLog } from '../utils'

export type Activity = components['schemas']['Activity']
export type Profile = components['schemas']['Profile']
export type TotalPage = components['schemas']['MetaTotalPages']
export type Cursor = components['schemas']['MetaCursor']

/**
 * Data client for interacting with the data server.
 */
export function client(opt: ClientOptions = {}) {
  if (!opt.baseUrl) opt.baseUrl = DEFAULT_RSS3_NET + '/data'

  const debugSearch = debug.extend('search')

  opt.fetch = fetchWithLog(debugSearch.extend('fetch'), opt.fetch)

  const client = createClient<paths>(opt)

  return {
    /**
     * Query transactions.
     */
    async activity(id: string): Res<Activity, TotalPage> {
      const { data, error } = await client.get('/activities/{id}', { params: { path: { id } } })
      if (error || !data) throw error

      if (!data.data || !data.meta) return data as never

      return {
        data: data.data,
        meta: data.meta,
      }
    },

    /**
     * Query activities.
     */
    async activities(
      account: string,
      query: operations['GetAccountActivities']['parameters']['query'],
    ): Res<Activity[], Cursor> {
      const { data, error } = await client.get('/accounts/{account}/activities', {
        params: {
          path: { account },
          query,
        },
      })
      if (error || !data) throw error

      if (!data.meta) return data as never

      const list = data.data.map((a) => a as Activity)

      return {
        data: list,
        meta: data.meta,
      }
    },

    /**
     * Query activities by multiple accounts.
     */
    async activitiesBatch(query: components['schemas']['AccountsActivitiesRequest']): Res<Activity[], Cursor> {
      const { data, error } = await client.post('/accounts/activities', {
        body: query,
      })
      if (error || !data) throw error

      if (!data.meta) return data as never

      const list = data.data.map((a) => a as Activity)

      return {
        data: list,
        meta: data.meta,
      }
    },

    /**
     * Query mastodon activities.
     */
    async mastodonActivities(
      account: string,
      query: operations['GetMastodonActivities']['parameters']['query'] = {},
    ): Res<Activity[], Cursor> {
      const client = createClient<paths>(opt)

      const { data, error } = await client.get('/mastodon/{account}/activities', {
        params: {
          path: { account },
          query,
        },
      })
      if (error || !data) throw error

      if (!data.meta) return data as never

      const list = data.data.map((a) => a as Activity)

      return {
        data: list,
        meta: data.meta,
      }
    },

    /**
     * Query profiles.
     */
    async profiles(
      account: string,
      query: operations['GetAccountProfiles']['parameters']['query'] = {},
    ): Res<Profile[], null> {
      const { data, error } = await client.get('/accounts/{account}/profiles', {
        params: {
          path: { account },
          query,
        },
      })
      if (error || !data) throw error

      const list = data.data.map((a) => a as Profile)

      return {
        data: list,
        meta: null,
      }
    },

    /**
     * Query mastodon profiles.
     */
    async mastodonProfiles(account: string): Res<Profile[], null> {
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
    },
  }
}
