import { dataClient } from '@rss3/js-sdk'

async function main() {
  const client = await dataClient()

  // Get activities posted by Vitalik
  const { result: activities } = await client.activities({ address: ['vitalik.eth'], limit: 5 })
  console.log(activities)

  // Get profiles of Vitalik
  const { result: profiles } = await client.profiles({ address: ['vitalik.eth'] })
  console.log(profiles)
}

main()
