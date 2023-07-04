import { it } from 'vitest'
import { client } from './client'

it.concurrent('get 5 feeds by address', async ({ expect }) => {
  const res = await client().feeds({ address: ['vitalik.eth'], limit: 5 })
  expect(res.result).toHaveLength(5)
})

it.concurrent('get 10 feeds by address', async ({ expect }) => {
  const res = await client().feeds({ address: ['vitalik.eth'], limit: 10 })
  expect(res.result).toHaveLength(10)
})
