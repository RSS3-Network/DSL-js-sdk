import { dataClient } from '@rss3/js-sdk'

async function main() {
  const res = await dataClient().notes({ address: ['vitalik.eth'], limit: 5 })

  console.log(res)
}

main()
