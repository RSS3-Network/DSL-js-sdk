import createClient from 'openapi-fetch'
import { paths, operations } from '../types/search-external'
import { paths as pathsIT, operations as operationsIT } from '../types/search-internal'
import { ClientOptions } from '../types/utils'
import { DEFAULT_RSS3_NET } from '../constants'
import { fetchWithLog, debug, querySerializer } from '../utils'

/**
 * Search client for interacting with the search server.
 */
export function client(opt: ClientOptions = {}) {
  if (!opt.baseUrl) opt.baseUrl = DEFAULT_RSS3_NET + '/search'
  if (!opt.querySerializer) opt.querySerializer = querySerializer

  const debugSearch = debug.extend('search')

  opt.fetch = fetchWithLog(debugSearch.extend('fetch'), opt.fetch)

  const client = createClient<paths>(opt)
  const clientIT = createClient<pathsIT>(opt)

  return {
    async spellCheck(query: operations['spellCorrectionv2']['parameters']['query']) {
      const { data, error } = await client.GET('/suggestions/spellcheck', {
        params: { query },
      })

      if (error || !data) throw error

      return data
    },

    /**
     * Suggestions for a keyword.
     */
    async suggestions(query: operations['autoCompleteV2']['parameters']['query']) {
      const { data, error } = await client.GET('/suggestions/autocomplete', {
        params: { query },
      })

      if (error || !data) throw error

      return data
    },

    /**
     * Get related addresses of a keyword.
     */
    async relatedAddresses(query: operations['relatedAddresses']['parameters']['query']) {
      const { data, error } = await client.GET('/suggestions/related-addresses', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Search activities by keyword and filters.
     */
    async activities(query: operations['searchFeedV2']['parameters']['query']) {
      const { data, error } = await client.GET('/activities', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Get the details of an activity.
     */
    async activity(id: string) {
      const { data, error } = await client.GET('/activities/{id}', {
        params: { path: { id } },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Search nft.
     */
    async nft(query: operationsIT['searchNftCollectionV2']['requestBody']['content']['application/json']) {
      const { data, error } = await clientIT.POST('/api/nft/v2/searchNftCollection', {
        body: query,
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Search wiki.
     */
    async wiki(query: operationsIT['search']['parameters']['query']) {
      const { data, error } = await clientIT.GET('/api/wiki/search', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Get images of a nft.
     */
    async nftImages(query: operationsIT['nftImages']['parameters']['query']) {
      const { data, error } = await clientIT.GET('/api/nft/nftImages', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Details of a nft.
     */
    async nftImage(query: operationsIT['nftImageDetail']['parameters']['query']) {
      const { data, error } = await clientIT.GET('/api/nft/nftImageDetail', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Search dapp.
     */
    async dapp(query: operations['searchv2']['parameters']['query']) {
      const { data, error } = await client.GET('/dapps', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },

    /**
     * Get today in history.
     */
    async todayInHistory(query: operationsIT['todayInHistory']['parameters']['query']) {
      const { data, error } = await clientIT.GET('/api/news/today-in-history', {
        params: { query },
      })
      if (error || !data) throw error

      return data
    },
  }
}
