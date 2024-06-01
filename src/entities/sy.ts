import { SY } from "../model";
import { Context, Log } from "../processor";
import * as SYC from '../abis/SY'
import { getOrCreateToken } from "./token";
import { BigDecimal } from "@subsquid/big-decimal";

export async function getOrCreateSy(ctx: Context, log: Log, address: string): Promise<SY> {
  let sy = await ctx.store.get(SY, address)

  if (!sy) {
    const syc = new SYC.Contract({ ...ctx, block: log.block }, address)

    const [name, symbol, decimals, yieldTokenAddress, assetInfo, exchangeRate] = await Promise.all([
      syc.name(),
      syc.symbol(),
      syc.decimals(),
      syc.yieldToken(),
      syc.assetInfo(),
      syc.exchangeRate()
    ])

    const [yieldToken, baseAsset] = await Promise.all([
      getOrCreateToken(ctx, log, yieldTokenAddress),
      getOrCreateToken(ctx, log, assetInfo.assetAddress)
    ])

    yieldToken.priceUSD = parseFloat(
      BigDecimal(baseAsset.priceUSD).mul(BigDecimal(exchangeRate).div(1e18)).toFixed(6)
    )
    await ctx.store.save(yieldToken)

    sy = new SY({
      id: address,
      name,
      symbol,
      decimals,
      priceUSD: yieldToken.priceUSD,
      yieldToken,
      baseAsset
    })

    await ctx.store.save(sy)
  }

  return sy
}
