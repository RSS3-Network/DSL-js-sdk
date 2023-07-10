// If the exported functions are not enough, you can also import the low-level functions directly.
import { client } from '@rss3/js-sdk/lib/data/client.js'

async function main() {
  const c = client()

  // Get activities posted by Vitalik
  const { result: activities } = await c.activities({ address: ['vitalik.eth'], limit: 5 })
  console.log(activities)

  // Get profiles of Vitalik
  const { result: profiles } = await c.profiles({ address: ['vitalik.eth'] })
  console.log(profiles)
}

main()
