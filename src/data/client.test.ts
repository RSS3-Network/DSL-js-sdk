import { it } from 'vitest'
import { client } from './client'

it.concurrent('get activities by address', async ({ expect }) => {
  const res = await client().activities({ account: ['vitalik.eth'], limit: 5 })
  expect(res.data).toHaveLength(2)
})

it.concurrent('get profile', async ({ expect }) => {
  const res = await client().profiles('vitalik.eth')
  expect(res.data).length.greaterThan(3)
})

it.concurrent(
  'get mastodon activities',
  async ({ expect }) => {
    const res = await client().mastodonActivities('kel@toot.cafe')
    expect(res.data).toHaveLength(10)
  },
  30000,
)
2
it.concurrent('get activity by id', async ({ expect }) => {
  const res = await client().activity('0xf53d8da686294863ecc9991530e2a6ad1782e564f9b50f4c569937e626bf3d28')
  expect(res.data?.actions).length.greaterThan(0)
})
