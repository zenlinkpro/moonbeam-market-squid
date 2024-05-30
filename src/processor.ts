import { Store, TypeormDatabase } from "@subsquid/typeorm-store"
import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor"
import { FACTORY_ADDRESS, chainRpc } from "./constants"
import * as FactoryAbi from './abis/Factory'
import { Market } from "./model"
import { handleNewMarket } from "./mappings"

const database = new TypeormDatabase()
const processor = new EvmBatchProcessor()
  .setGateway('https://v2.archive.subsquid.io/network/moonbeam-mainnet')
  .setRpcEndpoint(chainRpc)
  .setFinalityConfirmation(5)
  .setBlockRange({ from: 6172777 })
  .addLog({
    address: [FACTORY_ADDRESS],
    topic0: [FactoryAbi.events.CreateNewMarket.topic],
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
    default:
      break
  }
}
