import { SY } from "../model";
import { Context, Log } from "../processor";
import * as SYC from '../abis/SY'
import { getOrCreateToken } from "./token";

export async function getOrCreateSy(ctx: Context, log: Log, address: string): Promise<SY> {
  let sy = await ctx.store.get(SY, address)

  if (!sy) {
    const syc = new SYC.Contract({ ...ctx, block: log.block }, address)

    const [name, symbol, decimals, yieldTokenAddress] = await Promise.all([
      syc.name(),
      syc.symbol(),
      syc.decimals(),
      syc.yieldToken()
    ])

    const yieldToken = await getOrCreateToken(ctx, log, yieldTokenAddress)

    sy = new SY({
      id: address,
      name,
      symbol,
      decimals,
      priceUSD: 0,
      yieldToken
    })

    await ctx.store.save(sy)
  }

  return sy
}
