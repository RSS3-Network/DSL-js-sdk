<p align="center">
    <img src="https://raw.githubusercontent.com/RSS3-Network/web3-icons/main/icons/rss3-alt-3.svg" alt="RSS3 Logo" width="200" />
</p>

# RSS3 JavaScript SDK

<p>
  <a href="https://npmjs.com/package/@rss3/sdk"><img src="https://img.shields.io/npm/v/%40rss3%2Fsdk?style=flat&logo=npm&color=%230072ff" alt="npm package"></a>
  <a href="https://bundlephobia.com/package/@rss3/sdk"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/%40rss3%2Fsdk?style=flat&logo=npm&color=%230072ff"></a>
  <a href="https://twitter.com/intent/follow?screen_name=rss3_"><img src="https://img.shields.io/twitter/follow/rss3_?color=%230072ff" alt="follow RSS3 on X"></a>
  <a href="https://discord.gg/vfhpMjdbGU"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord&color=%230072ff" alt="discord chat"></a>
</p>

> The Turbocharger for Your Next Open Web Development.

- Quick Integration with Ethereum, Arbiturm, Base, Polygon and [more....](https://docs.rss3.io/docs/supported-networks)
- Lightning Fast to Interact with the RSS3 Network.
- Many [Web3 Domains Supported](https://docs.rss3.io/docs/name-service-resolution)
- Fully Typed, Easy to BUIDL.

## Installation

```bash
npm i @rss3/sdk
```

## Getting Started

### Obtain Data from the RSS3 Network

Get open social activities of anyone, here we get `vitalik.eth`'s comments on `Farcaster`:

```js
import { getActivities } from '@rss3/sdk'

const socialActivities = await getActivities({
  account: "vitalik.eth",
  tag: ["social"],
  type: ["comment"],
  platform: ["Farcaster"],
});
```

Or simply query cross-network and human-readable feed of anyone:

```js
import { getActivities } from '@rss3/sdk'

const readableFeed = await getActivities({
  account: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
});
```

### Add Artificial Intelligence to Your Applications

> Coming soon.

For more examples visit [RSS3 Docs](https://docs.rss3.io/).

## License

[MIT](LICENSE).
