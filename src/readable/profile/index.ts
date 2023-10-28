import { EMPTY_ADDRESS } from '../../constants.js'
import { components } from '../../types/data.js'
import { addressToAvatarURL, formatAddress, isAddress } from '../address/index.js'

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
      profileURI: [addressToAvatarURL(wallet, 100)],
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
      : profile?.handle
      ? addressToAvatarURL(profile?.handle, 100) || ''
      : '',
    handle: profile?.handle || '',
    banner: profile?.bannerURI?.[0] || '',
    address: profile?.address || '',
    url: profile?.url || '',
    platform: profile?.platform,
    expireAt: profile?.expireAt,
    bio: profile?.bio,
  }
}

/**
 * returns the primary profile, which handle is matched with the given handle
 * if the ens exists, it will be the primary profile
 * if those profiles are owned by the empty address, we should not use them
 */
export function extractPrimaryProfile(profiles: components['schemas']['Profile'][] | undefined, handle?: string) {
  if (!profiles || profiles.length < 1) {
    return extractProfile(null)
  }

  profiles = profiles?.sort((a) => (a?.platform === 'ENS Registrar' ? -1 : 1))
  const profile = handle
    ? profiles?.find((profile) => profile?.handle?.toLowerCase() === handle.toLowerCase()) || profiles?.[0]
    : profiles?.[0]

  if (profile?.address === EMPTY_ADDRESS) {
    return extractProfile(null)
  } else {
    return extractProfile(profile)
  }
}
