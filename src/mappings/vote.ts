import { Context, Log } from "../processor";
import * as VC from '../abis/Vote'
import { VotingEvent } from "../model";

export async function handleVote(ctx: Context, log: Log) {
  const data = VC.events.Vote.decode(log)

  const lastVotingEvent = await ctx.store.find(VotingEvent, { order: { syncingIndex: 'DESC' }, take: 1 })

  const syncingIndex = lastVotingEvent[0] ? lastVotingEvent[0].syncingIndex + 1 : 0

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
}
