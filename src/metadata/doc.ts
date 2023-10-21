import { components } from '../types/data.js'

export const metadataDoc = {
  "transaction-transfer": {
    'ref': {} as components['schemas']['TransactionTransfer'],
    "tag": "transaction",
    "type": "transfer",
    "examples": [
      {
        "id": "0x000000c2fb1a34a175aa4bb001ac3b62c2fe62364e7cbe62aab9f635391f9fd1"
      }
    ]
  },
  "transaction-approval": {
    'ref': {} as components['schemas']['TransactionApproval'],
    "tag": "transaction",
    "type": "approval",
    "actions": [
      "approve",
      "revoke"
    ],
    "examples": [
      {
        "actionType": "approve",
        "id": "0x000002b417ce53396ccbe6e2d25f3a41fddae34496241bbbd6bb3bdec1202b84",
        "comment": "授权的代币 value 如果是 115792089237316195423570985008687907853269984665640564039457584007913129639935 可以换成 Infinite / Unlimited"
      },
      {
        "actionType": "revoke",
        "id": "0x00017e026678f05dd015965defe67e336a57afb986a5808cef0a9360e5575659",
        "comment": "Revoked the approval of"
      }
    ]
  },
  "transaction-mint": {
    'ref': {} as components['schemas']['TransactionTransfer'],
    "tag": "transaction",
    "type": "mint",
    "examples": [
      {
        "id": "0x00003fc6bea1d10b9110d631c8eeb84f2bb4450389b774d53dda9dd6743561ab",
        "comment": "Minted xx"
      }
    ]
  },
  "transaction-burn": {
    'ref': {} as components['schemas']['TransactionTransfer'],
    "tag": "transaction",
    "type": "burn",
    "examples": [
      {
        "id": "0x0012e3add224dcda949c2f04150ee5b719696d2192ecc539c3a4d33f3d4d0821",
        "comment": "Burned 123ETH"
      }
    ]
  },
  "transaction-multisig": {
    'ref': {} as components['schemas']['TransactionMultisig'],
    "tag": "transaction",
    "type": "multisig",
    "actions": [
      "create",
      "add_owner",
      "remove_owner",
      "change_threshold",
      "execution"
    ],
    "examples": [
      {
        "actionType": "create",
        "id": "0x00005c195a19697b221ea6341cdd61f439e37d7193391a96d114c2df83300c90",
        "comment": "Created a multisig transaction from 0xff...ff to 0xff...ff on Gnosis Safe"
      },
      {
        "actionType": "add_owner",
        "id": "0x002fc61cef05d5f6e6c54b236dc7c817233950065264e73e979b435e9d83a6d6",
        "comment": "Added 0x33...22 to owners of 0xff...ff on Gnosis Safe"
      },
      {
        "actionType": "remove_owner",
        "id": "0x0036591c0ac8c2b0d06bc7080e1c6851190366b917dc0101f9026b667e58bdbc",
        "comment": "Removed 0x33...22 from owners of 0xff...ff on Gnosis Safe"
      },
      {
        "actionType": "change_threshold",
        "id": "0x0013bc2054920660ca961c5cba695cc87a6845dc33d359dbe227865d3803dde9",
        "comment": "Changed the threshold of 0xff...ff to 3/5 on Gnosis Safe"
      },
      {
        "actionType": "execution",
        "id": "0x004be0e60b8375334b14caf6ac0f6beec0de419f841b332746a4a2f77e1a5d1c",
        "comment": "Executed a multisig transaction on Gnosis Safe of 20 USDT"
      }
    ]
  },
  "transaction-bridge": {
    'ref': {} as components['schemas']['TransactionBridge'],
    "tag": "transaction",
    "type": "bridge",
    "actions": [
      "deposit",
      "withdraw"
    ],
    "examples": [
      {
        "actionType": "deposit",
        "id": "0x000011998a7ce3715ea30a4264b246175fc1e59621a919e36d3aeb7686c55764",
        "comment": "Deposit xxx to xx Network"
      },
      {
        "actionType": "withdraw",
        "id": "0x00214bb9008957c1bed2f7d3c9eee8ee4716c4ed29341a9eebc7ac541805929c",
        "comment": "Withdraw xxx from xx Network"
      }
    ]
  },
  "transaction-deploy": {
    'ref': {} as components['schemas']['TransactionDeploy'],
    "tag": "transaction",
    "type": "deploy",
    "examples": [
      {
        "id": "0x01d8ac59932c90ea081feca9c5482b0da5881ea69044ab845994865325687234",
        "comment": "Deploy a contract xx"
      }
    ]
  },
  "collectible-transfer": {
    'ref': {} as components['schemas']['CollectibleTransfer'],
    "tag": "collectible",
    "type": "transfer",
    "examples": [
      {
        "id": "0x000020ba6fd5833d1d54c1be8ee392bf2c5535609d272012a5fe64a23513519c",
        "comment": "Transferred an NFT to 0xxx…xx"
      }
    ]
  },
  "collectible-approval": {
    'ref': {} as components['schemas']['CollectibleApproval'],
    "tag": "collectible",
    "type": "approval",
    "actions": [
      "approve",
      "revoke"
    ],
    "examples": [
      {
        "actionType": "approve",
        "id": "0x000005ec834f55bcd378f2f588e051501af336c1c6259dac20c8a3ee0551f661",
        "comment": "Approved an NFT for 0xxx…xx"
      },
      {
        "actionType": "revoke",
        "id": "0x00002f42ad98c0a0960847bcdba90054e8d21c49cadb074fcce4c0a730fff7cd",
        "comment": "Revoked an NFT for 0xxx…xx"
      }
    ]
  },
  "collectible-mint": {
    'ref': {} as components['schemas']['CollectibleTransfer'],
    "tag": "collectible",
    "type": "mint",
    "examples": [
      {
        "id": "0x000002803fd033274860a06bb8b7285c0595f550b73e621a92b7095fcd79afaa",
        "comment": "Minted an NFT"
      }
    ]
  },
  "collectible-burn": {
    'ref': {} as components['schemas']['CollectibleTransfer'],
    "tag": "collectible",
    "type": "burn",
    "examples": [
      {
        "id": "0x000071563c854e34c2534e7e961a53dd648411b62467d6c10b38a80b51d1f51e",
        "comment": "Burned an NFT"
      }
    ]
  },
  "collectible-trade": {
    'ref': {} as components['schemas']['CollectibleTrade'],
    "tag": "collectible",
    "type": "trade",
    "actions": [
      "buy",
      "sell",
      "offer",
      "set",
      "update",
      "cancel",
      "invalidate"
    ],
    "platforms": [
      "Blur",
      "Nouns",
      "OpenSea"
    ],
    "examples": [
      {
        "actionType": "buy",
        "id": "0x0000020e0e1758d442865233da076d62a5bfa53992229079383096f9fddcc22d",
        "comment": "Bought an NFT from 0xxx…xx"
      },
      {
        "actionType": "sell",
        "id": "0x000043e7d363d7d269c279e888cfe6b569e8a48f315736a00bdf06ff8627cafc",
        "comment": "Sold an NFT to 0xxx…xx"
      },
      {
        "actionType": "offer",
        "id": "0x7076d8902b2256666407108bcaae44a207d37e1b2aac379a87f053aee0af0962",
        "comment": "Offered an NFT to 0xxx…xx"
      },
      {
        "actionType": "set",
        "id": "0x57b6aa88319e01dc21f01caf898ae04a5bdc7c477da7d562b648ea3563191890",
        "comment": "Set an NFT for sale"
      },
      {
        "actionType": "update",
        "id": "0x6cd99adfdedf1ef1bb7b9958f41425f6ea15a53a7e5dadcac84900d8d179a4d9",
        "comment": "Updated an NFT for sale"
      },
      {
        "actionType": "cancel",
        "id": "0xb6412dc1f5852f73355f135f2d916b1d37a6d696d305585128c13c2fb1374f3d",
        "comment": "Cancelled an NFT for sale"
      },
      {
        "actionType": "invalidate",
        "id": "0x38baff44e24e7c1df9761f3c9253647ad9edbc08dc254063071b33ff1a4638af",
        "comment": "Invalidated an NFT for sale"
      }
    ]
  },
  "collectible-auction": {
    'ref': {} as components['schemas']['CollectibleAuction'],
    "tag": "collectible",
    "type": "auction",
    "actions": [
      "create",
      "bid",
      "cancel",
      "update",
      "finalize",
      "invalidate"
    ],
    "platforms": [
      "Foundation",
      "Zora",
      "Nouns"
    ],
    "examples": [
      {
        "actionType": "create",
        "id": "0x000590259fdd6ad57f4071878383ac3c378a88c491409e00a444275bc0d3179b",
        "comment": "Created an auction on platform xxxx"
      },
      {
        "actionType": "bid",
        "id": "0x00081a2fcf00d00d644b7998330ef4a795419be906b8b2d575bda475e7ea2ad4",
        "comment": "Made a bid on platform xxxx"
      },
      {
        "actionType": "cancel",
        "id": "0x0012823ee026f352158ae0b1ceaaef3f7ac7b757fc49501717fc6363455a601b",
        "comment": "Canceled an auction on platform xxxx"
      },
      {
        "actionType": "update",
        "id": "0x001a0608a2e4273e441e28a5a3f1d41cc3596da3d8d38c842c5d53a76c374b95",
        "comment": "Updated an auction on platform xxxx"
      },
      {
        "actionType": "finalize",
        "id": "0x0006c67b092640082e392c4a86e2a8cbdcf47a8cc31f9ca31f9f7c87a5cb81f8",
        "comment": "Won an auction on platform xxxx"
      },
      {
        "actionType": "invalidate",
        "id": "0x2787fe62e3f31207524217fed8788329560da5964dbf90f791651aaac00b9131",
        "comment": "Invalidated an auction on platform xxxx"
      }
    ]
  },
  "exchange-swap": {
    'ref': {} as components['schemas']['ExchangeSwap'],
    "tag": "exchange",
    "type": "swap",
    "platforms": [
      "1inch",
      "Cow",
      "Rainbow",
      "Uniswap",
      "Zerion"
    ],
    "examples": [
      {
        "id": "0x000005461c52e2eb738744246388f8b04ad94c9ebb4b87668f9f1936b1816512",
        "comment": "Swapped 1 USDT to 1 ETH on platform xxxx"
      }
    ]
  },
  "exchange-liquidity": {
    'ref': {} as components['schemas']['ExchangeLiquidity'],
    "tag": "exchange",
    "type": "liquidity",
    "actions": [
      "add",
      "remove",
      "collect",
      "supply",
      "borrow",
      "repay",
      "withdraw"
    ],
    "platforms": [
      "Lido",
      "Uniswap"
    ],
    "examples": [
      {
        "actionType": "add",
        "id": "0x00003f9c21c7f631474c1bbc12f0946b3f093b520fb707d9cc661a25b58e4ccd",
        "comment": "Added 1 USDT to liquidity on xxxx"
      },
      {
        "actionType": "remove",
        "id": "0x0001b57e2fc71a92426ed1bacdd55430767b8c2aa343c777c4daa48de57e8d9e",
        "comment": "Removed 1 USDT from liquidity on xxxx"
      },
      {
        "actionType": "collect",
        "id": "0x0006b932a5f8aa61e5ac2c62bdc7e8b9b90112418bc22f24604dd421858e6b88",
        "comment": "Added to liquidity on xxxx"
      },
      {
        "actionType": "supply",
        "id": "0x0020cbebcafbbd57dd4a8dbcfca7372f887f25e4662c000cfc9f392362c11912",
        "comment": "Supplied liquidity on xxxx"
      },
      {
        "actionType": "borrow",
        "id": "0x0095dd2588fdec8af52a28b792a89f0536745b17bdbace39e392041f1eb7d5a6",
        "comment": "Borrowed 1 USDT on xxxx"
      },
      {
        "actionType": "repay",
        "id": "0x008878041c0a55259ce0b2a89eb07a8620b1256006c8edb659baed38bc844b88",
        "comment": "Repaid 1 USDT on xxxx"
      },
      {
        "actionType": "withdraw",
        "id": "0x00c9f3aa1fd06fe17cca96bb444f0aaca610e878626dc9baf489d3550a22041e",
        "comment": "Withdrew 1 USDT on xxxx"
      }
    ]
  },
  "exchange-loan": {
    'ref': {} as components['schemas']['ExchangeLoan'],
    "tag": "exchange",
    "type": "loan",
    "actions": [
      "create",
      "repay",
      "refinance",
      "liquidate",
      "seize"
    ],
    "platforms": [
      "BendDAO",
      "Blur"
    ],
    "examples": [
      {
        "actionType": "create",
        "id": "0x074190b9714fc4e306671252d60245ffb6574e336c174ff1e47f77cebe26891c",
        "comment": "Create a loan on xxx"
      },
      {
        "actionType": "repay",
        "id": "0x07346d4e4c0c2d547ee0927c607a2e1e717507ab01c13175c54d08313eb0c2fb",
        "comment": "Repay a loan on xxx"
      },
      {
        "actionType": "refinance",
        "id": "0x0000145456a508beab27e38dbd14fbeec925e95f4f5eda7fc8560f4f5e529820",
        "comment": "Refinance a loan on xxx"
      },
      {
        "actionType": "liquidate",
        "id": "0xbe78726deb3efb4ea062517fe23cdc11312bea4fda8a5903693f9030fd8b472e",
        "comment": "Liquidate a loan on xxx"
      },
      {
        "actionType": "seize",
        "id": "0xa7e278148dbac1685eae105adad72183ed9ea9170a087fb7d2f742b2fd198b1a",
        "comment": "Seize a loan on xxx"
      }
    ]
  },
  "donation-donate": {
    'ref': {} as components['schemas']['Donation'],
    "tag": "donation",
    "type": "donate",
    "platforms": [
      "Gitcoin"
    ],
    "examples": [
      {
        "id": "0x5a19dd1c81fa00599655bcd4b49ae27baca55ab372a8387d40201bae5ab3eddd",
        "comment": "Donated on xxxx"
      }
    ]
  },
  "governance-propose": {
    'ref': {} as components['schemas']['GovernanceProposal'],
    "tag": "governance",
    "type": "propose"
  },
  "governance-vote": {
    'ref': {} as components['schemas']['GovernanceVote'],
    "tag": "governance",
    "type": "vote"
  },
  "social-post": {
    'ref': {} as components['schemas']['SocialPost'],
    "tag": "social",
    "type": "post",
    "examples": [
      {
        "id": "0xa7f1fc265246844407518f165e2d30a70aea79eb14dd0d00deb589b270d7519c",
        "comment": "Publish a note on platform xxxx"
      }
    ]
  },
  "social-comment": {
    'ref': {} as components['schemas']['SocialPost'],
    "tag": "social",
    "type": "comment",
    "examples": [
      {
        "id": "0x1faacf487d304e601e100b271fcebc108ec45ff7c11fa68962c6cd09576d8eb4",
        "comment": "Commented on platform xxxx"
      }
    ]
  },
  "social-share": {
    'ref': {} as components['schemas']['SocialPost'],
    "tag": "social",
    "type": "share",
    "examples": [
      {
        "id": "0xddd79ba4fde200f82192ca0306097e4c80904e74c96b64684ff66d818b0379a0",
        "comment": "Shared a note on platform xxxx"
      }
    ]
  },
  "social-mint": {
    'ref': {} as components['schemas']['SocialPost'],
    "tag": "social",
    "type": "mint",
    "examples": [
      {
        "id": "0xafd4f260528c8274345a6447028d84bc2303eddb0e8bca1f2006a106632cda9a",
        "comment": "Minted a post on platform xxx"
      }
    ]
  },
  "social-profile": {
    'ref': {} as components['schemas']['SocialProfile'],
    "tag": "social",
    "type": "profile",
    "actions": [
      "create",
      "update",
      "renew",
      "wrap",
      "unwrap"
    ],
    "platforms": [
      "Crossbell",
      "Lens",
      "ENS"
    ],
    "examples": [
      {
        "actionType": "create",
        "id": "0x14717ac164ae9606abb01567d02c9053758b2821a4c666204b730e49e21cd8d1",
        "comment": "Created a profile on xxxx"
      },
      {
        "actionType": "update",
        "id": "0x8e05239a8a48bea6aeec99321a3150a9668945e041ff60e351c640de34cc4b89",
        "comment": "Updated a profile on xxx"
      },
      {
        "actionType": "renew",
        "id": "0x01d8db40858063a945cfe5d22b62eeef3371b065f29353a68a0d4f578ca21d1d",
        "comment": "Renewed a profile on xxxx"
      },
      {
        "actionType": "wrap",
        "id": "0x5597682570383f1a57a82b3b77673a4561d472d0fdc6ba324d8e687e789c9df9",
        "comment": "Wrapped a profile on xxxx"
      },
      {
        "actionType": "unwrap",
        "id": "0xe2e6f42795b4bbff284d4d68b68e9099ddb7dcb4dcdbb21add936f0e63e01fa7",
        "comment": "Unwrapped a profile on xxxx"
      }
    ]
  },
  "social-proxy": {
    'ref': {} as components['schemas']['SocialProxy'],
    "tag": "social",
    "type": "proxy",
    "actions": [
      "appoint",
      "remove"
    ],
    "platforms": [
      "Crossbell"
    ],
    "examples": [
      {
        "actionType": "appoint",
        "id": "0x002c594c5c76489420b05ad7f4dda9ee096908290d776a307f0e164980553138",
        "comment": "Appointed a proxy on xxxx"
      },
      {
        "actionType": "remove",
        "id": "0x030706597f3c4502896339c8cfd30c088f857abca78033c00cdc3b6605f60c2c",
        "comment": "Appointed a proxy on xxxx"
      }
    ]
  },
  "social-revise": {
    'ref': {} as components['schemas']['SocialPost'],
    "tag": "social",
    "type": "revise",
    "platforms": [
      "Crossbell",
      "Mirror"
    ],
    "examples": [
      {
        "id": "GzlgoJetNg9yEI0nRlpx1c4vOww8mDh5Auyy5P9I5uE",
        "comment": "Revised a note on platform xxxx"
      }
    ]
  },
  "social-delete": {
    'ref': {} as components['schemas']['SocialPost'],
    "tag": "social",
    "type": "delete",
    "platforms": [
      "Crossbell"
    ],
    "examples": [
      {
        "id": "0x071c79c1c380c984657b5fe8ea9eb61459e8ac596bbc2a36145a47f7c32c5e3f",
        "comment": "Deleted a note on platform xxxx"
      }
    ]
  },
  "metaverse-transfer": {
    'ref': {} as components['schemas']['MetaverseTransfer'],
    "tag": "metaverse",
    "type": "transfer",
    "examples": [
      {
        "id": "0x096400ee4246f99aea883ec4bde65c2dd0a23ab708c28bf0540832bf6c69664e",
        "comment": "Transferred a metaverse asset on xxxx"
      }
    ]
  },
  "metaverse-mint": {
    'ref': {} as components['schemas']['MetaverseTransfer'],
    "tag": "metaverse",
    "type": "mint",
    "examples": [
      {
        "id": "0x08effd820f49f2b25c5fcfccedb9384f5d5c35037094b5e492b0c6b75ecfc32b",
        "comment": "Minted a metaverse asset on xxxx"
      }
    ]
  },
  "metaverse-burn": {
    'ref': {} as components['schemas']['MetaverseTransfer'],
    "tag": "metaverse",
    "type": "burn"
  },
  "metaverse-trade": {
    'ref': {} as components['schemas']['MetaverseTrade'],
    "tag": "metaverse",
    "type": "trade",
    "actions": [
      "buy",
      "sell",
      "list"
    ],
    "platforms": [
      "Aavegotchi",
      "PlanetIX"
    ],
    "examples": [
      {
        "actionType": "buy",
        "id": "0x001a2d0a33b8e67d8056e94c81e57727541c85906efd0134ff72e0d026a1d47f",
        "comment": "Buy a metaverse asset on xxxx"
      },
      {
        "actionType": "sell",
        "id": "0x2a9b1776be9c0dfad8c17536bbf6b4831b49cf482d186938a3388d094d1175b9",
        "comment": "Sell a metaverse asset on xxxx"
      },
      {
        "actionType": "list",
        "id": "0x03190712b9bf73189595aa26baa69a680856591cf1c51e7949d1604d8ae38e72",
        "comment": "List a metaverse asset on xxxx"
      }
    ]
  }
}
