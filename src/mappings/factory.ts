import { BigDecimal } from "@subsquid/big-decimal";
import { Context, Log } from "../processor";
import * as FC from '../abis/Factory'
import * as MC from '../abis/Market'
import { Factory, Market } from "../model";
import { getOrCreatePt, getOrCreateSy, getOrCreateYt } from "../entities";
import { zeroAddress } from "viem";

export async function handleNewMarket(ctx: Context, log: Log) {
  const contractAddress = log.address
  const data = FC.events.CreateNewMarket.decode(log)

  let factory = await ctx.store.get(Factory, contractAddress)
  if (!factory) {
    factory = new Factory({
      id: contractAddress,
      marketCount: 0,
      totalVolumeUSD: 0,
      totalFeeUSD: 0,
      totalLiquidityUSD: 0
    })
  }

  factory.marketCount += 1
  await ctx.store.save(factory)

  const mc = new MC.Contract({ ...ctx, block: log.block }, data.market)
  const [name, symbol, decimals, tokens, state] = await Promise.all([
    mc.name(),
    mc.symbol(),
    mc.decimals(),
    mc.readTokens(),
    mc.readState(zeroAddress)
  ])

  const [sy, pt, yt] = await Promise.all([
    getOrCreateSy(ctx, log, tokens._SY),
    getOrCreatePt(ctx, log, tokens._PT),
    getOrCreateYt(ctx, log, tokens._YT)
  ])

  const market = new Market({
    id: data.market,
    name,
    symbol,
    decimals,
    priceUSD: 0,
    sy,
    pt,
    yt,
    totalLp: BigDecimal(state.totalLp),
    totalPt: BigDecimal(state.totalPt),
    totalSy: BigDecimal(state.totalSy),
    reserveUSD: 0,
    volumeUSD: 0,
    feeUSD: 0,
    expiry: BigDecimal(state.expiry)
  })

  await ctx.store.save(market)
}
