# Simple Activity Viewer

To help you get the taste of how simple it is to use RSS3 SDK, let's use it to create a simple viewer to
display activities of a [ENS address](https://ens.domains/) or [wallet Address](https://en.wikipedia.org/wiki/Cryptocurrency_wallet).
Here are the features the viewer will have:

- Display 20 activities of the address.
- Able to filter the activities by network or platform, etc.
- Display the profile of the address.

The complete code of the final app is [here](https://codesandbox.io/p/sandbox/rss3-js-sdk-3v33nl).

## Obtain Data from the RSS3 Network

First, let's get all the activities of `vitalik.eth`:

```typescript
import { dataClient } from '@rss3/js-sdk'

const res = await dataClient().activities('vitalik.eth')

console.log(res.data)
```

By default it will fetch only 100 activities, we can use the limit option to only 20:

```typescript
import { dataClient } from '@rss3/js-sdk'

const res = await dataClient().activities('vitalik.eth', { limit: 20 })

console.log(res.data)
```

You can recursively use the `res.nextPage` helper to get the next page's activities,
to make the tutorial simple we will not implement the pagination here.

## Make the data more readable

The data we get is raw json data which contains a lot of details that we won't use in this tutorial,  
we can use the `formatPlain` helper to convert a activity object to a summary string of it:

```typescript
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

It's very useful when testing or debugging.

## Filter by platform

We can use the `platform` option to filter the activities by platform:

```typescript
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
Such as if we want to get `vitalik.eth`'s comments on `farcaster`:

```typescript
import { dataClient, formatPlain } from '@rss3/js-sdk'

const res = await dataClient().activities('vitalik.eth', {
  limit: 20,
  platform: ['Farcaster'],
  type: ['comment'],
})

res.data.forEach((activity) => {
  console.log(formatPlain(activity))
})
```

It will output a line like:

```txt
Jack made a comment "Good to hear that 🙂👏" on post "Hello World" of vitalik on Farcaster [2023-10-17T20:26:45.000Z]
```

It means jack has made a comment `Good to hear that 🙂👏` on vitalik's post `Hello World` on farcaster.

## Format customization

TODO

## Use react to display the activities

Now we have the data, let's use react to display it.

Beside the SDK, we also provided a lightweight React component library to display the activities.  
Here we use it to render the activities:

```typescript
import { dataClient } from '@rss3/js-sdk'
import { useAsync } from 'react-use'
import { ActivityCard } from '@rss3/ui'

export default () => {
  const res = useAsync(() => dataClient().activities('vitalik.eth', { limit: 20 }))
  return res.value?.data.map((activity, i) => <ActivityCard key={i} activity={activity} />)
}
```

## Render profile

TODO

## Add filter

TODO
