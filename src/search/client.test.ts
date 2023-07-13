import { it } from 'vitest'
import { client } from './client'

it.concurrent('get suggestions', async ({ expect }) => {
  const res = await client().suggestions({ keyword: 'vitalik', count: 5 })
  expect(res).toHaveLength(5)
})

it.concurrent('get activities', async ({ expect }) => {
  const res = await client().activities({ keyword: 'vitalik', page: 1, size: 5 })
  expect(res.feeds).toHaveLength(5)
})

it.concurrent('get details', async ({ expect }) => {
  const res = await client().details({
    id: '0xe8176933803fd2d12ca58712e472b59eb670b4b5ec167d86a67c5fbacdd6b60d',
  })
  expect(res.docType).toBe('FEED')
})

it.concurrent('get nft', async ({ expect }) => {
  const res = await client().nft({ keyword: 'azuki', page: 1, size: 5 })
  expect(res.collections).toHaveLength(5)
})

it.concurrent('get wiki', async ({ expect }) => {
  const res = await client().wiki({ keyword: 'eth' })
  expect(res.docs).toHaveLength(5)
})

it.concurrent('get recommendations', async ({ expect }) => {
  const res = await client().recommendations({ keyword: 'vitalik' })
  expect(res).toHaveLength(6)
})

it.concurrent('get nft images', async ({ expect }) => {
  const res = await client().nftImages({ contractAddress: '0xeaa708c29ffce22db864385f0c6509907af45c03' })
  expect(res.images).toHaveLength(10)
})

it.concurrent('get dapp', async ({ expect }) => {
  const res = await client().dapp({ keyword: 'swap', page: 1, size: 5 })
  expect(res.docs).toHaveLength(5)
})

it.concurrent('get nft details', async ({ expect }) => {
  const res = await client().nftImageDetails({
    contractAddress: '0xeaa708c29ffce22db864385f0c6509907af45c03',
    network: 'ETHEREUM',
    tokenId: '1',
  })
  expect(res.id).toBe('43978960')
})
