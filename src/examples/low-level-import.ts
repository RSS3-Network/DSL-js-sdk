// If the exported functions are not enough, you can also import the low-level functions directly.
import { client } from '@rss3/js-sdk/lib/data/client.js'

async function main() {
  // Get activities posted by Vitalik
  const { results: activities } = await client().activities({ address: ['vitalik.eth'], limit: 5 })
  console.log(activities)
}

main()
