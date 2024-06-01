import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    SetBlockCycleNumerator: event("0x30b0568b152eb73b8d1104ca045f37e64f7eae07b09ea9607ab1bdf475012c53", {"newBlockCycleNumerator": p.uint16}),
}

export const functions = {
    getLatestLpToAssetRate: viewFun("0xfb9576b0", {"market": p.address}, p.uint256),
    getLatestLpToSyRate: viewFun("0x4b1a3081", {"market": p.address}, p.uint256),
    getLatestPtToAssetRate: viewFun("0x287f1f9d", {"market": p.address}, p.uint256),
    getLatestPtToSyRate: viewFun("0x16e7b590", {"market": p.address}, p.uint256),
    getLpToAssetRate: viewFun("0x6cda9833", {"market": p.address, "duration": p.uint32}, p.uint256),
    getLpToSyRate: viewFun("0x4d44ca89", {"market": p.address, "duration": p.uint32}, p.uint256),
    getOracleState: viewFun("0x873e9600", {"market": p.address, "duration": p.uint32}, {"increaseCardinalityRequired": p.bool, "cardinalityRequired": p.uint16, "oldestObservationSatisfied": p.bool}),
    getPtToAssetRate: viewFun("0xabca0eab", {"market": p.address, "duration": p.uint32}, p.uint256),
    getPtToSyRate: viewFun("0xa31426d1", {"market": p.address, "duration": p.uint32}, p.uint256),
}

export class Contract extends ContractBase {

    getLatestLpToAssetRate(market: GetLatestLpToAssetRateParams["market"]) {
        return this.eth_call(functions.getLatestLpToAssetRate, {market})
    }

    getLatestLpToSyRate(market: GetLatestLpToSyRateParams["market"]) {
        return this.eth_call(functions.getLatestLpToSyRate, {market})
    }

    getLatestPtToAssetRate(market: GetLatestPtToAssetRateParams["market"]) {
        return this.eth_call(functions.getLatestPtToAssetRate, {market})
    }

    getLatestPtToSyRate(market: GetLatestPtToSyRateParams["market"]) {
        return this.eth_call(functions.getLatestPtToSyRate, {market})
    }

    getLpToAssetRate(market: GetLpToAssetRateParams["market"], duration: GetLpToAssetRateParams["duration"]) {
        return this.eth_call(functions.getLpToAssetRate, {market, duration})
    }

    getLpToSyRate(market: GetLpToSyRateParams["market"], duration: GetLpToSyRateParams["duration"]) {
        return this.eth_call(functions.getLpToSyRate, {market, duration})
    }

    getOracleState(market: GetOracleStateParams["market"], duration: GetOracleStateParams["duration"]) {
        return this.eth_call(functions.getOracleState, {market, duration})
    }

    getPtToAssetRate(market: GetPtToAssetRateParams["market"], duration: GetPtToAssetRateParams["duration"]) {
        return this.eth_call(functions.getPtToAssetRate, {market, duration})
    }

    getPtToSyRate(market: GetPtToSyRateParams["market"], duration: GetPtToSyRateParams["duration"]) {
        return this.eth_call(functions.getPtToSyRate, {market, duration})
    }
}

/// Event types
export type SetBlockCycleNumeratorEventArgs = EParams<typeof events.SetBlockCycleNumerator>

/// Function types
export type GetLatestLpToAssetRateParams = FunctionArguments<typeof functions.getLatestLpToAssetRate>
export type GetLatestLpToAssetRateReturn = FunctionReturn<typeof functions.getLatestLpToAssetRate>

export type GetLatestLpToSyRateParams = FunctionArguments<typeof functions.getLatestLpToSyRate>
export type GetLatestLpToSyRateReturn = FunctionReturn<typeof functions.getLatestLpToSyRate>

export type GetLatestPtToAssetRateParams = FunctionArguments<typeof functions.getLatestPtToAssetRate>
export type GetLatestPtToAssetRateReturn = FunctionReturn<typeof functions.getLatestPtToAssetRate>

export type GetLatestPtToSyRateParams = FunctionArguments<typeof functions.getLatestPtToSyRate>
export type GetLatestPtToSyRateReturn = FunctionReturn<typeof functions.getLatestPtToSyRate>

export type GetLpToAssetRateParams = FunctionArguments<typeof functions.getLpToAssetRate>
export type GetLpToAssetRateReturn = FunctionReturn<typeof functions.getLpToAssetRate>

export type GetLpToSyRateParams = FunctionArguments<typeof functions.getLpToSyRate>
export type GetLpToSyRateReturn = FunctionReturn<typeof functions.getLpToSyRate>

export type GetOracleStateParams = FunctionArguments<typeof functions.getOracleState>
export type GetOracleStateReturn = FunctionReturn<typeof functions.getOracleState>

export type GetPtToAssetRateParams = FunctionArguments<typeof functions.getPtToAssetRate>
export type GetPtToAssetRateReturn = FunctionReturn<typeof functions.getPtToAssetRate>

export type GetPtToSyRateParams = FunctionArguments<typeof functions.getPtToSyRate>
export type GetPtToSyRateReturn = FunctionReturn<typeof functions.getPtToSyRate>

