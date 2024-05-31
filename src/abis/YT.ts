import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", {"owner": indexed(p.address), "spender": indexed(p.address), "value": p.uint256}),
    Burn: event("0x5d624aa9c148153ab3446c1b154f660ee7701e549fe9b62dab7171b1c80e6fa2", {"caller": indexed(p.address), "receiver": indexed(p.address), "amountPYToRedeem": p.uint256, "amountSyOut": p.uint256}),
    CollectInterestFee: event("0x004e8d79e4b41c5fad7561dc7c07786ee4e52292da7a3f5dc7ab90e32cc30423", {"amountInterestFee": p.uint256}),
    CollectRewardFee: event("0x880a48d40a6133941abdcfabd5c5f9a791b1e6c8afd23138c5a36e3d95039222", {"rewardToken": indexed(p.address), "amountRewardFee": p.uint256}),
    Mint: event("0xc0025304673122449dd60b9b0093874b0e2fd6fe57af1c7c2fbfee0ccf5ead58", {"caller": indexed(p.address), "receiverPT": indexed(p.address), "receiverYT": indexed(p.address), "amountSyToMint": p.uint256, "amountPYOut": p.uint256}),
    RedeemInterest: event("0x83a945bd12c713615b59a6e48a3467c05d1a7442350600d6f7fce6af9f7190e9", {"user": indexed(p.address), "interestOut": p.uint256}),
    RedeemRewards: event("0x78d61a0c27b13f43911095f9f356f14daa3cd8b125eea1aa22421245e90e813d", {"user": indexed(p.address), "amountRewardsOut": p.array(p.uint256)}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", {"from": indexed(p.address), "to": indexed(p.address), "value": p.uint256}),
    WithdrawFeeToTreasury: event("0x1f8d4ebdbc9b09c20d70cab598013079424b00c1e028075b6d5d5eaee6e5c122", {"amountRewardsOut": p.array(p.uint256), "syOut": p.uint256}),
}

export const functions = {
    PT: viewFun("0xd94073d4", {}, p.address),
    SY: viewFun("0xafd27bf5", {}, p.address),
    allowance: viewFun("0xdd62ed3e", {"owner": p.address, "spender": p.address}, p.uint256),
    approve: fun("0x095ea7b3", {"spender": p.address, "amount": p.uint256}, p.bool),
    balanceOf: viewFun("0x70a08231", {"account": p.address}, p.uint256),
    decimals: viewFun("0x313ce567", {}, p.uint8),
    doCacheIndexSameBlock: viewFun("0x516399df", {}, p.bool),
    expiry: viewFun("0xe184c9be", {}, p.uint256),
    factory: viewFun("0xc45a0155", {}, p.address),
    getRewardTokens: viewFun("0xc4f59f9b", {}, p.array(p.address)),
    isExpired: viewFun("0x2f13b60c", {}, p.bool),
    mintPY: fun("0xdb74aa15", {"receiverPT": p.address, "receiverYT": p.address}, p.uint256),
    name: viewFun("0x06fdde03", {}, p.string),
    pyIndexCurrent: fun("0x1d52edc4", {}, p.uint256),
    pyIndexStored: viewFun("0xd2a3584e", {}, p.uint256),
    redeemDueInterestAndRewards: fun("0x7d24da4d", {"user": p.address, "redeemInterest": p.bool, "redeemRewards": p.bool}, {"interestOut": p.uint256, "rewardsOut": p.array(p.uint256)}),
    redeemPY: fun("0xbcb7ea5d", {"receiver": p.address}, p.uint256),
    redeemPYMulti: fun("0xb0d88981", {"receivers": p.array(p.address), "amountPYToRedeems": p.array(p.uint256)}, p.array(p.uint256)),
    rewardIndexesCurrent: fun("0xf8b2f991", {}, p.array(p.uint256)),
    symbol: viewFun("0x95d89b41", {}, p.string),
    totalSupply: viewFun("0x18160ddd", {}, p.uint256),
    transfer: fun("0xa9059cbb", {"to": p.address, "amount": p.uint256}, p.bool),
    transferFrom: fun("0x23b872dd", {"from": p.address, "to": p.address, "amount": p.uint256}, p.bool),
    userInterest: viewFun("0xd68076c3", {"user": p.address}, {"lastInterestIndex": p.uint128, "accruedInterest": p.uint128, "lastPYIndex": p.uint256}),
    userReward: viewFun("0x5cbadbe4", {"token": p.address, "user": p.address}, {"index": p.uint128, "accrued": p.uint128}),
}

export class Contract extends ContractBase {

    PT() {
        return this.eth_call(functions.PT, {})
    }

