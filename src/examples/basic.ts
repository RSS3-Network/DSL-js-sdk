import { dataClient } from '@rss3/js-sdk'

async function main() {
  const client = await dataClient()

  // Get notes posted by Vitalik
  const { result: notes } = await client.notes({ address: ['vitalik.eth'], limit: 5 })
  console.log(notes)

  // Get profiles of Vitalik
  const { result: profiles } = await client.profiles({ address: ['vitalik.eth'] })
  console.log(profiles)
}

main()
