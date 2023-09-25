import createClient from 'openapi-fetch'
import { paths } from '../types/data'
import { ClientOptions } from '../types/utils'
import { DEFAULT_RSS3_MAINNET } from '../constants'
import { debug, fetchWithLog } from '../utils'

/**
 * Data client for interacting with the data server.
 */
export function client(opt: ClientOptions = {}) {
  if (!opt.baseUrl) opt.baseUrl = DEFAULT_RSS3_MAINNET + '/data'

  const debugSearch = debug.extend('search')

  opt.fetch = fetchWithLog(debugSearch.extend('fetch'), opt.fetch)

  const client = createClient<paths>(opt)

  return {
    /**
     * Query transactions.
     */
    async activity(id: string) {
      const { data, error } = await client.get('/activities/{id}', { params: { path: { id } } })
      if (error || !data) throw error

      return data
    },

    /**
     * Query activities.
     */
    async activities(query: paths['/accounts/activities']['post']['requestBody']['content']['application/json']) {
      const { data, error } = await client.post('/accounts/activities', {
        body: query,
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Query mastodon activities.
     */
    async mastodonActivities(
      account: string,
      query: paths['/mastodon/{account}/activities']['get']['parameters']['query'] = {},
    ) {
      const client = createClient<paths>(opt)

      const { data, error } = await client.get('/mastodon/{account}/activities', {
        params: {
          path: { account },
          query,
        },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Query profiles.
     */
    async profiles(account: string, query: paths['/accounts/{account}/profiles']['get']['parameters']['query'] = {}) {
      const { data, error } = await client.get('/accounts/{account}/profiles', {
        params: {
          path: { account },
          query,
        },
      })
      if (error || !data) throw error

      return data
    },
  }
}
