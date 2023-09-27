<p align="center">
  <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://file.notion.so/f/s/632407fb-f9ea-4bab-97c8-64f0182c7131/RSS3.svg?id=b85899b3-afe8-451a-91b4-ed312d87992c&table=block&spaceId=65d56479-c868-4cdb-930c-ac594e1f032c&expirationTimestamp=1695758400000&signature=WOELQIO8Nq3b9ZWrqOptVu9ib1GJs-pUz7Puy-01sqk&downloadName=RSS3.svg" alt="RSS3 logo">
  </a>
</p>
<br/>
<p align="center">
  <a href="https://npmjs.com/package/@rss3/js-sdk"><img src="https://img.shields.io/npm/v/%40rss3%2Fjs-sdk?style=flat&logo=npm&color=%230072ff" alt="npm package"></a>
  <a href="https://twitter.com/intent/follow?screen_name=rss3_"><img src="https://img.shields.io/twitter/follow/rss3_?color=%230072ff" alt="follow RSS3 on X"></a>
  <a href="https://discord.gg/vfhpMjdbGU"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord&color=%230072ff" alt="discord chat"></a>
</p>
<br/>

# ⚡ RSS3 JavaScript SDK

> The Turbocharger🌪️ for Your Next Open Web Development.

- 💡 Quick Integration with Ethereum, Arbiturm, Base, Polygon and [more....](https://docs.rss3.io/docs/supported-networks)
- ⚡️ Lightning Fast to Interact with the RSS3 Network.
- 🛠️ Fully Typed, Easy to BUIDL.

## Installation

```bash
npm i @rss3/js-sdk
```

```bash
pnpm i @rss3/js-sdk
```

```bash
yarn add @rss3/js-sdk
```

## Getting Started

### Obtain Data from the RSS3 Network

Get open social activities of anyone, here we get `vitalik.eth`'s comments on `farcaster`:

```js
import dataClient from '@rss3/js-sdk'

const socialActivities = await dataClient().activities({
  account: 'vitalik.eth', // or many other supported domains.
  tag: 'social',
  type: 'comment',
  platform: 'farcaster',
})
```

Or simply query cross-network and human-readable feed of anyone:

```js
import dataClient from '@rss3/js-sdk'

const readableFeed = await dataClient().activities({
  account: '0xcccc',
})
```

### Perform Searches on the RSS3 Network

Search for keyword `Ethereum` across over 100 blockchains, networks and applications:

```js
import searchClient from '@rss3/js-sdk'

const searchResults = await searchClient().activities({
  keyword: 'Ethereum',
})
```

Or on a specific platform like `mirror`:

```js
import searchClient from '@rss3/js-sdk'

const searchResults = await searchClient().activities({
  keyword: 'Ethereum',
  platform: 'mirror',
})
```

### Add Artificial Intelligence to Your Applications

> Coming soon.

For more examples visit [RSS3 Docs](https://docs.rss3.io/).

## License

[MIT](LICENSE).
