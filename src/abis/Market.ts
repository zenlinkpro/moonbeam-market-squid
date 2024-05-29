import * as p from '@subsquid/evm-codec'
import { event, fun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", {"owner": indexed(p.address), "spender": indexed(p.address), "value": p.uint256}),
    Burn: event("0x4cf25bc1d991c17529c25213d3cc0cda295eeaad5f13f361969b12ea48015f90", {"receiverSy": indexed(p.address), "receiverPt": indexed(p.address), "netLpBurned": p.uint256, "netSyOut": p.uint256, "netPtOut": p.uint256}),
    IncreaseObservationCardinalityNext: event("0xac49e518f90a358f652e4400164f05a5d8f7e35e7747279bc3a93dbf584e125a", {"observationCardinalityNextOld": p.uint16, "observationCardinalityNextNew": p.uint16}),
    Mint: event("0xb4c03061fb5b7fed76389d5af8f2e0ddb09f8c70d1333abbb62582835e10accb", {"receiver": indexed(p.address), "netLpMinted": p.uint256, "netSyUsed": p.uint256, "netPtUsed": p.uint256}),
    RedeemRewards: event("0x78d61a0c27b13f43911095f9f356f14daa3cd8b125eea1aa22421245e90e813d", {"user": indexed(p.address), "rewardsOut": p.array(p.uint256)}),
    Swap: event("0x829000a5bc6a12d46e30cdcecd7c56b1efd88f6d7d059da6734a04f3764557c4", {"caller": indexed(p.address), "receiver": indexed(p.address), "netPtOut": p.int256, "netSyOut": p.int256, "netSyFee": p.uint256, "netSyToReserve": p.uint256}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", {"from": indexed(p.address), "to": indexed(p.address), "value": p.uint256}),
    UpdateImpliedRate: event("0x5c0e21d57bb4cf91d8fe238d6f92e2685a695371b19209afcce6217b478f83e1", {"timestamp": indexed(p.uint256), "lnLastImpliedRate": p.uint256}),
}

export const functions = {
    _storage: fun("0xc3fb90d6", {}, {"totalPt": p.int128, "totalSy": p.int128, "lastLnImpliedRate": p.uint96, "observationIndex": p.uint16, "observationCardinality": p.uint16, "observationCardinalityNext": p.uint16}),
    activeBalance: fun("0x0892cd8b", {"_0": p.address}, p.uint256),
    allowance: fun("0xdd62ed3e", {"owner": p.address, "spender": p.address}, p.uint256),
    approve: fun("0x095ea7b3", {"spender": p.address, "amount": p.uint256}, p.bool),
    balanceOf: fun("0x70a08231", {"account": p.address}, p.uint256),
    burn: fun("0xf6b911bc", {"receiverSy": p.address, "receiverPt": p.address, "netLpToBurn": p.uint256}, {"netSyOut": p.uint256, "netPtOut": p.uint256}),
    decimals: fun("0x313ce567", {}, p.uint8),
    expiry: fun("0xe184c9be", {}, p.uint256),
    factory: fun("0xc45a0155", {}, p.address),
    getNonOverrideLnFeeRateRoot: fun("0xe4f8b2e9", {}, p.uint80),
    getRewardTokens: fun("0xc4f59f9b", {}, p.array(p.address)),
    increaseObservationsCardinalityNext: fun("0x37d45e3a", {"cardinalityNext": p.uint16}, ),
    isExpired: fun("0x2f13b60c", {}, p.bool),
    lastRewardBlock: fun("0xa9f8d181", {}, p.uint256),
    mint: fun("0x156e29f6", {"receiver": p.address, "netSyDesired": p.uint256, "netPtDesired": p.uint256}, {"netLpOut": p.uint256, "netSyUsed": p.uint256, "netPtUsed": p.uint256}),
    name: fun("0x06fdde03", {}, p.string),
    observations: fun("0x252c09d7", {"_0": p.uint256}, {"blockTimestamp": p.uint32, "lnImpliedRateCumulative": p.uint216, "initialized": p.bool}),
    observe: fun("0x883bdbfd", {"secondsAgos": p.array(p.uint32)}, p.array(p.uint216)),
    readState: fun("0x794052f3", {"router": p.address}, p.struct({"totalPt": p.int256, "totalSy": p.int256, "totalLp": p.int256, "treasury": p.address, "scalarRoot": p.int256, "expiry": p.uint256, "lnFeeRateRoot": p.uint256, "reserveFeePercent": p.uint256, "lastLnImpliedRate": p.uint256})),
    readTokens: fun("0x2c8ce6bc", {}, {"_SY": p.address, "_PT": p.address, "_YT": p.address}),
    redeemRewards: fun("0x9262187b", {"user": p.address}, p.array(p.uint256)),
    rewardState: fun("0xea64a820", {"_0": p.address}, {"index": p.uint128, "lastBalance": p.uint128}),
    skim: fun("0x1dd19cb4", {}, ),
    swapExactPtForSy: fun("0x29910b11", {"receiver": p.address, "exactPtIn": p.uint256, "data": p.bytes}, {"netSyOut": p.uint256, "netSyFee": p.uint256}),
    swapSyForExactPt: fun("0x5b709f17", {"receiver": p.address, "exactPtOut": p.uint256, "data": p.bytes}, {"netSyIn": p.uint256, "netSyFee": p.uint256}),
    symbol: fun("0x95d89b41", {}, p.string),
    totalActiveSupply: fun("0x72069264", {}, p.uint256),
    totalSupply: fun("0x18160ddd", {}, p.uint256),
    transfer: fun("0xa9059cbb", {"to": p.address, "amount": p.uint256}, p.bool),
    transferFrom: fun("0x23b872dd", {"from": p.address, "to": p.address, "amount": p.uint256}, p.bool),
    userReward: fun("0x5cbadbe4", {"_0": p.address, "_1": p.address}, {"index": p.uint128, "accrued": p.uint128}),
}

export class Contract extends ContractBase {

    _storage() {
        return this.eth_call(functions._storage, {})
    }

    activeBalance(_0: ActiveBalanceParams["_0"]) {
        return this.eth_call(functions.activeBalance, {_0})
    }

    allowance(owner: AllowanceParams["owner"], spender: AllowanceParams["spender"]) {
        return this.eth_call(functions.allowance, {owner, spender})
    }

    balanceOf(account: BalanceOfParams["account"]) {
        return this.eth_call(functions.balanceOf, {account})
    }

    decimals() {
        return this.eth_call(functions.decimals, {})
    }

    expiry() {
        return this.eth_call(functions.expiry, {})
    }

    factory() {
        return this.eth_call(functions.factory, {})
    }

    getNonOverrideLnFeeRateRoot() {
        return this.eth_call(functions.getNonOverrideLnFeeRateRoot, {})
    }

    getRewardTokens() {
        return this.eth_call(functions.getRewardTokens, {})
    }

    isExpired() {
        return this.eth_call(functions.isExpired, {})
    }

    lastRewardBlock() {
        return this.eth_call(functions.lastRewardBlock, {})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    observations(_0: ObservationsParams["_0"]) {
        return this.eth_call(functions.observations, {_0})
    }

    observe(secondsAgos: ObserveParams["secondsAgos"]) {
        return this.eth_call(functions.observe, {secondsAgos})
    }

    readState(router: ReadStateParams["router"]) {
        return this.eth_call(functions.readState, {router})
    }

    readTokens() {
        return this.eth_call(functions.readTokens, {})
    }

    rewardState(_0: RewardStateParams["_0"]) {
        return this.eth_call(functions.rewardState, {_0})
    }

    symbol() {
        return this.eth_call(functions.symbol, {})
    }

    totalActiveSupply() {
        return this.eth_call(functions.totalActiveSupply, {})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }

    userReward(_0: UserRewardParams["_0"], _1: UserRewardParams["_1"]) {
        return this.eth_call(functions.userReward, {_0, _1})
    }
}

/// Event types
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type BurnEventArgs = EParams<typeof events.Burn>
export type IncreaseObservationCardinalityNextEventArgs = EParams<typeof events.IncreaseObservationCardinalityNext>
export type MintEventArgs = EParams<typeof events.Mint>
export type RedeemRewardsEventArgs = EParams<typeof events.RedeemRewards>
export type SwapEventArgs = EParams<typeof events.Swap>
export type TransferEventArgs = EParams<typeof events.Transfer>
export type UpdateImpliedRateEventArgs = EParams<typeof events.UpdateImpliedRate>

/// Function types
export type _storageParams = FunctionArguments<typeof functions._storage>
export type _storageReturn = FunctionReturn<typeof functions._storage>

export type ActiveBalanceParams = FunctionArguments<typeof functions.activeBalance>
export type ActiveBalanceReturn = FunctionReturn<typeof functions.activeBalance>

export type AllowanceParams = FunctionArguments<typeof functions.allowance>
export type AllowanceReturn = FunctionReturn<typeof functions.allowance>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type BurnParams = FunctionArguments<typeof functions.burn>
export type BurnReturn = FunctionReturn<typeof functions.burn>

export type DecimalsParams = FunctionArguments<typeof functions.decimals>
export type DecimalsReturn = FunctionReturn<typeof functions.decimals>

export type ExpiryParams = FunctionArguments<typeof functions.expiry>
export type ExpiryReturn = FunctionReturn<typeof functions.expiry>

export type FactoryParams = FunctionArguments<typeof functions.factory>
export type FactoryReturn = FunctionReturn<typeof functions.factory>

export type GetNonOverrideLnFeeRateRootParams = FunctionArguments<typeof functions.getNonOverrideLnFeeRateRoot>
export type GetNonOverrideLnFeeRateRootReturn = FunctionReturn<typeof functions.getNonOverrideLnFeeRateRoot>

export type GetRewardTokensParams = FunctionArguments<typeof functions.getRewardTokens>
export type GetRewardTokensReturn = FunctionReturn<typeof functions.getRewardTokens>

export type IncreaseObservationsCardinalityNextParams = FunctionArguments<typeof functions.increaseObservationsCardinalityNext>
export type IncreaseObservationsCardinalityNextReturn = FunctionReturn<typeof functions.increaseObservationsCardinalityNext>

export type IsExpiredParams = FunctionArguments<typeof functions.isExpired>
export type IsExpiredReturn = FunctionReturn<typeof functions.isExpired>

export type LastRewardBlockParams = FunctionArguments<typeof functions.lastRewardBlock>
export type LastRewardBlockReturn = FunctionReturn<typeof functions.lastRewardBlock>

export type MintParams = FunctionArguments<typeof functions.mint>
export type MintReturn = FunctionReturn<typeof functions.mint>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type ObservationsParams = FunctionArguments<typeof functions.observations>
export type ObservationsReturn = FunctionReturn<typeof functions.observations>

export type ObserveParams = FunctionArguments<typeof functions.observe>
export type ObserveReturn = FunctionReturn<typeof functions.observe>

export type ReadStateParams = FunctionArguments<typeof functions.readState>
export type ReadStateReturn = FunctionReturn<typeof functions.readState>

export type ReadTokensParams = FunctionArguments<typeof functions.readTokens>
export type ReadTokensReturn = FunctionReturn<typeof functions.readTokens>

export type RedeemRewardsParams = FunctionArguments<typeof functions.redeemRewards>
export type RedeemRewardsReturn = FunctionReturn<typeof functions.redeemRewards>

export type RewardStateParams = FunctionArguments<typeof functions.rewardState>
export type RewardStateReturn = FunctionReturn<typeof functions.rewardState>

export type SkimParams = FunctionArguments<typeof functions.skim>
export type SkimReturn = FunctionReturn<typeof functions.skim>

export type SwapExactPtForSyParams = FunctionArguments<typeof functions.swapExactPtForSy>
export type SwapExactPtForSyReturn = FunctionReturn<typeof functions.swapExactPtForSy>

export type SwapSyForExactPtParams = FunctionArguments<typeof functions.swapSyForExactPt>
export type SwapSyForExactPtReturn = FunctionReturn<typeof functions.swapSyForExactPt>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type TotalActiveSupplyParams = FunctionArguments<typeof functions.totalActiveSupply>
export type TotalActiveSupplyReturn = FunctionReturn<typeof functions.totalActiveSupply>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type TransferParams = FunctionArguments<typeof functions.transfer>
export type TransferReturn = FunctionReturn<typeof functions.transfer>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

export type UserRewardParams = FunctionArguments<typeof functions.userReward>
export type UserRewardReturn = FunctionReturn<typeof functions.userReward>

