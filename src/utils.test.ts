import { it } from 'vitest'
import { querySerializer } from './utils.js'

it('querySerializer', async ({ expect }) => {
  expect(querySerializer({ a: 1, b: '2' })).toBe('a=1&b=2')
  expect(querySerializer({ a: [1, 2] })).toBe('a=1&a=2')
})
