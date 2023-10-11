import { handleMetadata } from '../../metadata'
import { components } from '../../types/data'

export type BriefAsset = {
  url?: string
  title?: string
  description?: string
}

export function extractAsset(action: components['schemas']['Action']) {
  let res: BriefAsset | undefined
  handleMetadata(action, {
    'collectible-transfer': (m) => {
      res = extractNFT(m)
    },
    'collectible-approval': (m) => {
      res = extractNFT(m)
    },
    'collectible-mint': (m) => {
      res = extractNFT(m)
    },
    'collectible-burn': (m) => {
      res = extractNFT(m)
    },
    'collectible-trade': (m) => {
      res = extractNFT(m)
    },
    'collectible-auction': (m) => {
      res = extractNFT(m)
    },
    'donation-donate': (m) => {
      res = extractDonation(m)
    },
  })
  return res
}

export function extractNFT(
  m:
    | components['schemas']['CollectibleTransfer']
    | components['schemas']['CollectibleTrade']
    | components['schemas']['CollectibleApproval']
    | components['schemas']['CollectibleAuction'],
) {
  return {
    url: m.image_url,
    title: m.name,
    description: m.description,
  }
}

export function extractDonation(m: components['schemas']['Donation']) {
  return {
    url: m.logo,
    title: m.title,
    description: m.description,
  }
}
