import createClient from 'openapi-fetch'
import { paths, operations } from '../types/search'
import { ClientOptions } from '../types/utils'
import { DEFAULT_SEARCH_SERVER } from '../constants'
import { fetchWithLog, debug } from '../utils'

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
    async suggestions(query: operations['autoCompleteV2']['parameters']['query']) {
      const { data, error } = await client.get('/suggestions/autocomplete', {
        params: { query },
      })

      if (error || !data) throw error

      return data
    },

    /**
     * Search activities by keyword and filters.
     */
    async activities(query: operations['searchFeedV2_1']['parameters']['query']) {
      const { data, error } = await client.get('/activities', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Get the details of an activity.
     */
    async activity(id: string) {
      const { data, error } = await client.get('/activities/{id}', {
        params: { path: { id } },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Get related addresses of a keyword.
     */
    async relatedAddresses(query: operations['relatedAddresses']['parameters']['query']) {
      const { data, error } = await client.get('/suggestions/related-addresses', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Search nft.
     */
    async nft(query: operations['searchNftCollectionV2']['requestBody']['content']['application/json']) {
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
      const { data, error } = await client.get('/api/wiki/search', {
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
     * Search dapp.
     */
    async dapp(query: operations['searchv2']['parameters']['query']) {
      const { data, error } = await client.get('/dapps', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Get today in history.
     */
    async todayInHistory(query: operations['todayInHistory']['parameters']['query']) {
      const { data, error } = await client.get('/api/news/today-in-history', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },
  }
}
