import { components } from '../../types/data'
import { formatAddress, isAddress } from '../address'

/**
 * it will add the basic wallet address to profile as the default profile
 * also sort the profile list and fix the avatar logic, the ens registrar profile will be the first
 */
export function formatProfiles(profiles: components['schemas']['Profile'][] | undefined, address: string | undefined) {
  if (!profiles) return profiles
  let res: components['schemas']['Profile'][] = profiles || []
  // add the basic wallet address to profile
  let wallet: string | undefined = address
  if (wallet && !isAddress(wallet)) {
    wallet = res.find((item) => !!item.address)?.address
  }
  if (wallet && isAddress(wallet)) {
    res.push({
      address: wallet,
      bio: '',
      handle: wallet,
      name: formatAddress(wallet),
      network: 'Ethereum',
      platform: 'Ethereum',
      profileURI: [`https://cdn.stamp.fyi/avatar/${wallet}?s=300`],
      socialURI: [],
    })
  }
  // sort the matched profile first
  res = res?.sort((a) => (a?.handle === address ? -1 : 1))
  // ens registrar first
  res = res?.sort((a) => (a?.platform === 'ENS Registrar' ? -1 : 1))
  res = res?.map((item) => {
    // fix eip155:1 profile url
    if (
      item.platform === 'ENS Registrar' &&
      item.profileURI &&
      item.profileURI.length >= 1 &&
      item.profileURI[0].startsWith('eip155:1')
    ) {
      item.profileURI = [`https://metadata.ens.domains/mainnet/avatar/${item.handle}`]
    }
    // fix unstoppable domain profile url order
    if (item?.platform === 'Unstoppable') {
      const [a, b] = item?.profileURI || []
      item.profileURI = [b, a]
    }
    return item
  })
  return res
}

export function extractProfile(profile: components['schemas']['Profile'] | null | undefined) {
  return {
    name: profile?.name || '',
    avatar: profile?.profileURI?.[0]
      ? profile?.profileURI?.[0]
      : `https://cdn.stamp.fyi/avatar/${profile?.handle}?s=300`,
    handle: profile?.handle || '',
    banner: profile?.bannerURI?.[0] || '',
    address: profile?.address || '',
    url: profile?.url || '',
    platform: profile?.platform,
  }
}

/**
 * returns the primary profile, which handle is matched with the given handle
 * if the ens exists, it will be the primary profile
 */
export function extractPrimaryProfile(profiles: components['schemas']['Profile'][] | undefined, handle?: string) {
  const profile = handle
    ? profiles?.find((profile) => profile?.handle?.toLowerCase() === handle.toLowerCase())
    : profiles?.[0]
  return extractProfile(profile)
}
