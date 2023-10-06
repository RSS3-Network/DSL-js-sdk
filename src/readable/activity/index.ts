import { components } from '../../types/data'
import { getActions } from '../../utils'
import { handleMetadata } from '../metadata'
import { Theme, themePlain } from './theme'
import {
  Token,
  tokenSeparator,
  tokenText,
  tokenValue,
  join,
  tokenPlatform,
  tokenPost,
  tokenAddr,
  tokenName,
  tokenImage,
  tokenNetwork,
} from './token'

export function handleActivity(activity: components['schemas']['Activity']): string {
  return format(activity, themePlain).join('')
}

/**
 * returns a plain string summary of the activity.
 */
export function format<T>(activity: components['schemas']['Activity'], theme: Theme<T>): T[] {
  const ts = tokenizeActivity(activity)
  return ts.map((t) => theme[t.type](t.content))
}

/**
 * Returns a list of tokens that can be used to custom render the output of a activity, such as CLI output
 * all the symbols in blue color.
 */
export function tokenizeActivity(activity: components['schemas']['Activity']): Token[] {
  const actions = getActions(activity)

  return actions.reduce((acc, action) => {
    if (acc.length === 0) {
      return tokenizeAction(activity, action)
    }

    return [...acc, tokenSeparator, ...tokenizeAction(activity, action)]
  }, [] as Token[])
}

/**
 * Returns a list of tokens that can be used to custom render the output of an action, such as CLI output
 */