    SY() {
        return this.eth_call(functions.SY, {})
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

    doCacheIndexSameBlock() {
        return this.eth_call(functions.doCacheIndexSameBlock, {})
    }

    expiry() {
        return this.eth_call(functions.expiry, {})
    }

    factory() {
        return this.eth_call(functions.factory, {})
    }

    getRewardTokens() {
        return this.eth_call(functions.getRewardTokens, {})
    }

    isExpired() {
        return this.eth_call(functions.isExpired, {})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    pyIndexStored() {
        return this.eth_call(functions.pyIndexStored, {})
    }

    symbol() {
        return this.eth_call(functions.symbol, {})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }

    userInterest(user: UserInterestParams["user"]) {
        return this.eth_call(functions.userInterest, {user})
    }

    userReward(token: UserRewardParams["token"], user: UserRewardParams["user"]) {
        return this.eth_call(functions.userReward, {token, user})
    }
}

/// Event types
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type BurnEventArgs = EParams<typeof events.Burn>
export type CollectInterestFeeEventArgs = EParams<typeof events.CollectInterestFee>
export type CollectRewardFeeEventArgs = EParams<typeof events.CollectRewardFee>
export type MintEventArgs = EParams<typeof events.Mint>
export type RedeemInterestEventArgs = EParams<typeof events.RedeemInterest>
export type RedeemRewardsEventArgs = EParams<typeof events.RedeemRewards>
export type TransferEventArgs = EParams<typeof events.Transfer>
export type WithdrawFeeToTreasuryEventArgs = EParams<typeof events.WithdrawFeeToTreasury>

/// Function types
export type PTParams = FunctionArguments<typeof functions.PT>
export type PTReturn = FunctionReturn<typeof functions.PT>

export type SYParams = FunctionArguments<typeof functions.SY>
export type SYReturn = FunctionReturn<typeof functions.SY>

export type AllowanceParams = FunctionArguments<typeof functions.allowance>
export type AllowanceReturn = FunctionReturn<typeof functions.allowance>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type DecimalsParams = FunctionArguments<typeof functions.decimals>
export type DecimalsReturn = FunctionReturn<typeof functions.decimals>

export type DoCacheIndexSameBlockParams = FunctionArguments<typeof functions.doCacheIndexSameBlock>
export type DoCacheIndexSameBlockReturn = FunctionReturn<typeof functions.doCacheIndexSameBlock>

export type ExpiryParams = FunctionArguments<typeof functions.expiry>
export type ExpiryReturn = FunctionReturn<typeof functions.expiry>

export type FactoryParams = FunctionArguments<typeof functions.factory>
export type FactoryReturn = FunctionReturn<typeof functions.factory>

export type GetRewardTokensParams = FunctionArguments<typeof functions.getRewardTokens>
export type GetRewardTokensReturn = FunctionReturn<typeof functions.getRewardTokens>

export type IsExpiredParams = FunctionArguments<typeof functions.isExpired>
export type IsExpiredReturn = FunctionReturn<typeof functions.isExpired>

export type MintPYParams = FunctionArguments<typeof functions.mintPY>
export type MintPYReturn = FunctionReturn<typeof functions.mintPY>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type PyIndexCurrentParams = FunctionArguments<typeof functions.pyIndexCurrent>
export type PyIndexCurrentReturn = FunctionReturn<typeof functions.pyIndexCurrent>

export type PyIndexStoredParams = FunctionArguments<typeof functions.pyIndexStored>
export type PyIndexStoredReturn = FunctionReturn<typeof functions.pyIndexStored>

export type RedeemDueInterestAndRewardsParams = FunctionArguments<typeof functions.redeemDueInterestAndRewards>
export type RedeemDueInterestAndRewardsReturn = FunctionReturn<typeof functions.redeemDueInterestAndRewards>

export type RedeemPYParams = FunctionArguments<typeof functions.redeemPY>
export type RedeemPYReturn = FunctionReturn<typeof functions.redeemPY>

export type RedeemPYMultiParams = FunctionArguments<typeof functions.redeemPYMulti>
export type RedeemPYMultiReturn = FunctionReturn<typeof functions.redeemPYMulti>

export type RewardIndexesCurrentParams = FunctionArguments<typeof functions.rewardIndexesCurrent>
export type RewardIndexesCurrentReturn = FunctionReturn<typeof functions.rewardIndexesCurrent>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type TransferParams = FunctionArguments<typeof functions.transfer>
export type TransferReturn = FunctionReturn<typeof functions.transfer>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

export type UserInterestParams = FunctionArguments<typeof functions.userInterest>
export type UserInterestReturn = FunctionReturn<typeof functions.userInterest>

export type UserRewardParams = FunctionArguments<typeof functions.userReward>
export type UserRewardReturn = FunctionReturn<typeof functions.userReward>

