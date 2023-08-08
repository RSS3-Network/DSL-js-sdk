import { searchClient } from '@rss3/js-sdk'

async function main() {
  const search = searchClient()

  // Get activities by keyword
  const { docs } = await search.activities({ keyword: 'vitalik', limit: 5 })

  if (!docs) return

  for (const content of docs) {
    if (!content.id) continue

    const activity = await search.activity(content.id)

    activity.actions?.forEach((action) => {
      // The tag and type determines the type of metadata
      if (action.tag === 'social' && action.type === 'post') {
        console.log(action.metadata.body)
      }
    })
  }
}

main()
