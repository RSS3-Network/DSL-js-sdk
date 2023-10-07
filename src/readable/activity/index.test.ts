import { describe, it } from 'vitest'
import { client } from '../../data/client'
import { metadataDoc } from '../../metadata/doc'
import { formatPlain } from './index'
import { components } from '../../types/data'

export type MetadataDoc = {
  [key: string]: {
    ref: components['schemas']['Metadata']
    tag: components['schemas']['Tag']
    type: components['schemas']['Type']
    actions?: string[]
    platforms?: string[]
    examples?: {
      actionType?: string
      id: string
      comment?: string
    }[]
  }
}

describe('formatPlain should work as expected', () => {
  const c = client()

  Object.entries(metadataDoc as MetadataDoc).map(([key, value]) => {
    value.examples?.forEach((example) => {
      it.concurrent(`${key} ${example.id}`, async ({ expect }) => {
        const { data: activity } = await c.activity(example.id)
        expect(formatPlain(activity)).matchSnapshot()
      })
    })
  })
})
