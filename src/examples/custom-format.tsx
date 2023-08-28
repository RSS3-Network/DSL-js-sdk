import { dataClient, format, Theme } from '@rss3/js-sdk'
import * as React from 'react'
import { renderToString } from 'react-dom/server'

// Custom theme to format the activity for React
const myTheme: Theme<JSX.Element> = {
  html: (c) => <div dangerouslySetInnerHTML={{ __html: c }} />,
  platform: (c) => <img className="platform" src={'/public/platform/' + c + '.svg'} />,
  address: (c) => <span className="address">{c}</span>,
  name: (c) => <span className="name">{c}</span>,
  network: (c) => <span className="network">{c}</span>,
  number: (c) => <span className="number">{c}</span>,
  symbol: (c) => <span className="symbol">{c}</span>,
  text: (c) => <span className="text">{c}</span>,
  separator: () => <br />,
  unknown: (c) => <span className="unknown">{c}</span>,
}

async function main() {
  const client = await dataClient()

  const { results: activities } = await client.activities({ account: ['vitalik.eth'], limit: 5 })

  if (!activities) throw 'no activities'

  // Print with our custom theme
  const out = renderToString(<div>{activities.map((f) => f && format(f, myTheme))}</div>)

  console.log(out)
}

main()
