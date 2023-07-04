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
     * Query feeds.
     */
    async feeds(query: paths['/notes']['post']['requestBody']['content']['application/json']) {
      const { data, error } = await client.post('/notes', {
        body: query,
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
    async assets(query: paths['/assets/{address}']['get']['parameters']) {
      const { data, error } = await client.get('/assets/{address}', {
        params: query,
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
