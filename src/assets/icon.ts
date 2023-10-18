import { Network, Tag } from '../data/client'

export function getIcon(name: Tag | Network | string) {
  return `https://assets.rss3.io/web3-icons/${name}.png`
}
