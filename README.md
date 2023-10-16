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

- Display 20 activities of the address.
- Able to filter the activities by network or platform, etc.
- Display the profile of the address.

The result app is [here](https://codesandbox.io/s/rss3-js-sdk-mmx7dk).

### Obtain Data from the RSS3 Network

First, let's get all the activities of `vitalik.eth`:

```ts
import { dataClient } from '@rss3/js-sdk'

const res = await dataClient().activities('vitalik.eth')

console.log(res.data)
```

By default it will fetch only 100 activities, we can use the limit option to only 20:

```ts
import { dataClient } from '@rss3/js-sdk'

const res = await dataClient().activities('vitalik.eth', { limit: 20 })

console.log(res.data)
```

You can recursively use the `res.nextPage` helper to get the next page's activities.

### Make the data more readable

The data we get is raw json data which contains a lot of details that we won't use in this tutorial,
we can use the `formatPlain` helper to convert a activity object to a summary string of it:

```ts
import { dataClient, formatPlain } from '@rss3/js-sdk'

const res = await dataClient().activities('vitalik.eth', { limit: 20 })

res.data.forEach((activity) => {
  console.log(formatPlain(activity))
})
```

It will output a line like:

```txt
vitalik.eth published a post "Hello World" on Farcaster [2023-10-13T05:05:32.000Z]
```

### Filter by platform

We can use the `platform` option to filter the activities by platform:

```ts
import { dataClient, formatPlain } from '@rss3/js-sdk'

const res = await dataClient().activities('vitalik.eth', {
  limit: 20,
  platform: ['Farcaster'],
})

res.data.forEach((activity) => {
  console.log(formatPlain(activity))
})
```

Here we get 20 activities of `vitalik.eth` on Farcaster.

The `platform` option is a array, you can get multiple-platform's activities at once.

Not just the `platform`, we can also use other filter options to filter the activities, such as `network`, `type`, and `tag`.

### Format customization

TODO

### Use react to display the activities

Now we have the data, let's use react to display it.

Beside the SDK, we also provided a lightweight React component library to display the activities.
Here we use it to render the activities:

```tsx
import { dataClient } from '@rss3/js-sdk'
import { useAsync } from 'react-use'
import { ActivityCard } from '@rss3/ui'

export default () => {
  const res = useAsync(() => dataClient().activities('vitalik.eth', { limit: 20 }))
  return res.value?.data.map((activity, i) => <ActivityCard key={i} activity={activity} />)
}
```

### Render profile

TODO

### Add filter

TODO

### Add Artificial Intelligence to Your Applications

> Coming soon.

For more examples visit [RSS3 Docs](https://docs.rss3.io/).

## License

[MIT](LICENSE).
