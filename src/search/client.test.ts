import { it } from 'vitest'
import { client } from './client'

it.concurrent('get suggestions', async ({ expect }) => {
  const res = await client().suggestions({ keyword: 'vitalik', limit: 5 })
  expect(res.data).toHaveLength(5)
})

it.concurrent('get activities', async ({ expect }) => {
  const res = await client().activities({ keyword: 'vitalik', offset: 1, limit: 5 })
  expect(res.data?.docs).toHaveLength(5)
})

it.concurrent('get activity', async ({ expect }) => {
  const { data } = await client().activities({ keyword: 'vitalik', limit: 5 })

  if (data?.docs && data.docs[0].id) {
    const activity = await client().activity(data.docs[0].id)
    expect(activity.data?.id).toBe(data.docs[0].id)
  }
})

it.concurrent('get wiki', async ({ expect }) => {
  const res = await client().wiki({ keyword: 'eth', size: 5, page: 1 })
  expect(res.docs).toHaveLength(5)
})

it.concurrent('get related addresses', async ({ expect }) => {
  const res = await client().relatedAddresses({ keyword: 'vitalik' })
  expect(res.data).toHaveLength(6)
})

it.concurrent('get nft', async ({ expect }) => {
  const res = await client().nft({ keyword: 'azuki', offset: 0, limit: 5 })
  expect(res.data.docs).toHaveLength(5)
})

it.concurrent('get nft images', async ({ expect }) => {
  const res = await client().nftImages({
    contractAddress: '0xeaa708c29ffce22db864385f0c6509907af45c03',
    page: 1,
    size: 5,
  })
  expect(res.images).toHaveLength(5)
})

it.concurrent('get dapp', async ({ expect }) => {
  const res = await client().dapp({ keyword: 'swap', offset: 1, limit: 5 })
  expect(res.data?.docs).toHaveLength(5)
})

it.concurrent('get today in history', async ({ expect }) => {
  const res = await client().todayInHistory({
    month_day: '09-15',
  })
  expect(res.length).toBeGreaterThan(0)
})
