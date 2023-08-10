import { it } from 'vitest'
import { client } from './client'

it.concurrent('get suggestions', async ({ expect }) => {
  const res = await client().suggestions({ keyword: 'vitalik', count: 5 })
  expect(res).toHaveLength(5)
})

it.concurrent('get activities', async ({ expect }) => {
  const res = await client().activities({ keyword: 'vitalik', offset: 1, limit: 5 })
  expect(res.docs).toHaveLength(5)
})

it.concurrent('get activity', async ({ expect }) => {
  const { docs } = await client().activities({ keyword: 'vitalik', limit: 5 })

  if (docs && docs.length > 0 && docs[0].id) {
    const activity = await client().activity(docs[0].id)
    expect(activity.id).toBe(docs[0].id)
  }
})

it.concurrent('get nft', async ({ expect }) => {
  const res = await client().nft({ keyword: 'azuki', offset: 1, limit: 5 })
  expect(res.docs).toHaveLength(5)
})

it.concurrent('get wiki', async ({ expect }) => {
  const res = await client().wiki({ keyword: 'eth', limit: 5 })
  expect(res.docs).toHaveLength(5)
})

it.concurrent('get related addresses', async ({ expect }) => {
  const res = await client().relatedAddresses({ keyword: 'vitalik' })
  expect(res).toHaveLength(6)
})

it.concurrent('get nft images', async ({ expect }) => {
  const res = await client().nftImages({
    contract_address: '0xeaa708c29ffce22db864385f0c6509907af45c03',
    offset: 1,
    limit: 5,
  })
  expect(res.images).toHaveLength(5)
})

it.concurrent('get dapp', async ({ expect }) => {
  const res = await client().dapp({ keyword: 'swap', offset: 1, limit: 5 })
  expect(res.docs).toHaveLength(5)
})

it.concurrent('get nft details', async ({ expect }) => {
  const res = await client().nftImage({
    contract_address: '0xeaa708c29ffce22db864385f0c6509907af45c03',
    network: 'ETHEREUM',
    token_id: '1',
  })
  expect(res.id).toBe('43978960')
})

it.concurrent('get today in history', async ({ expect }) => {
  const res = await client().todayInHistory({
    monthDay: '09-15',
  })
  expect(res).toHaveLength(4)
})
