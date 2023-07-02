import { test, expect } from 'vitest'
import formatTransaction from './transaction'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { client } from '../data/client'

test.each([
  [
    '0x558981af55e59fc42da7684a3b803b7e078b4b233d6e0be6ea22dd6b3263b98d',
    'Transferred 1000 HOP to 0x5dac9baaeb5a89a9e79381fb9bc9964c9291f3de',
  ],
  [
    '0x74a2e680f4dab8f840e52044b75890a329107faa9db5bb312284542953280d33',
    'Claimed 5462.579429159777256061 BRIGHT from 0x79a7cad3ac4554c133dcaaa9bc3319385eb7fd5d',
  ],
])('briefTransaction %s', async (address, expected) => {
  const txn = await get(address)
  expect(expected).toBe(formatTransaction(txn))
})

async function get(addr: string) {
  const path = `src/format/tx-examples/${addr}.json`
  if (existsSync(path)) {
    return JSON.parse(readFileSync(path, 'utf-8'))
  }

  const txn = await client().transaction(addr)

  writeFileSync(path, JSON.stringify(txn, null, 2))

  return txn
}
