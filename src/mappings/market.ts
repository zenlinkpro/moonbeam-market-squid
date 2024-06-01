import { assertNotNull } from "@subsquid/evm-processor";
import { Context, Log } from "../processor";
import * as MC from '../abis/Market'
import { getFactory, getMarket } from "../entities";
import { trackPriceOfTokensInMarket } from "../utils";

export async function handleSwap(ctx: Context, log: Log) {
  const tx = assertNotNull(log.transaction, 'Missing transaction')
  const contractAddress = log.address

  const data = MC.events.Swap.decode(log)
  const factory = assertNotNull(await getFactory(ctx), 'Missing factory')
  const market = assertNotNull(await getMarket(ctx, contractAddress), 'Missing market')

  await trackPriceOfTokensInMarket(ctx, log, market)
}
