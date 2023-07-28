import { it } from 'vitest'
import { client } from './client'

it.concurrent('get suggestions', async ({ expect }) => {
  const res = await client().suggestions({ keyword: 'vitalik', count: 5 })
  expect(res).toHaveLength(5)
})

it.concurrent('get activities', async ({ expect }) => {
  const res = await client().activities({ keyword: 'vitalik', page: 1, size: 5 })
  expect(res.contents).toHaveLength(5)
})

it.concurrent('get activity', async ({ expect }) => {
  const { contents } = await client().activities({ keyword: 'vitalik', size: 5 })

  if (contents && contents.length > 0 && contents[0].id) {
    const activity = await client().activity(contents[0].id)
    expect(activity.id).toBe(contents[0].id)
  }
})

it.concurrent('get nft', async ({ expect }) => {
  const res = await client().nft({ keyword: 'azuki', page: 1, size: 5 })
  expect(res.collections).toHaveLength(5)
})

it.concurrent('get wiki', async ({ expect }) => {
  const res = await client().wiki({ keyword: 'eth' })
  expect(res.docs).toHaveLength(5)
})

it.concurrent('get related addresses', async ({ expect }) => {
  const res = await client().relatedAddresses({ keyword: 'vitalik' })
  expect(res).toHaveLength(6)
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
  const res = await client().dapp({ keyword: 'swap', page: 1, size: 5 })
  expect(res.docs).toHaveLength(5)
})

it.concurrent('get nft details', async ({ expect }) => {
  const res = await client().nftImage({
    contractAddress: '0xeaa708c29ffce22db864385f0c6509907af45c03',
    network: 'ETHEREUM',
    tokenId: '1',
  })
  expect(res.id).toBe('43978960')
})
