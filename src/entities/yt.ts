import { YT } from "../model";
import { Context, Log } from "../processor";
import * as YTC from '../abis/PT'

export async function getOrCreateYt(ctx: Context, log: Log, address: string): Promise<YT> {
  let yt = await ctx.store.get(YT, address)

  if (!yt) {
    const ytc = new YTC.Contract({ ...ctx, block: log.block }, address)

    const [name, symbol, decimals] = await Promise.all([
      ytc.name(),
      ytc.symbol(),
      ytc.decimals(),
    ])

    yt = new YT({
      id: address,
      name,
      symbol,
      decimals,
      priceUSD: 0,
    })

    await ctx.store.save(yt)
  }

  return yt
}
