<!-- markdownlint-disable -->
<p align="center">
  <a href="https://rss3.io" target="_blank" rel="noopener noreferrer">
    <img width="180" src="doc/RSS3.svg" alt="RSS3 logo">
  </a>
</p>
<p align="center">
  <a href="https://npmjs.com/package/@rss3/js-sdk"><img src="https://img.shields.io/npm/v/%40rss3%2Fjs-sdk?style=flat&logo=npm&color=%230072ff" alt="npm package"></a>
  <a href="https://twitter.com/intent/follow?screen_name=rss3_"><img src="https://img.shields.io/twitter/follow/rss3_?color=%230072ff" alt="follow RSS3 on X"></a>
  <a href="https://discord.gg/vfhpMjdbGU"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord&color=%230072ff" alt="discord chat"></a>
</p>
<!-- markdownlint-enable -->

# RSS3 JavaScript SDK

> The Turbocharger for Your Next Open Web Development.

- Quick Integration with Ethereum, Arbiturm, Base, Polygon and [more....](https://docs.rss3.io/docs/supported-networks)
- Lightning Fast to Interact with the RSS3 Network.
- Many [Web3 Domains Supported](https://docs.rss3.io/docs/name-service-resolution)
- Fully Typed, Easy to BUIDL.

## Installation

```bash
npm i @rss3/js-sdk
```

## Getting Started

### Obtain Data from the RSS3 Network

Get open social activities of anyone, here we get `vitalik.eth`'s comments on `farcaster`:

```js
import dataClient from '@rss3/js-sdk'

const socialActivities = await dataClient().activities('vitalik.eth', {
  tag: ['social'],
  type: ['comment'],
  platform: ['farcaster'],
})
```

Or simply query cross-network and human-readable feed of anyone:

```js
import dataClient from '@rss3/js-sdk'

const readableFeed = await dataClient().activities('0xd8da6bf26964af9d7eed9e03e53415d37aa96045')
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
  platform: ['mirror'],
})
```

### Add Artificial Intelligence to Your Applications

> Coming soon.

For more examples visit [RSS3 Docs](https://docs.rss3.io/).

## License

[MIT](LICENSE).
