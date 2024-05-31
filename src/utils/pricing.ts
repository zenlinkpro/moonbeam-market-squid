import { Context, Log } from "../processor";
import * as PFC from '../abis/PriceFeed'

const ChainlinkPriceFeeds: Record<string, string> = {
  // xcDOT
  '0xffffffff1fcacbd218edc0eba20fc2308c778080': '0x1466b4bD0C4B6B8e1164991909961e0EE6a66d8c'
}

export async function getTokenPriceFromFeed(ctx: Context, log: Log, tokenId: string) {
  const feedAddress = ChainlinkPriceFeeds[tokenId]

  if (!feedAddress) return 0

  const pfc = new PFC.Contract({ ...ctx, block: log.block }, feedAddress)
  const [latestAnswer, decimals] = await Promise.all([
    pfc.latestAnswer(),
    pfc.decimals()
  ])

  return parseInt(latestAnswer.toString()) / (10 ** decimals)
}
