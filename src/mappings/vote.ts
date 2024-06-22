import { Context, Log } from "../processor";
import * as VC from '../abis/Vote'
import { VotingEvent } from "../model";

let syncingIndex = 0

export async function handleVote(ctx: Context, log: Log) {
  const data = VC.events.Vote.decode(log)

  const id = `${data.user}-${syncingIndex}`
  const votingEvent = new VotingEvent({
    id,
    user: data.user,
    bias: data.vote.bias,
    slope: data.vote.slope,
    timestamp: BigInt(log.block.timestamp / 1000),
    pool: data.pool,
    syncingIndex
  })
  await ctx.store.save(votingEvent)
  syncingIndex++
}
