import createClient from 'openapi-fetch'
import { paths } from '../types/data'
import { ClientOptions } from '../types/utils'
import { DEFAULT_DATA_SERVER } from '../constants'

export function client(
  opt: ClientOptions = {
    baseUrl: DEFAULT_DATA_SERVER,
  },
) {
  const client = createClient<paths>(opt)

  return {
    async notes(query: paths['/notes']['post']['requestBody']['content']['application/json']) {
      const { data, error } = await client.post('/notes', {
        body: query,
      })
      if (error || !data) throw error

      return data
    },

    async transaction(hash: string) {
      const { data, error } = await client.get('/tx/{hash}', { params: { path: { hash } } })
      if (error || !data) throw error

      return data
    },
  }
}
