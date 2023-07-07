import { it } from 'vitest'
import { client } from './client'

// TODO: remove skip
it.skip.concurrent('get 5 activities items by keyword', async ({ expect }) => {
  const res = await client().activities({ keyword: 'vitalik', page: 1, size: 5 })
  expect(res.feeds).toHaveLength(5)
})
