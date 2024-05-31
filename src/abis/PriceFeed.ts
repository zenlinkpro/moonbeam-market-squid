import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    AnswerUpdated: event("0x0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f", {"current": indexed(p.int256), "roundId": indexed(p.uint256), "updatedAt": p.uint256}),
    NewRound: event("0x0109fc6f55cf40689f02fbaad7af7fe7bbac8a3d2186600afc7d3e10cac60271", {"roundId": indexed(p.uint256), "startedBy": indexed(p.address), "startedAt": p.uint256}),
}

export const functions = {
    decimals: viewFun("0x313ce567", {}, p.uint8),
    getAnswer: viewFun("0xb5ab58dc", {"roundId": p.uint256}, p.int256),
    getTimestamp: viewFun("0xb633620c", {"roundId": p.uint256}, p.uint256),
    latestAnswer: viewFun("0x50d25bcd", {}, p.int256),
    latestRound: viewFun("0x668a0f02", {}, p.uint256),
    latestTimestamp: viewFun("0x8205bf6a", {}, p.uint256),
}

export class Contract extends ContractBase {

    decimals() {
        return this.eth_call(functions.decimals, {})
    }

    getAnswer(roundId: GetAnswerParams["roundId"]) {
        return this.eth_call(functions.getAnswer, {roundId})
    }

    getTimestamp(roundId: GetTimestampParams["roundId"]) {
        return this.eth_call(functions.getTimestamp, {roundId})
    }

    latestAnswer() {
        return this.eth_call(functions.latestAnswer, {})
    }

    latestRound() {
        return this.eth_call(functions.latestRound, {})
    }

    latestTimestamp() {
        return this.eth_call(functions.latestTimestamp, {})
    }
}

/// Event types
export type AnswerUpdatedEventArgs = EParams<typeof events.AnswerUpdated>
export type NewRoundEventArgs = EParams<typeof events.NewRound>

/// Function types
export type DecimalsParams = FunctionArguments<typeof functions.decimals>
export type DecimalsReturn = FunctionReturn<typeof functions.decimals>

export type GetAnswerParams = FunctionArguments<typeof functions.getAnswer>
export type GetAnswerReturn = FunctionReturn<typeof functions.getAnswer>

export type GetTimestampParams = FunctionArguments<typeof functions.getTimestamp>
export type GetTimestampReturn = FunctionReturn<typeof functions.getTimestamp>

export type LatestAnswerParams = FunctionArguments<typeof functions.latestAnswer>
export type LatestAnswerReturn = FunctionReturn<typeof functions.latestAnswer>

export type LatestRoundParams = FunctionArguments<typeof functions.latestRound>
export type LatestRoundReturn = FunctionReturn<typeof functions.latestRound>

export type LatestTimestampParams = FunctionArguments<typeof functions.latestTimestamp>
export type LatestTimestampReturn = FunctionReturn<typeof functions.latestTimestamp>

