import { test, expect } from 'vitest'
import { formatPlain } from './activity'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { client } from '../data/client'

test.each([
  [
    '0x558981af55e59fc42da7684a3b803b7e078b4b233d6e0be6ea22dd6b3263b98d',
    'Transferred 1000 HOP to 0x5dac9baaeb5a89a9e79381fb9bc9964c9291f3de',
  ],
  [
    '0x74a2e680f4dab8f840e52044b75890a329107faa9db5bb312284542953280d33',
    'Claimed 5462.579429159777256061 BRIGHT from 0x79a7cad3ac4554c133dcaaa9bc3319385eb7fd5d',
  ],
  ['0xd8acf4db6882fca667b84e44d5518a00b1afee9cd82891f1f712647aff88b1ef', 'Minted 3000000 JUSTICE'],
  ['0x1e31940b3b2fd992a4e65963dba2f2d51e92417c58e850e729de6dabf32342ea', 'Burned 275500000.000000001 VOLT'],
  [
    '0x805b43d9f08352858effb9224df6ac43d1283ecaee115009707a9b2d23b722dc',
    'Approved contract 0xbe9895146f7af43049ca1c1ae358b0541ea49704 about transferring 115792089237316195423570985008687907853269984665640564039457.584007913129639935 cbETH to 0x5fae7e604fc3e24fd43a72867cebac94c65b404a',
  ],
  [
    '0x0f8888505c2dee133ab6574f28d1ff1e8b7854dea1a0f8ccfb9a39e3cd6a74b7',
    'Revoked the approval of contract 0xdac17f958d2ee523a2206206994597c13d831ec7',
  ],
  [
    '0x4440866ccab87ac40815f5c12fd6f824705c25931583db3534b6adeaeffb4fb9',
    'Transferred NFT "CityDAO Citizen" to 0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  ],
  ['0x3e55fa308f87b14f1f1abe23badf62731e547736819ed6c7e1e98c578d9c87aa', 'Made a bid on platform "Foundation"'],
  [
    '0x26e44a26e14cd20a0d4e1070d2c7bcab457c5271703d28daeac6a9f8b44eec9a',
    'Canceled an auction on platform "Foundation"',
  ],
  ['0x00d25b51a4af650b8a66421f55152383c84746639ea9a020daa2a5cabbddf555', 'Updated an auction on platform "Foundation"'],
  ['0xe45780a6de45e7be064ab00a8c53a82a6637c8cbb3e0ee317f57f84b1734d31f', 'Won an auction on platform "Nouns"'],
  [
    '0xb97bead4c050d14eec66a92b8e28d1bc5bdc4f12f8b8c197417f719a85b05262',
    'Invalidated an auction on platform "Foundation"',
  ],
  [
    '0xbf14c5b78920ca4c6cc7107c5901a5294fdbfaac0f2ce204f52f13e7e30f630e',
    'Bought NFT "Dungeon #2180" from 0x60797e62ca524170348a66efaae22386321926eb',
  ],
  [
    '0x097c15e4ebe2cbaa8d0b565999795e5fefb71e3c5c7ef42e9ab7d92c2a25980d',
    'Sold NFT "TurtleCase Gang #51" to 0xdae889230c6a20359d9aff984700c8a115ef8681',
  ],
  ['0x2cf11fe89422e90d58b7d60b4c6c5b62c320df0b7c9579ad1941496971b8c393', 'Minted NFT "Mask Up Up"'],
  ['0x23b828aa286459d9d20915c7e4d272a59d9cf8da0495798a7613f69449bc3285', `Burned NFT "punkess.lens's follower NFT"`],
  [
    '0xa5e6a2c53a74436bd6038c6091f26c77bf0443ef7185b65e8a00eea4657fda29',
    `Approved NFT "KudosToken" to 0x8d285739523fc2ac8ec9c9c229ee863c8c9bf8c8`,
  ],
  [
    '0x6830623126117af0e853074850dda9d1e7b9acea9120a0e95e64f6fc2e6b42e4',
    `Revoked the approval of NFT "The Divine Order Of the Zodiac" from 0xd9f425a46c9652658971bcb86a1c0d9e258c4644`,
  ],
  [
    '0x90a0f56e53e0f5a817136288a618a78da201ce4506f825fd3e57dfe445ff5575',
    `Minted asset "My First Carv" on platform "Carv"`,
  ],
  [
    '0x44bc70fd952f080a984a661edc9ac11e25805c8d3b1b9abc80a2a156f7b0a27f',
    `Sold asset "Aavegotchi GHST Token (PoS)" to 0xd4151c984e6cf33e04ffaaf06c3374b2926ecc64 on platform "Aavegotchi"; Sold asset "Aavegotchi GHST Token (PoS)" to 0xb208f8bb431f580cc4b216826affb128cd1431ab on platform "Aavegotchi"; Sold asset "Aavegotchi GHST Token (PoS)" to 0x27df5c6dcd360f372e23d5e63645ec0072d0c098 on platform "Aavegotchi"; Sold asset "Aavegotchi GHST Token (PoS)" to 0x47eb98abb32976bc1172ff6ad41831677e4865a0 on platform "Aavegotchi"; Bought asset "Essence" from 0x47eb98abb32976bc1172ff6ad41831677e4865a0 on platform "Aavegotchi"`,
  ],
  [
    '0x11db423456321efe84cd85a8374cf93bef65706e7a6422421a93a1f62b64d1d1',
    `Created a multisig transaction on platform "Gnosis Safe"`,
  ],
  [
    '0xfcc96dce4c316dee30870274df384ab8e91fd5aae9a5e2bdab82dd3809518096',
    `Added an owner 0x0b64B403D7C11A50581968e7eCAcbeb9e5230706 to multisig on platform "Gnosis Safe"; Executed a multisig on platform "Gnosis Safe"`,
  ],
  [
    '0x17ab9f030d0cac696564b21c750280c6c15368005f32446a0ceda0c285e5fd6e',
    `Removed an owner 0xB6C4cAA6A7ebb103570A555c54C960557C5555d0 to multisig on platform "Gnosis Safe"; Executed a multisig on platform "Gnosis Safe"`,
  ],
  [
    '0xa1d4e12fee99247d29c521b0d70f408dc18fa0f2a954b1f526333e1bf535291e',
    `Changed the threshold to multisig on platform "Gnosis Safe"; Executed a multisig on platform "Gnosis Safe"`,
  ],
  [
    '0x02cc01cdd0acd59c2a94ba4ff84e66f812c2c90b14bc251d8e6e973e81bb61b2',
    `Rejected a multisig on platform "Gnosis Safe"`,
  ],
  [
    '0x15033f3128e0f6f21e9908039e0e7f4d9233b3e474b2cb5349a54b26f6e56944',
    `Executed a multisig on platform "Gnosis Safe"`,
  ],
  [
    '0x0810db21380cec8f0afbf655917b2f0c64ba2035a7acf699fa5c3caa96abe298',
    `Swapped 1.34166964792207181 WMATIC to 0.0005 WETH`,
  ],
  [
    '0xc52a62ad6997a4f67d5725b16b27b3fc5bf6bb4076d1c67f5877223c2b85f8a3',
    `Added 20 ETH to liquidity on platform "Lido"`,
  ],
  [
    '0x4501aac1bff46c1e92e5ef139feddc0751a043144590250876fe9c717a9fa460',
    `Removed 168.973773602876386735 UNI from liquidity on platform "Uniswap"; Collected 0.015125608187761676 WETH from liquidity on platform "Uniswap"`,
  ],
  [
    '0x2c71dffa0622ad1244a65140c8b7ad2c561463d21ccffecd4d78881237762f56',
    `Supplied 1 DAI to liquidity on platform "AAVE"`,
  ],
  [
    '0xf4ae4547c9d8d3f248872628d6812eab3686dd74ef9ec9dcdc4b229b79920264',
    `Borrowed 0.88 DAI from liquidity on platform "AAVE"`,
  ],
  [
    '0xb7299a906edacde17231ea28e5348b032a2442470c841773e1a296e43fb6fc29',
    `Repaid 0.5 DAI to liquidity on platform "AAVE"`,
  ],
  [
    '0x0b759af6219efce6dd23d1db86a26239f328f88d4bd84980b0ebeaf00d7950de',
    `Withdrew 26.000004 USDT from liquidity on platform "AAVE"`,
  ],
  [
    '0x5428f9d518002c4d86639ba42841219885334ded64533603abe1729a288f4590',
    `Published post "@HM_Alexander 这几天观察下使用情况再决定" on platform "xSync"`,
  ],
  [
    '0x1f9586b323f432cd43a1de53a17bc655ce683327cd998334878eb262878f11a7',
    `Revised post "Piñata 1: RSS3 x Lens🍃" on platform "xLog"`,
  ],
  [
    '0x549a8a2e362e647faac70c9f1595950aa35f4d2028738521320b6364f3e9823a',
    `Commented "这个数字雨太酷了" on platform "xLog"`,
  ],
  [
    '0xc9deb029b752837d49265c83bc598d25a5301b28939822e97e12d1bb13be5a64',
    `Shared post "beat of the week 2023, week 19 of 52 \\"ignition\\" al..." on platform "Lenster"`,
  ],
  [
    '0xa4074d5729d44fd1ad033420c6d424e8224eebd595123339eec36f732b30acb3',
    `Minted post "Auto Mint Verify" on platform "crossbell"`,
  ],
  [
    '0x6b7c2144e9146af7cd53cffa3b86aae97a48017c03160517a8e14d9482ba43c6',
    `Appointed proxy to 0xa6f969045641cf486a747a2688f3a5a6d43cd0d8 on platform "Crossbell"`,
  ],
  ['0x96c13d5b8191a6d530475c7d3863dffe644ba821e4aa6c91ac391173df28cd20', `Created profile on platform "Crossbell"`],
  ['0x4d4d37a6e37affac633ca8fc1de82cd677afceffaea7060dcd4b9f20ee38e9b6', `Updated profile on platform "Crossbell"`],
  [
    '0x0dbb33e0229350b37f0b8bbfef4fba6654db66ae24525525d20f72e42acc5c61',
    `Followed 0xa6f969045641cf486a747a2688f3a5a6d43cd0d8 on platform "Crossbell"`,
  ],
  [
    '0xc9b8b658af20555163d073cb24f47f661b6244084aacc5f0b3a8255d4680c717',
    `Unfollowed 0xc46c7f9bf381c95d83e146fa8d1e7de2e554e2ab on platform "Lens"`,
  ],
  [
    '0x07f0f0627ecd575844a8a74f3dadfc54789360e9cfbd027b95da8cb1f0034f7f',
    `Donated 0.000246 WETH on platform "Gitcoin"; Donated 0.000246 WETH on platform "Gitcoin"; Donated 0.000246 WETH on platform "Gitcoin"; Donated 0.000246 WETH on platform "Gitcoin"; Donated 0.000246 WETH on platform "Gitcoin"; Donated 0.000246 WETH on platform "Gitcoin"; Donated 0.000246 WETH on platform "Gitcoin"; Donated 0.000246 WETH on platform "Gitcoin"; Donated 0.00001968 WETH on platform "Gitcoin"`,
  ],
  ['0xd810c4cf2f09737a6f833f1ec51eaa5504cbc0afeeb883a21a7e1c91c8a597e4', `Proposed on platform "Snapshot"`],
  /* cspell:disable-next-line */
  ['qmb9avwnzshcd48p6p2u96xsbt15ydvnxfamtvcpacivwp', `Voted on platform "Snapshot"`],
  ['0x9ee469ae65656df6871d4d199787b65b57c85aa7073ebeb1f5bfde6e83618306', `Staked 83264.41 sRSS3 on platform "RSS3"`],
  ['0x14b943cfed9b0a4c7f81661cf74d8fdd46747395563acf34054cacac44c54eeb', `Unstaked 83264.41 sRSS3 on platform "RSS3"`],
  [
    '0x3e79c6731924f94f1bdb034c4816bb84ee282b00746ea02a3e477ac9744048f5',
    `Claimed 1937.82564128083210309 RSS3 on platform "RSS3"`,
  ],
])('briefTransaction %s', async (address, expected) => {
  const activity = await get(address)
  expect(expected).toBe(formatPlain(activity))
})

async function get(addr: string) {
  const path = `src/format/activity-examples/${addr}.json`
  if (existsSync(path)) {
    return JSON.parse(readFileSync(path, 'utf-8'))
  }

  const activity = await client().activity(addr)

  writeFileSync(path, JSON.stringify(activity, null, 2))

  return activity
}
