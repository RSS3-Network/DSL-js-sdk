import { dataClient, searchClient } from '@rss3/js-sdk'

async function main() {
  const data = dataClient()

  // Get activities posted by Vitalik
  const { result: activities } = await data.activities({ address: ['vitalik.eth'], limit: 5 })
  console.log(activities)

  // Get profiles of Vitalik
  const { result: profiles } = await data.profiles('vitalik.eth')
  console.log(profiles)

  const search = searchClient()

  // Get activities by keyword
  const { docs } = await search.activities({ keyword: 'vitalik', limit: 5 })
  console.log(docs)

  // Get the details of the first content
  if (docs && docs.length > 0 && docs[0].id) {
    const activity = await search.activity(docs[0].id)
    console.log(activity)
  }
}

main()
