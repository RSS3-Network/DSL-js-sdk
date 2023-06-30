import createClient from 'openapi-fetch'

export type ClientOptions = Parameters<typeof createClient>[0]