export function tokenizeAction(
  activity: components['schemas']['Activity'],
  action: components['schemas']['Action'],
): Token[] {
  const owner = activity.owner
  let res = [tokenText('Carried out an activity')]
  handleMetadata(action, {
    'transaction-transfer': (m) => {
      if (owner === action.from) {
        res = join([
          ...tokenAddr(action.from),
          tokenText('sent'),
          ...tokenValue(m),
          tokenText('to'),
          ...tokenAddr(action.to),
        ])
      } else {
        res = join([
          ...tokenAddr(action.to),
          tokenText('claimed'),
          ...tokenValue(m),
          tokenText('from'),
          ...tokenAddr(action.from),
        ])
      }
    },
    'transaction-approval': (m) => {
      if (m.action === 'approve') {
        res = join([
          ...tokenAddr(action.from),
          tokenText('approved'),
          ...tokenValue(m),
          tokenText('to'),
          ...tokenAddr(action.to),
        ])
      } else {
        res = join([
          ...tokenAddr(action.from),
          tokenText('revoked the approval of'),
          ...tokenValue(m),
          tokenText('to'),
          ...tokenAddr(action.to),
        ])
      }
    },
    'transaction-mint': (m) => {
      res = join([...tokenAddr(action.from), tokenText('Minted'), ...tokenValue(m)])
    },
    'transaction-burn': (m) => {
      res = join([...tokenAddr(action.from), tokenText('Burned'), ...tokenValue(m)])
    },
    // todo need to double check the multisig action
    'transaction-multisig': (m) => {
      if (m.action === 'create') {
        res = join([
          tokenText('Created a multisig transaction'),
          tokenText('to'),
          ...tokenAddr(action.to),
          ...tokenPlatform(activity),
        ])
      } else if (m.action === 'add_owner') {
        res = join([
          tokenText('Added'),
          ...tokenAddr(m.owner),
          tokenText('to'),
          ...tokenAddr(m.vault.address),
          ...tokenPlatform(activity),
        ])
      } else if (m.action === 'remove_owner') {
        res = join([
          tokenText('Removed'),
          ...tokenAddr(m.owner),
          tokenText('from'),
          ...tokenAddr(m.vault.address),
          ...tokenPlatform(activity),
        ])
      } else if (m.action === 'change_threshold') {
        res = join([tokenText('Changed the threshold of'), ...tokenAddr(m.vault.address), ...tokenPlatform(activity)])
      } else if (m.action === 'rejection') {
        res = join([tokenText('Rejected a multisig transaction'), ...tokenPlatform(activity)])
      } else if (m.action === 'execution') {
        res = join([tokenText('Executed a multisig transaction'), ...tokenPlatform(activity)])
      }
    },
    'transaction-bridge': (m) => {
      let network: Token[] = []
      if (m.source_network && m.source_network.name) {
        network = [
          tokenText('from'),
          tokenNetwork(m.source_network.name),
          tokenText('to'),
          tokenNetwork(m.target_network.name),
        ]
      }
      if (m.action === 'deposit') {
        res = join([tokenText('Deposited'), ...tokenValue(m.token), ...network, ...tokenPlatform(activity)])
      } else {
        res = join([tokenText('Withdrew'), ...tokenValue(m.token), ...network, ...tokenPlatform(activity)])
      }
    },
    'transaction-deploy': (m) => {
      res = join([tokenText('Deployed a contract'), ...tokenAddr(m.address)])
    },
    // for collectible or nft related action, it will use image_url as the image link
    'collectible-transfer': (m) => {
      res = join([
        ...tokenAddr(action.from),
        tokenText('Transferred'),
        tokenImage(m.image_url),
        tokenName(m.name || m.title || 'NFT'),
        tokenText('to'),
        ...tokenAddr(action.to),
      ])
    },
    'collectible-approval': (m) => {
      if (m.action === 'approve') {
        res = join([
          tokenText('Approved'),
          tokenImage(m.image_url),
          tokenName(`${m.name} collection`),
          tokenText('to'),
          ...tokenAddr(action.to),
        ])
      } else {
        res = join([
          tokenText('Revoked the approval of'),
          tokenImage(m.image_url),
          tokenName(`${m.name} collection`),
          tokenText('to'),
          ...tokenAddr(action.to),
        ])
      }
    },
    'collectible-mint': (m) => {
      res = join([tokenText('Minted'), tokenImage(m.image_url), tokenName(m.name || m.title || 'NFT')])
    },
    'collectible-burn': (m) => {
      res = join([tokenText('Burned'), tokenImage(m.image_url), tokenName(m.name || m.title || 'NFT')])
    },
    'collectible-trade': (m) => {
      if (m.action === 'buy') {
        res = join([
          tokenText('Bought'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          tokenText('from'),
          ...tokenAddr(action.from),
          ...tokenPlatform(action),
        ])
      } else {
        res = join([
          tokenText('Sold'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          tokenText('to'),
          ...tokenAddr(action.to),
          ...tokenPlatform(action),
        ])
      }
    },
    'collectible-auction': (m) => {
      if (m.action === 'create') {
        res = join([
          tokenText('Created an auction for'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'bid') {
        res = join([
          tokenText('Made a bid for'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'cancel') {
        res = join([
          tokenText('Canceled an auction for'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'update') {
        res = join([
          tokenText('Updated an auction for'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'finalize') {
        res = join([
          tokenText('Won an auction for'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          ...tokenPlatform(action),
        ])
      } else {
        res = join([
          tokenText('Invalidated an auction for'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          ...tokenPlatform(action),
        ])
      }
    },
    'exchange-swap': (m) => {
      res = join([
        tokenText('Swapped'),
        ...tokenValue(m.from),
        tokenText('to'),
        ...tokenValue(m.to),
        ...tokenPlatform(action),
      ])
    },
    'exchange-liquidity': (m) => {
      const tokens = m.tokens.flatMap((t) => join([...tokenValue(t), tokenText(',')]))
      if (m.action === 'add') {
        res = join([tokenText('Added'), ...tokens, tokenText('to liquidity'), ...tokenPlatform(action)])
      } else if (m.action === 'remove') {
        res = join([tokenText('Removed'), ...tokens, tokenText('from liquidity'), ...tokenPlatform(action)])
      } else if (m.action === 'collect') {
        res = join([tokenText('Collected'), ...tokens, tokenText('from liquidity'), ...tokenPlatform(action)])
      }
    },
    // todo support exchange loan type
    'exchange-loan': () => {
      return [tokenText('Carried out an activity')]
    },
    'donation-donate': (m) => {
      res = join([tokenText('Donated'), tokenImage(m.logo), tokenName(m.title || ''), ...tokenPlatform(action)])
    },
    'governance-propose': (m) => {
      res = join([tokenText('Proposed for'), tokenName(m.title || ''), ...tokenPlatform(action)])
    },
    'governance-vote': (m) => {
      res = join([tokenText('Voted for'), tokenName(m.proposal?.options?.join(',') || ''), ...tokenPlatform(action)])
    },
    'social-post': () => {
      res = join([tokenText('Published post'), tokenPost(action), ...tokenPlatform(action)])
    },
    'social-comment': () => {
      res = join([...tokenAddr(action.to), tokenText('Commented'), tokenPost(action), ...tokenPlatform(action)])
    },
    'social-share': () => {
      res = join([tokenText('Shared'), tokenPost(action), ...tokenPlatform(action)])
    },
    'social-mint': () => {
      res = join([tokenText('Minted'), tokenPost(action), ...tokenPlatform(action)])
    },
    'social-follow': (m) => {
      res = join([
        tokenImage(m.to?.image_uri?.[0] || `https://cdn.stamp.fyi/avatar/${m.to?.handle}?s=300`),
        tokenName(m.to?.name || m.to?.handle || ''),
        tokenText('followed'),
        tokenImage(m.from?.image_uri?.[0] || `https://cdn.stamp.fyi/avatar/${m.from?.handle}?s=300`),
        tokenName(m.from?.name || m.from?.handle || ''),
        ...tokenPlatform(action),
      ])
    },
    'social-unfollow': (m) => {
      res = join([
        tokenImage(m.from?.image_uri?.[0] || `https://cdn.stamp.fyi/avatar/${m.from?.handle}?s=300`),
        tokenName(m.from?.name || m.from?.handle || ''),
        tokenText('unfollowed'),
        tokenImage(m.to?.image_uri?.[0] || `https://cdn.stamp.fyi/avatar/${m.to?.handle}?s=300`),
        tokenName(m.to?.name || m.to?.handle || ''),
        ...tokenPlatform(action),
      ])
    },
    'social-revise': () => {
      res = join([tokenText('Revised'), tokenPost(action), ...tokenPlatform(action)])
    },
    'social-profile': (m) => {
      if (m.action === 'create') {
        res = join([tokenText('Created a profile'), ...tokenPlatform(action)])
      } else if (m.action === 'update') {
        res = join([
          tokenText('Updated a profile'),
          tokenImage(m.image_uri?.[0]),
          tokenName(m.name || m.handle || ''),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'renew') {
        res = join([
          tokenText('Renewed a profile'),
          tokenImage(m.image_uri?.[0]),
          tokenName(m.name || m.handle || ''),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'wrap') {
        res = join([
          tokenText('Wrapped a profile'),
          tokenImage(m.image_uri?.[0]),
          tokenName(m.name || m.handle || ''),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'unwrap') {
        res = join([
          tokenText('Unwrapped a profile'),
          tokenImage(m.image_uri?.[0]),
          tokenName(m.name || m.handle || ''),
          ...tokenPlatform(action),
        ])
      }
    },
    'social-proxy': (m) => {
      if (m.action === 'appoint') {
        res = join([tokenText('Approved a proxy'), ...tokenPlatform(action)])
      } else {
        res = join([tokenText('Removed a proxy'), ...tokenPlatform(action)])
      }
    },
    'social-delete': () => {
      res = join([tokenText('Deleted'), tokenPost(action), ...tokenPlatform(action)])
    },
    'metaverse-transfer': (m) => {
      res = join([
        tokenText('Transferred'),
        tokenImage(m.image_url),
        tokenName(m.name || m.title || 'NFT'),
        tokenText('to'),
        ...tokenAddr(action.to),
      ])
    },
    'metaverse-mint': (m) => {
      res = join([
        tokenText('Minted'),
        tokenImage(m.image_url),
        tokenName(m.name || m.title || 'NFT'),
        ...tokenPlatform(action),
      ])
    },
    'metaverse-burn': (m) => {
      res = join([
        tokenText('Burned'),
        tokenImage(m.image_url),
        tokenName(m.name || m.title || 'NFT'),
        ...tokenPlatform(action),
      ])
    },
    'metaverse-trade': (m) => {
      if (m.action === 'buy') {
        res = join([
          tokenText('Bought'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          tokenText('from'),
          ...tokenAddr(action.from),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'sell') {
        res = join([
          tokenText('Sold'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          tokenText('from'),
          ...tokenAddr(action.from),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'list') {
        res = join([
          tokenText('Listed'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          tokenText('from'),
          ...tokenAddr(action.from),
          ...tokenPlatform(action),
        ])
      }
    },
  })
  return res
}
