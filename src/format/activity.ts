import { components } from '../types/data'
import { Theme, themePlain } from './theme'
import {
  Token,
  token,
  tokenSeparator,
  tokenText,
  tokenValue,
  join,
  tokenPlatform,
  tokenPost,
  tokenAddr,
  tokenName,
} from './token'
import { getActions, getActionType } from './utils'

export function formatPlain(activity: components['schemas']['Transaction']): string {
  return format(activity, themePlain).join('')
}

/**
 * returns a plain string summary of the activity.
 */
export function format<T>(activity: components['schemas']['Transaction'], theme: Theme<T>): T[] {
  const ts = tokenizeActivity(activity)
  return ts.map((t) => theme[t.type](t.content))
}

/**
 * Returns a list of tokens that can be used to custom render the output of a activity, such as CLI output
 * all the symbols in blue color.
 */
export function tokenizeActivity(activity: components['schemas']['Transaction']): Token[] {
  const ts = getActions(activity)

  return ts.reduce((acc, t) => {
    if (acc.length === 0) {
      return tokenizeAction(activity, t)
    }

    return [...acc, tokenSeparator, ...tokenizeAction(activity, t)]
  }, [] as Token[])
}

/**
 * Returns a list of tokens that can be used to custom render the output of an action, such as CLI output
 */
export function tokenizeAction(
  activity: components['schemas']['Transaction'],
  action: components['schemas']['Action'],
): Token[] {
  const typ = getActionType(activity, action)

  const formatter = formatters[typ]

  if (!formatter) return [token('unknown', errActionType.message)]

  return formatter(action, activity)
}

interface Tokenizer {
  (action: components['schemas']['Action'], activity: components['schemas']['Transaction']): Token[]
}

interface Tokenizers {
  [key: string]: Tokenizer
}

const errActionType = new Error('Invalid action type')

