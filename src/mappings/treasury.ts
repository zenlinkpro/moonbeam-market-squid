import { Context, Log } from "../processor";
import * as TC from '../abis/Treasury'
import { Market, Token, TreasuryDistribute } from "../model";
import { BigDecimal } from "@subsquid/big-decimal";

export async function handleTreasuryDistribute(ctx: Context, log: Log) {
  const data = TC.events.RedeemSyToToken.decode(log)

  const market = await ctx.store.get(Market, data.market)
  const token = await ctx.store.get(Token, data.tokenOut)

  const id = `${data.market}-${data.wTime}`
  let treasuryDistribute = await ctx.store.get(TreasuryDistribute, id)
  if (!treasuryDistribute) {
    treasuryDistribute = new TreasuryDistribute({
      id,
      market,
      token,
      wTime: data.wTime,
      accumulatedAmount: BigDecimal(0)
    })
  }

  treasuryDistribute.accumulatedAmount = treasuryDistribute.accumulatedAmount.add(BigDecimal(data.amount))
  await ctx.store.save(treasuryDistribute)
}
