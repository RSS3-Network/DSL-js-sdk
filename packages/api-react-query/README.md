<p align="center">
    <img src="https://raw.githubusercontent.com/RSS3-Network/web3-icons/main/icons/rss3-alt-3.svg" alt="RSS3 Logo" width="200" />
</p>

# RSS3 React Query SDK

<p>
  <a href="https://npmjs.com/package/@rss3/api-react-query"><img src="https://img.shields.io/npm/v/%40rss3%2Fapi-react-query?style=flat&logo=npm&color=%230072ff" alt="npm package"></a>
  <a href="https://bundlephobia.com/package/@rss3/api-react-query"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/%40rss3%2Fapi-react-query?style=flat&logo=npm&color=%230072ff"></a>
  <a href="https://twitter.com/intent/follow?screen_name=rss3_"><img src="https://img.shields.io/twitter/follow/rss3_?color=%230072ff" alt="follow RSS3 on X"></a>
  <a href="https://discord.gg/vfhpMjdbGU"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord&color=%230072ff" alt="discord chat"></a>
</p>

> React Query hooks for the RSS3 JavaScript SDK.

- Easy integration with React applications using React Query
- Fully typed hooks for all RSS3 API endpoints
- Optimized for performance with built-in caching and request deduplication

## Installation

```bash
npm i @rss3/api-react-query @tanstack/react-query
```

Note: This package requires [`@tanstack/react-query`](https://www.npmjs.com/package/@tanstack/react-query) as a peer dependency.

## Getting Started

First, set up the React Query provider in your app:

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app components */}
    </QueryClientProvider>
  )
}
```

Then, you can use the hooks in your components:

### Fetch Activities

```jsx
import { useGetActivities } from '@rss3/api-react-query'

function ActivityFeed() {
  const { data, isLoading, error } = useGetActivities({
    account: "vitalik.eth",
    tag: ["social"],
    type: ["comment"],
    platform: ["Farcaster"],
  });

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data?.map(activity => (
        <li key={activity.id}>{activity.content}</li>
      ))}
    </ul>
  )
}
```

## Documentation

For more detailed information about the available hooks and their usage, please refer to the [RSS3 API documentation](https://docs.rss3.io/).

## License

[MIT](LICENSE).
