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
  handleMetadata(action, {
    'transaction-transfer': (m) => {
      if (owner === action.from) {
        return join([
          ...tokenAddr(action.from),
          tokenText('sent'),
          ...tokenValue(m),
          tokenText('to'),
          ...tokenAddr(action.to),
        ])
      } else {
        return join([
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
        return join([
          ...tokenAddr(action.from),
          tokenText('approved'),
          ...tokenValue(m),
          tokenText('to'),
          ...tokenAddr(action.to),
        ])
      } else {
        return join([
          ...tokenAddr(action.from),
          tokenText('revoked the approval of'),
          ...tokenValue(m),
          tokenText('to'),
          ...tokenAddr(action.to),
        ])
      }
    },
    'transaction-mint': (m) => {
      return join([...tokenAddr(action.from), tokenText('Minted'), ...tokenValue(m)])
    },
    'transaction-burn': (m) => {
      return join([...tokenAddr(action.from), tokenText('Burned'), ...tokenValue(m)])
    },
    // todo need to double check the multisig action
    'transaction-multisig': (m) => {
      if (m.action === 'create') {
        return join([
          tokenText('Created a multisig transaction'),
          tokenText('to'),
          ...tokenAddr(action.to),
          ...tokenPlatform(activity),
        ])
      } else if (m.action === 'add_owner') {
        return join([
          tokenText('Added'),
          ...tokenAddr(m.owner),
          tokenText('to'),
          ...tokenAddr(m.vault.address),
          ...tokenPlatform(activity),
        ])
      } else if (m.action === 'remove_owner') {
        return join([
          tokenText('Removed'),
          ...tokenAddr(m.owner),
          tokenText('from'),
          ...tokenAddr(m.vault.address),
          ...tokenPlatform(activity),
        ])
      } else if (m.action === 'change_threshold') {
        return join([tokenText('Changed the threshold of'), ...tokenAddr(m.vault.address), ...tokenPlatform(activity)])
      } else if (m.action === 'rejection') {
        return join([tokenText('Rejected a multisig transaction'), ...tokenPlatform(activity)])
      } else if (m.action === 'execution') {
        return join([tokenText('Executed a multisig transaction'), ...tokenPlatform(activity)])
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
        return join([tokenText('Deposited'), ...tokenValue(m.token), ...network, ...tokenPlatform(activity)])
      } else {
        return join([tokenText('Withdrew'), ...tokenValue(m.token), ...network, ...tokenPlatform(activity)])
      }
    },
    'transaction-deploy': (m) => {
      return join([tokenText('Deployed a contract'), ...tokenAddr(m.address)])
    },
    // for collectible or nft related action, it will use image_url as the image link
    'collectible-transfer': (m) => {
      return join([
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
        return join([
          tokenText('Approved'),
          tokenImage(m.image_url),
          tokenName(`${m.name} collection`),
          tokenText('to'),
          ...tokenAddr(action.to),
        ])
      } else {
        return join([
          tokenText('Revoked the approval of'),
          tokenImage(m.image_url),
          tokenName(`${m.name} collection`),
          tokenText('to'),
          ...tokenAddr(action.to),
        ])
      }
    },
    'collectible-mint': (m) => {
      return join([tokenText('Minted'), tokenImage(m.image_url), tokenName(m.name || m.title || 'NFT')])
    },
    'collectible-burn': (m) => {
      return join([tokenText('Burned'), tokenImage(m.image_url), tokenName(m.name || m.title || 'NFT')])
    },
    'collectible-trade': (m) => {
      if (m.action === 'buy') {
        return join([
          tokenText('Bought'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          tokenText('from'),
          ...tokenAddr(action.from),
          ...tokenPlatform(action),
        ])
      } else {
        return join([
          tokenText('Sell'),
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
        return join([
          tokenText('Created an auction for'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'bid') {
        return join([
          tokenText('Made a bid for'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'cancel') {
        return join([
          tokenText('Canceled an auction for'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'update') {
        return join([
          tokenText('Updated an auction for'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'finalize') {
        return join([
          tokenText('Won an auction for'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          ...tokenPlatform(action),
        ])
      } else {
        return join([
          tokenText('Invalidated an auction for'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          ...tokenPlatform(action),
        ])
      }
    },
    'exchange-swap': (m) => {
      return join([
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
        return join([tokenText('Added'), ...tokens, tokenText('to liquidity'), ...tokenPlatform(action)])
      } else if (m.action === 'remove') {
        return join([tokenText('Removed'), ...tokens, tokenText('from liquidity'), ...tokenPlatform(action)])
      } else if (m.action === 'collect') {
        return join([tokenText('Collected'), ...tokens, tokenText('from liquidity'), ...tokenPlatform(action)])
      }
    },
    // todo support exchange loan type
    'exchange-loan': () => {
      return [tokenText('Carried out an activity')]
    },
    'donation-donate': (m) => {
      return join([tokenText('Donated'), tokenImage(m.logo), tokenName(m.title || ''), ...tokenPlatform(action)])
    },
    'governance-propose': (m) => {
      return join([tokenText('Proposed for'), tokenText(m.title || ''), ...tokenPlatform(action)])
    },
    'governance-vote': (m) => {
      return join([tokenText('Voted for'), tokenText(m.proposal?.options?.join(',') || ''), ...tokenPlatform(action)])
    },
    'social-post': () => {
      return join([tokenText('Published post'), tokenPost(action), ...tokenPlatform(action)])
    },
    'social-comment': () => {
      return join([...tokenAddr(action.to), tokenText('Commented'), tokenPost(action), ...tokenPlatform(action)])
    },
    'social-share': () => {
      return join([tokenText('Shared'), tokenPost(action), ...tokenPlatform(action)])
    },
    'social-mint': () => {
      return join([tokenText('Minted'), tokenPost(action), ...tokenPlatform(action)])
    },
    'social-follow': (m) => {
      return join([
        tokenImage(m.to?.image_uri?.[0] || `https://cdn.stamp.fyi/avatar/${m.to?.handle}?s=300`),
        tokenName(m.to?.name || m.to?.handle || ''),
        tokenText('followed'),
        tokenImage(m.from?.image_uri?.[0] || `https://cdn.stamp.fyi/avatar/${m.from?.handle}?s=300`),
        tokenName(m.from?.name || m.from?.handle || ''),
        ...tokenPlatform(action),
      ])
    },
    // todo type error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'social-unfollow': (m: any) => {
      return join([
        tokenImage(m.from?.image_uri?.[0] || `https://cdn.stamp.fyi/avatar/${m.from?.handle}?s=300`),
        tokenName(m.from?.name || m.from?.handle || ''),
        tokenText('unfollowed'),
        tokenImage(m.to?.image_uri?.[0] || `https://cdn.stamp.fyi/avatar/${m.to?.handle}?s=300`),
        tokenName(m.to?.name || m.to?.handle || ''),
        ...tokenPlatform(action),
      ])
    },
    'social-revise': () => {
      return join([tokenText('Revised'), tokenPost(action), ...tokenPlatform(action)])
    },
    'social-profile': (m) => {
      if (m.action === 'create') {
        return join([tokenText('Created a profile'), ...tokenPlatform(action)])
      } else if (m.action === 'update') {
        return join([
          tokenText('Updated a profile'),
          tokenImage(m.image_uri?.[0]),
          tokenName(m.name || m.handle || ''),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'renew') {
        return join([
          tokenText('Renewed a profile'),
          tokenImage(m.image_uri?.[0]),
          tokenName(m.name || m.handle || ''),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'wrap') {
        return join([
          tokenText('Wrapped a profile'),
          tokenImage(m.image_uri?.[0]),
          tokenName(m.name || m.handle || ''),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'unwrap') {
        return join([
          tokenText('Unwrapped a profile'),
          tokenImage(m.image_uri?.[0]),
          tokenName(m.name || m.handle || ''),
          ...tokenPlatform(action),
        ])
      }
    },
    'social-proxy': (m) => {
      if (m.action === 'appoint') {
        return join([tokenText('Approved a proxy'), ...tokenPlatform(action)])
      } else {
        return join([tokenText('Removed a proxy'), ...tokenPlatform(action)])
      }
    },
    'social-delete': () => {
      return join([tokenText('Deleted'), tokenPost(action), ...tokenPlatform(action)])
    },
    'metaverse-transfer': (m) => {
      return join([
        tokenText('Transferred'),
        tokenImage(m.image_url),
        tokenName(m.name || m.title || 'NFT'),
        tokenText('to'),
        ...tokenAddr(action.to),
      ])
    },
    'metaverse-mint': (m) => {
      return join([
        tokenText('Minted'),
        tokenImage(m.image_url),
        tokenName(m.name || m.title || 'NFT'),
        ...tokenPlatform(action),
      ])
    },
    'metaverse-burn': (m) => {
      return join([
        tokenText('Burned'),
        tokenImage(m.image_url),
        tokenName(m.name || m.title || 'NFT'),
        ...tokenPlatform(action),
      ])
    },
    'metaverse-trade': (m) => {
      if (m.action === 'buy') {
        return join([
          tokenText('Bought'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          tokenText('from'),
          ...tokenAddr(action.from),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'sell') {
        return join([
          tokenText('Sell'),
          tokenImage(m.image_url),
          tokenName(m.name || m.title || 'NFT'),
          tokenText('from'),
          ...tokenAddr(action.from),
          ...tokenPlatform(action),
        ])
      } else if (m.action === 'list') {
        return join([
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
  return [tokenText('Carried out an activity')]
}
