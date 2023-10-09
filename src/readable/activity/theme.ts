import { formatAddressAndNS } from '../address'
import { TokenType } from './token'

export type Theme<T> = {
  [key in TokenType]: (content: string) => T
}

export const themePlain: Theme<string> = {
  html: (c) => JSON.stringify(ellipsis(stripHTMLTags(c))),
  name: (c) => JSON.stringify(c),
  platform: (c) => c,
  address: (c) => c,
  network: (c) => JSON.stringify(c),
  number: (c) => c,
  image: () => '',
  symbolImage: () => '',
  symbol: (c) => c,
  text: (c) => c,
  time: (c) => c,
  separator: (c) => c,
  unknown: (c) => c,
}

export const themeHTML: Theme<string> = {
  html: (c) => `<span style="color: blueviolet;">${JSON.stringify(ellipsis(stripHTMLTags(c)))}</span>`,
  name: (c) => `<span style="color: blue;">${c}</span>`,
  platform: (c) => `<span style="color: red;">${c}</span>`,
  address: (c) =>
    `<img src="https://cdn.stamp.fyi/avatar/${c}?s=300" style="height: 32px;" /> <span style="color: green;">${formatAddressAndNS(
      c,
    )}</span>`,
  network: (c) => `<span style="color: red;">${c}</span>`,
  number: (c) => c,
  image: (c) => (c ? `<img src="${c}" style="height: 64px;" />` : ''),
  symbolImage: (c) => (c ? `<img src="${c}" style="height: 16px;" />` : ''),
  symbol: (c) => `<span style="color: green;">${c}</span>`,
  text: (c) => c,
  time: (c) => `<span style="color: gray;">${new Date(c).toLocaleString()}</span>`,
  separator: (c) => c,
  unknown: (c) => c,
}

function ellipsis(s: string): string {
  let trimmed = false
  const max = 50
  if (s.length > max) {
    s = s.slice(0, max)
    trimmed = true
  }

  if (/\n/.test(s)) {
    s = s.replace(/\n[\s\S]+/g, '')
    trimmed = true
  }

  return s + (trimmed ? '...' : '')
}

function stripHTMLTags(s: string) {
  return s.replace(/<[^>]*>?/gm, '')
}

export function summaryOfHTML(s: string) {
  const node = document.createElement('div')
  node.innerHTML = s
  return ellipsis(node.innerText)
}
