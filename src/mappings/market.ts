import { assertNotNull } from "@subsquid/evm-processor";
import { Context, Log } from "../processor";
import * as MC from '../abis/Market'
import { getFactory, getMarket } from "../entities";
import {
  toFloat,
  toTokenDecimals,
  trackPriceOfTokensInMarket,
  updateFactoryDayData,
  updateMarketDayData,
  updateMarketHourData,
  updateMarketState
} from "../utils";
import { BigDecimal } from "@subsquid/big-decimal";
import { Swap, Mint, Burn } from "../model";

export async function handleSwap(ctx: Context, log: Log) {
  const tx = assertNotNull(log.transaction, 'Missing transaction')
  const contractAddress = log.address

  const data = MC.events.Swap.decode(log)
  const factory = assertNotNull(await getFactory(ctx), 'Missing factory')
  const market = assertNotNull(await getMarket(ctx, contractAddress), 'Missing market')

  await trackPriceOfTokensInMarket(ctx, log, market)
  await updateMarketState(ctx, log, market)

  const reserveUSD = toTokenDecimals(market.totalLp, market.decimals).mul(market.priceUSD)

  const netPtAmountUSD = toTokenDecimals(data.netPtOut, market.pt.decimals).abs().times(market.pt.priceUSD)
  const netSyAmountUSD = toTokenDecimals(data.netSyOut, market.sy.decimals).abs().times(market.sy.priceUSD)
  const trackedAmountUSD = netPtAmountUSD.plus(netSyAmountUSD).div(2)

  market.volumeUSD = toFloat(BigDecimal(market.volumeUSD).plus(trackedAmountUSD))
  factory.totalVolumeUSD = toFloat(BigDecimal(factory.totalVolumeUSD).plus(trackedAmountUSD))
  factory.totalLiquidityUSD = toFloat(BigDecimal(factory.totalLiquidityUSD).minus(market.reserveUSD).plus(reserveUSD))
  market.reserveUSD = toFloat(reserveUSD)
  await ctx.store.save(market)
  await ctx.store.save(factory)

  const swap = new Swap({
    id: `${tx.hash}-${tx.transactionIndex}`,
    timestamp: new Date(log.block.timestamp),
    market,
    caller: data.caller.toLowerCase(),
    receiver: data.receiver.toLowerCase(),
    netPtOut: BigDecimal(data.netPtOut),
    netSyOut: BigDecimal(data.netSyOut),
    amountUSD: toFloat(trackedAmountUSD)
  })
  await ctx.store.save(swap)

  const factoryDayData = await updateFactoryDayData(ctx, log, factory)
  const marketDayData = await updateMarketDayData(ctx, log, market)
  const marketHourData = await updateMarketHourData(ctx, log, market)
  
  factoryDayData.dailyVolumeUSD = toFloat(BigDecimal(factoryDayData.dailyVolumeUSD).plus(trackedAmountUSD))
  marketDayData.dailyVolumeUSD = toFloat(BigDecimal(marketDayData.dailyVolumeUSD).plus(trackedAmountUSD))
  marketHourData.hourlyVolumeUSD = toFloat(BigDecimal(marketHourData.hourlyVolumeUSD).plus(trackedAmountUSD))
  await ctx.store.save(factoryDayData)
  await ctx.store.save(marketDayData)
  await ctx.store.save(marketHourData)
}

export async function handleMint(ctx: Context, log: Log) {
  const tx = assertNotNull(log.transaction, 'Missing transaction')
  const contractAddress = log.address

  const data = MC.events.Mint.decode(log)
  const factory = assertNotNull(await getFactory(ctx), 'Missing factory')
  const market = assertNotNull(await getMarket(ctx, contractAddress), 'Missing market')

  await trackPriceOfTokensInMarket(ctx, log, market)
  await updateMarketState(ctx, log, market)

  const reserveUSD = toTokenDecimals(market.totalLp, market.decimals).mul(market.priceUSD)
  const netLpAmountUSD = toTokenDecimals(data.netLpMinted, market.decimals).abs().times(market.priceUSD)

  factory.totalLiquidityUSD = toFloat( BigDecimal(factory.totalLiquidityUSD).minus(market.reserveUSD).plus(reserveUSD))
  market.reserveUSD = toFloat(reserveUSD)
  await ctx.store.save(market)
  await ctx.store.save(factory)

  const mint = new Mint({
    id: `${tx.hash}-${tx.transactionIndex}`,
    timestamp: new Date(log.block.timestamp),
    market,
    receiver: data.receiver.toLowerCase(),
    netLpMinted: BigDecimal(data.netLpMinted),
    netPtUsed: BigDecimal(data.netPtUsed),
    netSyUsed: BigDecimal(data.netSyUsed),
    amountUSD: toFloat(netLpAmountUSD)
  })
  await ctx.store.save(mint)

  await updateFactoryDayData(ctx, log, factory)
  await updateMarketDayData(ctx, log, market)
  await updateMarketHourData(ctx, log, market)
}

export async function handleBurn(ctx: Context, log: Log) {
  const tx = assertNotNull(log.transaction, 'Missing transaction')
  const contractAddress = log.address

  const data = MC.events.Burn.decode(log)
  const factory = assertNotNull(await getFactory(ctx), 'Missing factory')
  const market = assertNotNull(await getMarket(ctx, contractAddress), 'Missing market')

  await trackPriceOfTokensInMarket(ctx, log, market)
  await updateMarketState(ctx, log, market)

  const reserveUSD = toTokenDecimals(market.totalLp, market.decimals).mul(market.priceUSD)
  const netLpAmountUSD = toTokenDecimals(data.netLpBurned, market.decimals).abs().times(market.priceUSD)
  
  factory.totalLiquidityUSD = toFloat(BigDecimal(factory.totalLiquidityUSD).minus(market.reserveUSD).plus(reserveUSD))
  market.reserveUSD = toFloat(reserveUSD)
  await ctx.store.save(market)
  await ctx.store.save(factory)

  const burn = new Burn({
    id: `${tx.hash}-${tx.transactionIndex}`,
    timestamp: new Date(log.block.timestamp),
    market,
    receiverPt: data.receiverPt.toLowerCase(),
    receiverSy: data.receiverSy.toLowerCase(),
    netLpBurned: BigDecimal(data.netLpBurned),
    netPtOut: BigDecimal(data.netPtOut),
    netSyOut: BigDecimal(data.netSyOut),
    amountUSD: toFloat(netLpAmountUSD)
  })
  await ctx.store.save(burn)

  await updateFactoryDayData(ctx, log, factory)
  await updateMarketDayData(ctx, log, market)
  await updateMarketHourData(ctx, log, market)
}
