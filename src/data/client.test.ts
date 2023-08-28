import { it } from 'vitest'
import { client } from './client'

it.concurrent('get 5 activities by account', async ({ expect }) => {
  const res = await client().activities({ account: ['vitalik.eth'], limit: 5 })
  expect(res.results).toHaveLength(5)
})

it.skip.concurrent('get 5 activities by platform', async ({ expect }) => {
  const res = await client().activities({ account: [], platform: ['Lens'], limit: 5 })
  expect(res.results).toHaveLength(5)
})

it.concurrent('get 10 activities by account', async ({ expect }) => {
  const res = await client().activities({ account: ['vitalik.eth'], limit: 10 })
  expect(res.results).toHaveLength(10)
})

it.concurrent('get profile', async ({ expect }) => {
  const res = await client().profiles('vitalik.eth')
  expect(res.results).length.greaterThan(3)
})

it.concurrent('get activity by hash', async ({ expect }) => {
  const res = await client().activity('0xc7a4eb3c0549f5bca4785eff6b0dc1480cc2fc45b1c12967fae4a77fcdc1ddc8')
  expect(res.result?.actions).length.greaterThan(0)
})

it.concurrent('get activity by assets', async ({ expect }) => {
  const res = await client().assets('vitalik.eth', { limit: 5 })
  expect(res.results).toHaveLength(5)
})

it.concurrent('get mastodon activities', async ({ expect }) => {
  const res = await client().mastodonActivities('kel@toot.cafe', { limit: 5 })
  expect(res.results).toHaveLength(5)
})
