import createClient from 'openapi-fetch'
import { paths } from '../types/search'
import { ClientOptions } from '../types/utils'
import { guardError } from '../utils'
import { DEFAULT_SEARCH_SERVER } from '../constants'

type Client = ReturnType<typeof createClient<paths>>

export function client(
  opt: ClientOptions = {
    baseUrl: DEFAULT_SEARCH_SERVER,
  },
) {
  const client = createClient<paths>(opt)

  return {
    feed: feed(client),
  }
}

function feed(client: Client) {
  return async (query: paths['/api/Feed/v2/search']['post']['requestBody']['content']['application/json']) => {
    const { data, error } = await client.post('/api/Feed/v2/search', {
      body: query,
    })

    guardError(error)

    return data
  }
}
