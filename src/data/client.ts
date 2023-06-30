import createClient from 'openapi-fetch'
import { paths } from '../types/data'
import { ClientOptions } from '../types/utils'
import { guardError } from '../utils'
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

      guardError(error)

      return data
    },
  }
}
