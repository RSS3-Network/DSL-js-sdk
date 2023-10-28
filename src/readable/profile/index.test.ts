import { it } from 'vitest'
import { extractPrimaryProfile } from './index.js'

it.concurrent('get primary profile', async ({ expect }) => {
  const profile = {
    address: '0x6f3e9f20c6376a28fd63c2256f2bc100c55e9db5',
    handle: 'yuantc.eth',
    name: 'yuantc',
    platform: 'ENS Registrar',
    network: 'ethereum',
    expireAt: '2027-05-02T18:24:01Z',
  }
  const list = [profile]
  const primary = extractPrimaryProfile(list, 'not exist handle')
  expect(primary.handle).toEqual(profile.handle)
})
