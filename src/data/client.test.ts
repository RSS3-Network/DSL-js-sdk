import { it } from 'vitest'
import { client } from './client'

it.concurrent('get 5 activities by address', async ({ expect }) => {
  const res = await client().activities({ address: ['vitalik.eth'], limit: 5 })
  expect(res.result).toHaveLength(5)
})

it.concurrent('get 10 activities by address', async ({ expect }) => {
  const res = await client().activities({ address: ['vitalik.eth'], limit: 10 })
  expect(res.result).toHaveLength(10)
})

it.concurrent(
  'get mastodon activities',
  async ({ expect }) => {
    const res = await client().mastodonActivities('kel@toot.cafe')
    expect(res.result).toHaveLength(40)
  },
  30000,
)
