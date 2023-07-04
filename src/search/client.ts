import createClient from 'openapi-fetch'
import { paths } from '../types/search'
import { ClientOptions } from '../types/utils'
import { DEFAULT_SEARCH_SERVER } from '../constants'

export function client(
  opt: ClientOptions = {
    baseUrl: DEFAULT_SEARCH_SERVER,
  },
) {
  const client = createClient<paths>(opt)

  return {
    async feed(query: paths['/api/Feed/v2/search']['post']['requestBody']['content']['application/json']) {
      if (!query.platform) query.platform = ['ALL']
      if (!query.network) query.network = ['ALL']
      if (!query.sort) query.sort = 'NONE'
      if (!query.between) query.between = { lte: -1, gte: -1 }

      const { data, error } = await client.post('/api/Feed/v2/search', {
        body: query,
      })
      if (error || !data) throw error

      return data
    },
  }
}
