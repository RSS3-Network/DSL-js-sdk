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
  const { contents } = await search.activities({ keyword: 'vitalik', size: 5 })
  console.log(contents)

  // Get the details of the first content
  if (contents && contents.length > 0 && contents[0].id) {
    const activity = await search.activity(contents[0].id)
    console.log(activity)
  }
}

main()
