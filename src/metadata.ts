import { components } from './types/data'
import { metadataDoc } from './metadata-doc'

type NotUndefined<T> = T extends undefined ? never : T

type MakeKeysOptional<T> = {
  [K in keyof T]?: T[K]
}

type Doc = typeof metadataDoc

type Map = MakeKeysOptional<Doc>

function getTagType(action: components['schemas']['Action']): keyof Map {
  return `${action.tag}-${action.type}` as keyof Map
}

type Handlers = {
  [key in keyof Map]: (metadata: NotUndefined<NotUndefined<Map[key]>['ref']>) => void
}

export function handleMetadata(action: components['schemas']['Action'], hs: Handlers) {
  const h = hs[getTagType(action)]
  if (!h) return

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h(action.metadata as any)
}
