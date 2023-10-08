import { it } from 'vitest'
import { client } from './client'

it.concurrent('get suggestions', async ({ expect }) => {
  const { data } = await client().suggestions({ keyword: 'vitalik', limit: 5 })
  expect(data).toHaveLength(5)
})

it.concurrent('get activities', async ({ expect }) => {
  const res = await client().activities({ keyword: 'vitalik', offset: 1, limit: 5 })
  expect(res.data?.docs).toHaveLength(5)
})

it.concurrent('get activity', async ({ expect }) => {
  const { data } = await client().activities({ keyword: 'vitalik', limit: 5 })

  if (!data?.docs) throw 'no docs'

  const docs = data.docs

  if (docs && docs.length > 0 && docs[0].id) {
    const { data: activity } = await client().activity(docs[0].id)
    expect(activity?.id).toBe(docs[0].id)
  }
})

it.only.concurrent('get nft', async ({ expect }) => {
  const res = await client().nft({ keyword: 'test', size: 5, page: 1 })
  // TODO: fix this
  expect(res.collections).toHaveLength(0)
})

it.concurrent('get wiki', async ({ expect }) => {
  const res = await client().wiki({ keyword: 'eth', page: 5, size: 1 })
  expect(res.docs).toHaveLength(1)
})

it.concurrent('get related addresses', async ({ expect }) => {
  const res = await client().relatedAddresses({ keyword: 'vitalik' })
  expect(res.data).toHaveLength(6)
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

it.concurrent('get nft details', async ({ expect }) => {
  const res = await client().nftImage({
    contractAddress: '0xeaa708c29ffce22db864385f0c6509907af45c03',
    network: 'ETHEREUM',
    tokenId: '1',
  })
  expect(res.id).toBe('43978960')
})

it.concurrent('get today in history', async ({ expect }) => {
  const res = await client().todayInHistory({
    month_day: '09-15',
  })
  expect(res.length).toBeGreaterThan(0)
})
