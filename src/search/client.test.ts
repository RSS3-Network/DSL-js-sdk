import { it } from 'vitest'
import { client } from './client'

it.concurrent('get 5 feeds by keyword', async ({ expect }) => {
  const res = await client().feed({
    keyword: 'vitalik',
    page: 1,
    size: 5,
    platform: ['ALL'],
    network: ['ALL'],
    sort: 'NONE',
    between: {
      lte: -1,
      gte: -1,
    },
  })
  expect(res?.feeds).toHaveLength(5)
})
