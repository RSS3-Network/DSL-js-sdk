import { it } from 'vitest'
import { client } from '../../data/client.js'
import { extractAsset } from './index.js'
import { getActions } from '../../utils.js'

// TODO: fix the test
it.skip.concurrent('get brief asset info', async ({ expect }) => {
  const res = await client().activity('0x5a19dd1c81fa00599655bcd4b49ae27baca55ab372a8387d40201bae5ab3eddd')
  const actions = getActions(res.data)
  const brief = extractAsset(actions[0])
  expect(brief?.title).toBe('Distributed Solar for Web3 Creators in Nigeria')
})
