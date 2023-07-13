import createClient from 'openapi-fetch'
import { paths } from '../types/data'
import { ClientOptions } from '../types/utils'
import { DEFAULT_DATA_SERVER } from '../constants'

/**
 * Data client for interacting with the data server.
 */
export function client(opt: ClientOptions = {}) {
  if (!opt.baseUrl) opt.baseUrl = DEFAULT_DATA_SERVER

  const client = createClient<paths>(opt)

  return {
    /**
     * Query activities.
     */
    async activities(query: paths['/notes']['post']['requestBody']['content']['application/json']) {
      const { data, error } = await client.post('/notes', {
        body: query,
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Query mastodon activities.
     */
    async mastodonActivities(address: string, query: paths['/mastodon/{address}']['get']['parameters']['query'] = {}) {
      // TODO: remove this after pregod has fixed the echo param bug
      const oldFetch = opt.fetch || fetch
      opt.fetch = async (url, init) => {
        if (/%40/.test(url.toString())) {
          url = url.toString().replace(/%40/g, '@')
        }
        return oldFetch(url, init)
      }
      const client = createClient<paths>(opt)

      const { data, error } = await client.get('/mastodon/{address}', {
        params: {
          path: { address },
          query,
        },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Query profiles.
     */
    async profiles(query: paths['/profiles']['post']['requestBody']['content']['application/json']) {
      const { data, error } = await client.post('/profiles', {
        body: query,
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Query assets.
     */
    async assets(address: string, query: paths['/assets/{address}']['get']['parameters']['query'] = {}) {
      const { data, error } = await client.get('/assets/{address}', {
        params: {
          path: { address },
          query,
        },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Query transactions.
     */
    async transaction(hash: string) {
      const { data, error } = await client.get('/tx/{hash}', { params: { path: { hash } } })
      if (error || !data) throw error

      return data
    },
  }
}
