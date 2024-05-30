import { PT } from "../model";
import { Context, Log } from "../processor";
import * as PTC from '../abis/PT'

export async function getOrCreatePt(ctx: Context, log: Log, address: string): Promise<PT> {
  let pt = await ctx.store.get(PT, address)

  if (!pt) {
    const ptc = new PTC.Contract({ ...ctx, block: log.block }, address)

    const [name, symbol, decimals] = await Promise.all([
      ptc.name(),
      ptc.symbol(),
      ptc.decimals(),
    ])

    pt = new PT({
      id: address,
      name,
      symbol,
      decimals,
      priceUSD: 0,
    })

    await ctx.store.save(pt)
  }

  return pt
}
