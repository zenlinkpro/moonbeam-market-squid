import { Store, TypeormDatabase } from "@subsquid/typeorm-store"
import * as FC from './abis/Factory'
import * as MC from './abis/Market'
import * as TC from './abis/Treasury'
import * as VC from './abis/Vote'
import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor"
import { FACTORY_ADDRESS, TREASURY_ADDRESS, VOTE_ADDRESS, chainRpc } from "./constants"
import { Market } from "./model"
import {
  handleBurn,
  handleMint,
  handleNewMarket,
  handleSwap,
  handleTreasuryDistribute,
  handleVote
} from "./mappings"


const database = new TypeormDatabase()
const processor = new EvmBatchProcessor()
  .setGateway('https://v2.archive.subsquid.io/network/moonbeam-mainnet')
  .setRpcEndpoint(chainRpc)
  .setFinalityConfirmation(5)
  .setBlockRange({ from: 6455755 })
  .addLog({
    address: [FACTORY_ADDRESS],
    topic0: [FC.events.CreateNewMarket.topic],
  })
  .addLog({
    topic0: [
      MC.events.Swap.topic,
      MC.events.Mint.topic,
      MC.events.Burn.topic,
    ],
    transaction: true
  })
  .addLog({
    address: [TREASURY_ADDRESS],
    topic0: [TC.events.RedeemSyToToken.topic]
  })
  .addLog({
    address: [VOTE_ADDRESS],
    topic0: [VC.events.Vote.topic]
  })


processor.run(database, async (ctx) => {
  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      await handleEvmLog(ctx, log)
    }
  }
})

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>

const knownMarketContracts: Set<string> = new Set()

async function tryIsMarketInvolved(store: Store, address: string) {
  try {
    return (await store.countBy(Market, { id: address })) > 0
  } catch {
    return false
  }
}

async function isKnownMarketContract(store: Store, address: string) {
  if (knownMarketContracts.has(address)) {
    return true
  }
  if (await tryIsMarketInvolved(store, address)) {
    knownMarketContracts.add(address)
    return true
  }
  return false
}

async function handleEvmLog(ctx: Context, log: Log) {
  const contractAddress = log.address

  switch (contractAddress) {
    case FACTORY_ADDRESS:
      await handleNewMarket(ctx, log)
      break
    case TREASURY_ADDRESS:
      await handleTreasuryDistribute(ctx, log)
      break
    case VOTE_ADDRESS:
      await handleVote(ctx, log)
      break
    default:
      if (await isKnownMarketContract(ctx.store, contractAddress)) {
        switch (log.topics[0]) {
          case MC.events.Swap.topic:
            await handleSwap(ctx, log)
            break
          case MC.events.Mint.topic:
            await handleMint(ctx, log)
            break
          case MC.events.Burn.topic:
            await handleBurn(ctx, log)
            break
        }
      }
      break
  }
}
