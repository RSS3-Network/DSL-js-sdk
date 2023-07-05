import { it } from 'vitest'
import { client } from './client'

it.concurrent('get 5 activities items by keyword', async ({ expect }) => {
  const res = await client().activities({ keyword: 'vitalik', page: 1, size: 5 })
  expect(res.feeds).toHaveLength(5)
})
