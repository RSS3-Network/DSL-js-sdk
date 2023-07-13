import createClient from 'openapi-fetch'
import { paths, operations, components } from '../types/search'
import { ClientOptions } from '../types/utils'
import { DEFAULT_SEARCH_SERVER } from '../constants'
import { timeRange, fetchWithLog, debug } from '../utils'

/**
 * Search client for interacting with the search server.
 */
export function client(opt: ClientOptions = {}) {
  if (!opt.baseUrl) opt.baseUrl = DEFAULT_SEARCH_SERVER

  const debugSearch = debug.extend('search')

  opt.fetch = fetchWithLog(debugSearch.extend('fetch'), opt.fetch)

  const client = createClient<paths>(opt)

  return {
    /**
     * Suggestions for a keyword.
     */
    async suggestions(query: operations['autoComplete']['parameters']['query']) {
      const { data, error } = await client.get('/v1/suggester/autoComplete', {
        params: { query },
      })

      if (error || !data) throw error

      return data
    },

    /**
     * Search activities by keyword and filters.
     */
    async activities(query: components['schemas']['FeedSearchReqDTO']) {
      if (!query.platform) query.platform = ['ALL']
      if (!query.network) query.network = ['ALL']
      if (!query.sort) query.sort = 'NONE'
      if (!query.between) query.between = timeRange()

      const { data, error } = await client.post('/api/Feed/v2/search', {
        body: query,
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Recommendations for activities.
     */
    async recommendations(query: operations['activityRec']['parameters']['query']) {
      const { data, error } = await client.get('/api/search/activityRec', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Get the details of an activity.
     */
    async details(query: operations['detail']['parameters']['query']) {
      const { data, error } = await client.get('/api/search/detail', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Search nft.
     */
    async nft(query: components['schemas']['CollectionSearchReqDTO']) {
      if (!query.sortType) query.sortType = 'NONE'
      if (!query.networks) query.networks = ['ALL']

      const { data, error } = await client.post('/api/nft/v2/searchNftCollection', {
        body: query,
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Search wiki.
     */
    async wiki(query: operations['search']['parameters']['query']) {
      if (!query.page) query.page = 1
      if (!query.size) query.size = 5

      const { data, error } = await client.get('/v1/wiki/search', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Get images of a nft.
     */
    async nftImages(query: operations['nftImages']['parameters']['query']) {
      const { data, error } = await client.get('/api/nft/nftImages', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Details of a nft.
     */
    async nftImageDetails(query: operations['nftImageDetail']['parameters']['query']) {
      const { data, error } = await client.get('/api/nft/nftImageDetail', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Search dapp.
     */
    async dapp(query: operations['search_4']['parameters']['query']) {
      const { data, error } = await client.get('/api/dapp/search', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },
  }
}
