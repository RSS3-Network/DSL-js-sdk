import { it } from 'vitest'
import { client } from '../../data/client.js'
import { formatGraph } from './index.js'

it.concurrent('get social post content', async ({ expect }) => {
  const res = await client().activity('0x97d9e3f9df5f009ba530637a3194c72ae25cc5c1e81e7cd67fcb5921e379eec0')
  const dots = formatGraph(res.data)
  expect(dots.length).toBe(1)
  const content = dots[0].object.content
  expect(content).toBe(
    'RSSHub Radar 自生自灭了几年居然自然增长到差不多 10 万周活用户了，而且没想到 Edge 用户那么多，都接近 Chrome 7 成了',
  )
})
