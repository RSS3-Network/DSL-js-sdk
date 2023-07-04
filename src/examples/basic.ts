import { dataClient } from '@rss3/js-sdk'

async function main() {
  const client = await dataClient()

  // Get feeds posted by Vitalik
  const { result: feeds } = await client.feeds({ address: ['vitalik.eth'], limit: 5 })
  console.log(feeds)

  // Get profiles of Vitalik
  const { result: profiles } = await client.profiles({ address: ['vitalik.eth'] })
  console.log(profiles)
}

main()
