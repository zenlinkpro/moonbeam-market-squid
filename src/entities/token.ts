import { Token } from "../model";
import { Context, Log } from "../processor";
import * as ERC20 from '../abis/ERC20'
import { getTokenPriceFromFeed } from "../utils";

export async function getOrCreateToken(ctx: Context, log: Log, address: string): Promise<Token> {
  let token = await ctx.store.get(Token, address)

  if (!token) {
    const erc20 = new ERC20.Contract({ ...ctx, block: log.block }, address)

    const [name, symbol, decimals, priceUSD] = await Promise.all([
      erc20.name(),
      erc20.symbol(),
      erc20.decimals(),
      getTokenPriceFromFeed(ctx, log, address)
    ])

    token = new Token({
      id: address,
      name,
      symbol,
      decimals,
      priceUSD
    })

    await ctx.store.save(token)
  }

  return token
}
