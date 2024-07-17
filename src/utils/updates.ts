import { Factory, FactoryDayData, Market, MarketDayData, MarketHourData } from "../model";
import { Context, Log } from "../processor";
import { getDayIdAndTimeStamp, getHourIdAndStartUnix } from "./time";
import * as MC from '../abis/Market'
import { zeroAddress } from "viem";
import { BigDecimal } from "@subsquid/big-decimal";
import { LessThanOrEqual } from "typeorm";
import { differenceInDays, getUnixTime } from "date-fns";
import { calcImpliedAPY, toFloat } from "./math";

export async function updateFactoryDayData(ctx: Context, log: Log, factory: Factory) {
  const [dayId, dayStartTimestamp] = getDayIdAndTimeStamp(log.block.timestamp)

  let factoryDayData = await ctx.store.get(FactoryDayData, dayId.toString())
  if (!factoryDayData) {
    factoryDayData = new FactoryDayData({
      id: dayId.toString(),
      date: new Date(dayStartTimestamp),
      dailyVolumeUSD: 0,
      dailyFeeUSD: 0
    })
  }
  factoryDayData.totalLiquidityUSD = factory.totalLiquidityUSD
  factoryDayData.totalVolumeUSD = factory.totalVolumeUSD
  factoryDayData.totalFeeUSD = factory.totalFeeUSD

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

export async function updateMarketDayAPYs(
  ctx: Context,
  log: Log,
  market: Market,
  marketDayData: MarketDayData
) {
  const dayDatas = await ctx.store.find(MarketDayData, {
    where: {
      market,
      date: LessThanOrEqual(new Date(getUnixTime(log.block.timestamp) * 1000)),
    },
    take: 8,
    order: { date: 'DESC' },
  })
  const length = dayDatas.length
  if (length <= 2) return

  const firstData = dayDatas[length - 1]
  const lastData = dayDatas[1]

  const diffInDays = differenceInDays(lastData.date, firstData.date)
  const daysToMaturity = differenceInDays(
    new Date(market.expiry.toNumber() * 1000),
    new Date(getUnixTime(log.block.timestamp) * 1000)
  )

  const lastDayRate = lastData.yieldTokenPrice / lastData.baseAssetPrice
  const firstDayRate = firstData.yieldTokenPrice / firstData.baseAssetPrice
  const underlyingAPY = toFloat((lastDayRate / firstDayRate - 1) * (365 / diffInDays))
  const impliedAPY = toFloat(calcImpliedAPY(lastData.ytPrice, lastData.ptPrice, daysToMaturity))
  marketDayData.underlyingAPY = underlyingAPY
  marketDayData.impliedAPY = impliedAPY
  marketDayData.longYieldROI = market.sy.baseAsset.priceUSD && market.yt.priceUSD
    ? underlyingAPY * (daysToMaturity / 365) * (market.sy.baseAsset.priceUSD / market.yt.priceUSD) - 1
    : 0
  marketDayData.fixedROI = market.pt.priceUSD
    ? (market.sy.baseAsset.priceUSD - market.pt.priceUSD) / market.pt.priceUSD
    : 0
  await ctx.store.save(marketDayData)
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
      dailyFeeUSD: 0,
      underlyingAPY: 0,
      impliedAPY: 0,
      longYieldROI: 0,
      fixedROI: 0
    })
  }
  marketDayData.totalLp = market.totalLp
  marketDayData.totalPt = market.totalPt
  marketDayData.totalSy = market.totalSy
  marketDayData.reserveUSD = market.reserveUSD
  marketDayData.baseAssetPrice = market.sy.baseAsset.priceUSD
  marketDayData.yieldTokenPrice = market.sy.yieldToken.priceUSD
  marketDayData.ptPrice = market.pt.priceUSD
  marketDayData.ytPrice = market.yt.priceUSD

  await ctx.store.save(marketDayData)
  await updateMarketDayAPYs(ctx, log, market, marketDayData)
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
      hourlyVolumeUSD: 0,
      hourlyFeeUSD: 0
    })
  }
  marketHourData.totalLp = market.totalLp
  marketHourData.totalPt = market.totalPt
  marketHourData.totalSy = market.totalSy
  marketHourData.reserveUSD = market.reserveUSD

  await ctx.store.save(marketHourData)
  return marketHourData
}