const formatters: Tokenizers = {
  'transaction-transfer': (a, f) => {
    if (a.tag !== 'transaction' || a.type !== 'transfer') {
      throw errActionType
    }

    if (f.owner === a.from) {
      return join([tokenText('Transferred'), ...tokenValue(a.metadata), tokenText('to'), tokenAddr(a.to)])
    }

    return join([tokenText('Claimed'), ...tokenValue(a.metadata), tokenText('from'), tokenAddr(a.from)])
  },
  'transaction-mint': (a) => {
    if (a.tag !== 'transaction' || a.type !== 'mint') {
      throw errActionType
    }

    return join([tokenText('Minted'), ...tokenValue(a.metadata)])
  },
  'transaction-burn': (a) => {
    if (a.tag !== 'transaction' || a.type !== 'burn') {
      throw errActionType
    }

    return join([tokenText('Burned'), ...tokenValue(a.metadata)])
  },
  'transaction-approval-approve': (a) => {
    if (a.tag !== 'transaction' || a.type !== 'approval') {
      throw errActionType
    }

    return join([
      tokenText('Approved contract'),
      tokenAddr(a.metadata.contract_address),
      tokenText('about transferring'),
      ...tokenValue(a.metadata),
      tokenText('to'),
      tokenAddr(a.to),
    ])
  },
  'transaction-approval-revoke': (a) => {
    if (a.tag !== 'transaction' || a.type !== 'approval') {
      throw errActionType
    }

    return join([tokenText('Revoked the approval of contract'), tokenAddr(a.metadata.contract_address)])
  },
  'collectible-transfer': (a) => {
    if (a.tag !== 'collectible' || a.type !== 'transfer') {
      throw errActionType
    }

    return join([tokenText('Transferred NFT'), tokenName(a.metadata.name), tokenText('to'), tokenAddr(a.to)])
  },
  'collectible-auction-create': (a) => {
    if (a.tag !== 'collectible' || a.type !== 'auction') {
      throw errActionType
    }

    return join([tokenText('Transferred NFT'), tokenName(a.metadata.name), tokenText('to'), tokenAddr(a.to)])
  },
  'collectible-auction-bid': (a) => {
    if (a.tag !== 'collectible' || a.type !== 'auction') {
      throw errActionType
    }

    return join([tokenText('Made a bid'), ...tokenPlatform(a)])
  },
  'collectible-auction-cancel': (a) => {
    if (a.tag !== 'collectible' || a.type !== 'auction') {
      throw errActionType
    }

    return join([tokenText('Canceled an auction'), ...tokenPlatform(a)])
  },
  'collectible-auction-update': (a) => {
    if (a.tag !== 'collectible' || a.type !== 'auction') {
      throw errActionType
    }

    return join([tokenText('Updated an auction'), ...tokenPlatform(a)])
  },
  'collectible-auction-finalize': (a) => {
    if (a.tag !== 'collectible' || a.type !== 'auction') {
      throw errActionType
    }

    return join([tokenText('Won an auction'), ...tokenPlatform(a)])
  },
  'collectible-auction-invalidate': (a) => {
    if (a.tag !== 'collectible' || a.type !== 'auction') {
      throw errActionType
    }

    return join([tokenText('Invalidated an auction'), ...tokenPlatform(a)])
  },
  'collectible-trade': (a, txn) => {
    if (a.tag !== 'collectible' || a.type !== 'trade') {
      throw errActionType
    }

    if (txn.owner === a.from) {
      return join([tokenText('Sold NFT'), tokenName(a.metadata.name), tokenText('to'), tokenAddr(a.to)])
    }
    return join([tokenText('Bought NFT'), tokenName(a.metadata.name), tokenText('from'), tokenAddr(a.from)])
  },
  'collectible-mint': (a) => {
    if (a.tag !== 'collectible' || a.type !== 'mint') {
      throw errActionType
    }

    return join([tokenText('Minted NFT'), tokenName(a.metadata.name)])
  },
  'collectible-burn': (a) => {
    if (a.tag !== 'collectible' || a.type !== 'burn') {
      throw errActionType
    }

    return join([tokenText('Burned NFT'), tokenName(a.metadata.name)])
  },
  'collectible-approval-approve': (a) => {
    if (a.tag !== 'collectible' || a.type !== 'approval') {
      throw errActionType
    }

    return join([tokenText('Approved NFT'), tokenName(a.metadata.name), tokenText('to'), tokenAddr(a.to)])
  },
  'collectible-approval-revoke': (a) => {
    if (a.tag !== 'collectible' || a.type !== 'approval') {
      throw errActionType
    }

    return join([
      tokenText('Revoked the approval of NFT'),
      tokenName(a.metadata.name),
      tokenText('from'),
      tokenAddr(a.to),
    ])
  },
  'metaverse-mint': (a) => {
    if (a.tag !== 'metaverse' || a.type !== 'mint') {
      throw errActionType
    }

    return join([tokenText('Minted asset'), tokenName(a.metadata.name), ...tokenPlatform(a)])
  },
  'metaverse-trade': (a, txn) => {
    if (a.tag !== 'metaverse' || a.type !== 'trade') {
      throw errActionType
    }
    if (txn.owner === a.from) {
      return join([
        tokenText('Sold asset'),
        tokenName(a.metadata.name),
        tokenText('to'),
        tokenAddr(a.to),
        ...tokenPlatform(a),
      ])
    }

    return join([
      tokenText('Bought asset'),
      tokenName(a.metadata.name),
      tokenText('from'),
      tokenAddr(a.from),
      ...tokenPlatform(a),
    ])
  },
  'transaction-multisig-create': (a) => {
    if (a.tag !== 'transaction' || a.type !== 'multisig') {
      throw errActionType
    }

    return join([tokenText('Created a multisig transaction'), ...tokenPlatform(a)])
  },
  'transaction-multisig-add_owner': (a) => {
    if (a.tag !== 'transaction' || a.type !== 'multisig') {
      throw errActionType
    }

    return join([
      tokenText('Added an owner'),
      tokenAddr(a.metadata.owner),
      tokenText('to multisig'),
      ...tokenPlatform(a),
    ])
  },
  'transaction-multisig-remove_owner': (a) => {
    if (a.tag !== 'transaction' || a.type !== 'multisig') {
      throw errActionType
    }
    return join([
      tokenText('Removed an owner'),
      tokenAddr(a.metadata.owner),
      tokenText('to multisig'),
      ...tokenPlatform(a),
    ])
  },
  'transaction-multisig-change_threshold': (a) => {
    if (a.tag !== 'transaction' || a.type !== 'multisig') {
      throw errActionType
    }

    return join([tokenText('Changed the threshold to multisig'), ...tokenPlatform(a)])
  },
  'transaction-multisig-rejection': (a) => {
    if (a.tag !== 'transaction' || a.type !== 'multisig') {
      throw errActionType
    }

    return join([tokenText('Rejected a multisig'), ...tokenPlatform(a)])
  },
  'transaction-multisig-execution': (a) => {
    if (a.tag !== 'transaction' || a.type !== 'multisig') {
      throw errActionType
    }

    return join([tokenText('Executed a multisig'), ...tokenPlatform(a)])
  },
  'exchange-swap': (a) => {
    if (a.tag !== 'exchange' || a.type !== 'swap') {
      throw errActionType
    }

    return join([tokenText('Swapped'), ...tokenValue(a.metadata.from), tokenText('to'), ...tokenValue(a.metadata.to)])
  },
  'exchange-liquidity-add': (a) => {
    if (a.tag !== 'exchange' || a.type !== 'liquidity') {
      throw errActionType
    }

    return join([
      tokenText('Added'),
      ...tokenValue(a.metadata.tokens[0]),
      tokenText('to liquidity'),
      ...tokenPlatform(a),
    ])
  },
  'exchange-liquidity-remove': (a) => {
    if (a.tag !== 'exchange' || a.type !== 'liquidity') {
      throw errActionType
    }

    return join([
      tokenText('Removed'),
      ...tokenValue(a.metadata.tokens[0]),
      tokenText('from liquidity'),
      ...tokenPlatform(a),
    ])
  },
  'exchange-liquidity-collect': (a) => {
    if (a.tag !== 'exchange' || a.type !== 'liquidity') {
      throw errActionType
    }

    return join([
      tokenText('Collected'),
      ...tokenValue(a.metadata.tokens[0]),
      tokenText('from liquidity'),
      ...tokenPlatform(a),
    ])
  },
  'exchange-liquidity-supply': (a) => {
    if (a.tag !== 'exchange' || a.type !== 'liquidity') {
      throw errActionType
    }

    return join([
      tokenText('Supplied'),
      ...tokenValue(a.metadata.tokens[0]),
      tokenText('to liquidity'),
      ...tokenPlatform(a),
    ])
  },
  'exchange-liquidity-borrow': (a) => {
    if (a.tag !== 'exchange' || a.type !== 'liquidity') {
      throw errActionType
    }

    return join([
      tokenText('Borrowed'),
      ...tokenValue(a.metadata.tokens[0]),
      tokenText('from liquidity'),
      ...tokenPlatform(a),
    ])
  },
  'exchange-liquidity-repay': (a) => {
    if (a.tag !== 'exchange' || a.type !== 'liquidity') {
      throw errActionType
    }

    return join([
      tokenText('Repaid'),
      ...tokenValue(a.metadata.tokens[0]),
      tokenText('to liquidity'),
      ...tokenPlatform(a),
    ])
  },
  'exchange-liquidity-withdraw': (a) => {
    if (a.tag !== 'exchange' || a.type !== 'liquidity') {
      throw errActionType
    }

    return join([
      tokenText('Withdrew'),
      ...tokenValue(a.metadata.tokens[0]),
      tokenText('from liquidity'),
      ...tokenPlatform(a),
    ])
  },
  'social-post': (a) => {
    if (a.tag !== 'social' || a.type !== 'post') {
      throw errActionType
    }

    return join([tokenText('Published post'), tokenPost(a), ...tokenPlatform(a)])
  },
  'social-revise': (a) => {
    if (a.tag !== 'social' || a.type !== 'revise') {
      throw errActionType
    }

    return join([tokenText('Revised post'), tokenPost(a), ...tokenPlatform(a)])
  },
  'social-comment': (a) => {
    if (a.tag !== 'social' || a.type !== 'comment') {
      throw errActionType
    }

    return join([tokenText('Commented'), tokenPost(a), ...tokenPlatform(a)])
  },
  'social-share': (a) => {
    if (a.tag !== 'social' || a.type !== 'share') {
      throw errActionType
    }

    return join([tokenText('Shared post'), tokenPost(a), ...tokenPlatform(a)])
  },
  'social-mint': (a) => {
    if (a.tag !== 'social' || a.type !== 'mint') {
      throw errActionType
    }

    return join([tokenText('Minted post'), tokenPost(a), ...tokenPlatform(a)])
  },

  'social-proxy-appoint': (a) => {
    if (a.tag !== 'social' || a.type !== 'proxy') {
      throw errActionType
    }

    return join([tokenText('Appointed proxy to'), tokenAddr(a.to), ...tokenPlatform(a)])
  },
  'social-proxy-remove': (a) => {
    if (a.tag !== 'social' || a.type !== 'proxy') {
      throw errActionType
    }

    return join([tokenText('Removed proxy from'), tokenAddr(a.to), ...tokenPlatform(a)])
  },
  'social-profile-create': (a) => {
    if (a.tag !== 'social' || a.type !== 'profile') {
      throw errActionType
    }

    return join([tokenText('Created profile'), ...tokenPlatform(a)])
  },
  'social-profile-update': (a) => {
    if (a.tag !== 'social' || a.type !== 'profile') {
      throw errActionType
    }

    return join([tokenText('Updated profile'), ...tokenPlatform(a)])
  },
  'social-follow': (a) => {
    if (a.tag !== 'social' || a.type !== 'follow') {
      throw errActionType
    }

    return join([tokenText('Followed'), tokenAddr(a.to), ...tokenPlatform(a)])
  },
  'social-unfollow': (a) => {
    if (a.tag !== 'social' || a.type !== 'unfollow') {
      throw errActionType
    }

    return join([tokenText('Unfollowed'), tokenAddr(a.from), ...tokenPlatform(a)])
  },
  'donation-donate': (a) => {
    if (a.tag !== 'donation' || a.type !== 'donate') {
      throw errActionType
    }

    return join([tokenText('Donated'), ...tokenValue(a.metadata.token), ...tokenPlatform(a)])
  },
  'governance-propose': (a) => {
    if (a.tag !== 'governance' || a.type !== 'propose') {
      throw errActionType
    }

    return join([tokenText('Proposed'), ...tokenPlatform(a)])
  },
  'governance-vote': (a) => {
    if (a.tag !== 'governance' || a.type !== 'vote') {
      throw errActionType
    }

    return join([tokenText('Voted'), ...tokenPlatform(a)])
  },
  'exchange-staking-stake': (a) => {
    if (a.tag !== 'exchange' || a.type !== 'staking') {
      throw errActionType
    }

    return join([tokenText('Staked'), ...tokenValue(a.metadata.token), ...tokenPlatform(a)])
  },
  'exchange-staking-unstake': (a) => {
    if (a.tag !== 'exchange' || a.type !== 'staking') {
      throw errActionType
    }

    return join([tokenText('Unstaked'), ...tokenValue(a.metadata.token), ...tokenPlatform(a)])
  },
  'exchange-staking-claim': (a) => {
    if (a.tag !== 'exchange' || a.type !== 'staking') {
      throw errActionType
    }

    return join([tokenText('Claimed'), ...tokenValue(a.metadata.token), ...tokenPlatform(a)])
  },
  'transaction-bridge-deposit': (a) => {
    if (a.tag !== 'transaction' || a.type !== 'bridge') {
      throw errActionType
    }

    return join([tokenText('Deposited'), ...tokenValue(a.metadata.token), ...tokenPlatform(a)])
  },
  'transaction-bridge-withdraw': (a) => {
    if (a.tag !== 'transaction' || a.type !== 'bridge') {
      throw errActionType
    }

    return join([tokenText('Withdrew'), ...tokenValue(a.metadata.token), ...tokenPlatform(a)])
  },
}
