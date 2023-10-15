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

- Quick Integration with Ethereum, Arbiturm, Base, Polygon and [more....](https://docs.rss3.io/docs/supported-networks)
- Get started with the RSS3 Network in minutes.
- Fully type-safe, easy to BUIDL.

## Installation

```bash
npm i @rss3/js-sdk
```

## Getting Started

In this tutorial we will use RSS3 JavaScript SDK to build a activity viewer to display activities of
a [ENS address](https://ens.domains/) or [wallet Address](https://en.wikipedia.org/wiki/Cryptocurrency_wallet).
The features we will implement:

- Display the profile of the address.
- Display 20 activities of the address.
- Able to filter the activities by network or platform, etc.

### Obtain Data from the RSS3 Network

First, let's get all the activities of `vitalik.eth`:

```ts
import { dataClient } from '@rss3/js-sdk'

async function fetchActivities() {
  const { data: activities } = await dataClient().activities('vitalik.eth')
  console.log(activities)
}

fetchActivities()
```

By default it will fetch only 100 activities. To implement pagination, we can use the `limit` and `cursor`:

```ts

```

### Add Artificial Intelligence to Your Applications

> Coming soon.

For more examples visit [RSS3 Docs](https://docs.rss3.io/).

## License

[MIT](LICENSE).
