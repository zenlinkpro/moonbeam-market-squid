import { Factory, FactoryDayData, Market, MarketDayData, MarketHourData } from "../model";
import { Context, Log } from "../processor";
import { getDayIdAndTimeStamp, getHourIdAndStartUnix } from "./time";
import * as MC from '../abis/Market'
import { zeroAddress } from "viem";
import { BigDecimal } from "@subsquid/big-decimal";

export async function updateFactoryDayData(ctx: Context, log: Log, factory: Factory) {
  const [dayId, dayStartTimestamp] = getDayIdAndTimeStamp(log.block.timestamp)

  let factoryDayData = await ctx.store.get(FactoryDayData, dayId.toString())
  if (!factoryDayData) {
    factoryDayData = new FactoryDayData({
      id: dayId.toString(),
      date: new Date(dayStartTimestamp),
      dailyVolumeUSD: 0,
    })
  }
  factoryDayData.totalLiquidityUSD = factory.totalLiquidityUSD
  factoryDayData.totalVolumeUSD = factory.totalVolumeUSD

  await ctx.store.save(factoryDayData)
  return factoryDayData
}

export async function updateMarketState(ctx: Context, log: Log, market: Market) {
  const mc = new MC.Contract({ ...ctx, block: log.block }, market.id)
  const state = await mc.readState(zeroAddress)
  market.totalLp = BigDecimal(state.totalLp)
  market.totalPt = BigDecimal(state.totalPt)
  market.totalSy = BigDecimal(state.totalSy)
  await ctx.store.save(market)
}

export async function updateMarketDayData(ctx: Context, log: Log, market: Market) {
  const [dayId, dayStartTimestamp] = getDayIdAndTimeStamp(log.block.timestamp)
  const dayMarketId = `${market.id}-${dayId}`

  let marketDayData = await ctx.store.get(MarketDayData, dayMarketId)
  if (!marketDayData) {
    marketDayData = new MarketDayData({
      id: dayMarketId,
      date: new Date(dayStartTimestamp),
      market,
      dailyVolumeUSD: 0,
    })
  }
  marketDayData.totalLp = market.totalLp
  marketDayData.totalPt = market.totalPt
  marketDayData.totalSy = market.totalSy
  marketDayData.reserveUSD = market.reserveUSD

  await ctx.store.save(marketDayData)
  return marketDayData
}

export async function updateMarketHourData(ctx: Context, log: Log, market: Market) {
  const [hourId, hourStartUnix] = getHourIdAndStartUnix(log.block.timestamp)
  const hourMarketId = `${market.id}-${hourId}`

  let marketHourData = await ctx.store.get(MarketHourData, hourMarketId)
  if (!marketHourData) {
    marketHourData = new MarketHourData({
      id: hourMarketId,
      hourStartUnix: BigInt(hourStartUnix),
      market,
      hourlyVolumeUSD: 0
    })
  }
  marketHourData.totalLp = market.totalLp
  marketHourData.totalPt = market.totalPt
  marketHourData.totalSy = market.totalSy
  marketHourData.reserveUSD = market.reserveUSD

  await ctx.store.save(marketHourData)
  return marketHourData
}
