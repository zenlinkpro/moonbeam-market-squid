import { assertNotNull } from "@subsquid/evm-processor";
import { Context, Log } from "../processor";
import * as MC from '../abis/Market'
import { getFactory, getMarket } from "../entities";
import {
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

  market.volumeUSD = parseFloat(
    BigDecimal(market.volumeUSD).plus(trackedAmountUSD).toFixed(6)
  )
  factory.totalVolumeUSD = parseFloat(
    BigDecimal(factory.totalVolumeUSD).plus(trackedAmountUSD).toFixed(6)
  )
  factory.totalLiquidityUSD = parseFloat(
    BigDecimal(factory.totalLiquidityUSD).minus(market.reserveUSD).plus(reserveUSD).toFixed(6)
  )
  market.reserveUSD = parseFloat(reserveUSD.toFixed(6))
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
    amountUSD: parseFloat(trackedAmountUSD.toFixed(6))
  })
  await ctx.store.save(swap)

  const factoryDayData = await updateFactoryDayData(ctx, log, factory)
  const marketDayData = await updateMarketDayData(ctx, log, market)
  const marketHourData = await updateMarketHourData(ctx, log, market)
  
  factoryDayData.dailyVolumeUSD = parseFloat(
    BigDecimal(factoryDayData.dailyVolumeUSD).plus(trackedAmountUSD).toFixed(6)
  )
  marketDayData.dailyVolumeUSD = parseFloat(
    BigDecimal(marketDayData.dailyVolumeUSD).plus(trackedAmountUSD).toFixed(6)
  )
  marketHourData.hourlyVolumeUSD = parseFloat(
    BigDecimal(marketHourData.hourlyVolumeUSD).plus(trackedAmountUSD).toFixed(6)
  )
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

  factory.totalLiquidityUSD = parseFloat(
    BigDecimal(factory.totalLiquidityUSD).minus(market.reserveUSD).plus(reserveUSD).toFixed(6)
  )
  market.reserveUSD = parseFloat(reserveUSD.toFixed(6))
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
    amountUSD: parseFloat(netLpAmountUSD.toFixed(6))
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
  
  factory.totalLiquidityUSD = parseFloat(
    BigDecimal(factory.totalLiquidityUSD).minus(market.reserveUSD).plus(reserveUSD).toFixed(6)
  )
  market.reserveUSD = parseFloat(reserveUSD.toFixed(6))
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
    amountUSD: parseFloat(netLpAmountUSD.toFixed(6))
  })
  await ctx.store.save(burn)

  await updateFactoryDayData(ctx, log, factory)
  await updateMarketDayData(ctx, log, market)
  await updateMarketHourData(ctx, log, market)
}
