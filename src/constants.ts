export const DEFAULT_RSS3_NET = getEnv('DEFAULT_RSS3_NET', 'https://testnet.rss3.io')

export const INFINITY_VALUE = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
export const SUPPORTED_NS_LIST = [
  '.eth',
  '.lens',
  '.csb',
  '.bnb',
  '.bit',
  '.crypto',
  '.zil',
  '.nft',
  '.x',
  '.wallet',
  '.bitcoin',
  '.dao',
  '.888',
  '.blockchain',
  '.avax',
  '.arb',
  '.cyber',
]
export const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000'

function getEnv(name: string, defaultVal: string): string {
  if (typeof process !== 'undefined') {
    const env = process.env[name]
    if (env) return env
  }

  return defaultVal
}
