import { Context, Log } from "../processor";
import * as PFC from '../abis/PriceFeed'
import * as OC from '../abis/PtLpOracle'
import * as SYC from '../abis/SY'
import { Market } from "../model";
import { PTLP_ORACLE_ADDRESS, PTLP_ORACLE_DEPLOYED_BLOCK } from "../constants";
import { BigDecimal } from "@subsquid/big-decimal";
import { toFloat } from "./math";

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

  return toFloat(BigDecimal(latestAnswer).div(10 ** decimals))
}


export async function trackPriceOfTokensInMarket(ctx: Context, log: Log, market: Market) {
  const { pt, yt, sy } = market
  const { yieldToken, baseAsset } = sy

  const syc = new SYC.Contract({ ...ctx, block: log.block }, sy.id)
  const exchangeRate = await syc.exchangeRate()

  baseAsset.priceUSD = await getTokenPriceFromFeed(ctx, log, baseAsset.id)
  yieldToken.priceUSD = toFloat(BigDecimal(baseAsset.priceUSD).mul(BigDecimal(exchangeRate).div(1e18)))
  sy.priceUSD = yieldToken.priceUSD
  await ctx.store.save(baseAsset)
  await ctx.store.save(yieldToken)
  await ctx.store.save(sy)

  if (log.block.height <= PTLP_ORACLE_DEPLOYED_BLOCK) return

  const oc = new OC.Contract({ ...ctx, block: log.block }, PTLP_ORACLE_ADDRESS)
  const [lpToAssetRate, ptToAssetRate] = await Promise.all([
    oc.getLatestLpToAssetRate(market.id),
    oc.getLatestPtToAssetRate(market.id)
  ])

  market.priceUSD = toFloat(
    BigDecimal(baseAsset.priceUSD)
      .mul(BigDecimal(lpToAssetRate).div(1e18))
      .mul((10 ** market.decimals) / (10 ** baseAsset.decimals))
  )
  pt.priceUSD = toFloat(BigDecimal(baseAsset.priceUSD).mul(BigDecimal(ptToAssetRate).div(1e18)))
  yt.priceUSD = toFloat(baseAsset.priceUSD - pt.priceUSD)
  await ctx.store.save(market)
  await ctx.store.save(pt)
  await ctx.store.save(yt)
}
