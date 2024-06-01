import { FACTORY_ADDRESS } from "../constants"
import { Market, Factory } from "../model"
import { Context } from "../processor"

export async function getFactory(ctx: Context) {
  const factory = await ctx.store.get(Factory, FACTORY_ADDRESS)

  return factory
}


export async function getMarket(ctx: Context, id: string) {
  const market = await ctx.store.get(Market, {
    where: { id },
    relations: {
      yt: true,
      pt: true,
      sy: {
        baseAsset: true,
        yieldToken: true
      }
    },
  })

  return market
}
