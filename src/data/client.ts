import createClient from 'openapi-fetch'
import { paths } from '../types/data'
import { ClientOptions } from '../types/utils'
import { DEFAULT_DATA_SERVER } from '../constants'
import { debug, fetchWithLog } from '../utils'

/**
 * Data client for interacting with the data server.
 */
export function client(opt: ClientOptions = {}) {
  if (!opt.baseUrl) opt.baseUrl = DEFAULT_DATA_SERVER

  const debugSearch = debug.extend('search')

  opt.fetch = fetchWithLog(debugSearch.extend('fetch'), opt.fetch)

  const client = createClient<paths>(opt)

  return {
    /**
     * Query activities.
     */
    async activities(
      query: paths['/data/v1/accounts/activities']['post']['requestBody']['content']['application/json'],
    ) {
      if (query.address.length === 0 && query.platform?.length === 1) {
        const { data, error } = await client.get('/data/v1/platforms/{platform}/activities', {
          params: {
            path: { platform: query.platform[0] },
            query: {
              action_limit: query.action_limit,
              cursor: query.cursor,
              direction: query.direction,
              limit: query.limit,
              success: query.success,
              timestamp: query.timestamp,
            },
          },
        })
        if (error || !data) throw error

        return data
      }

      const { data, error } = await client.post('/data/v1/accounts/activities', {
        body: query,
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Query a activity by hash.
     */
    async activity(hash: string) {
      const { data, error } = await client.get('/data/v1/activities/{hash}', { params: { path: { hash } } })
      if (error || !data) throw error

      return data
    },

    /**
     * Query profiles.
     */
    async profiles(
      address: string,
      query: paths['/data/v1/accounts/{address}/profiles']['get']['parameters']['query'] = {},
    ) {
      const { data, error } = await client.get('/data/v1/accounts/{address}/profiles', {
        params: {
          path: { address },
          query,
        },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Query assets.
     */
    async assets(
      address: string,
      query: paths['/data/v1/accounts/{address}/assets']['get']['parameters']['query'] = {},
    ) {
      const { data, error } = await client.get('/data/v1/accounts/{address}/assets', {
        params: {
          path: { address },
          query,
        },
      })
      if (error || !data) throw error

      return data
    },
  }
}
