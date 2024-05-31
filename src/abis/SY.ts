import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", {"owner": indexed(p.address), "spender": indexed(p.address), "value": p.uint256}),
    ClaimRewards: event("0x2193aa20a3717f5f4ac79482f4f553e5f0afe8f4e6ec3e3d1aa2e138adc4763f", {"user": indexed(p.address), "rewardTokens": p.array(p.address), "rewardAmounts": p.array(p.uint256)}),
    Deposit: event("0x5fe47ed6d4225326d3303476197d782ded5a4e9c14f479dc9ec4992af4e85d59", {"caller": indexed(p.address), "receiver": indexed(p.address), "tokenIn": indexed(p.address), "amountDeposited": p.uint256, "amountSyOut": p.uint256}),
    Redeem: event("0xaee47cdf925cf525fdae94f9777ee5a06cac37e1c41220d0a8a89ed154f62d1c", {"caller": indexed(p.address), "receiver": indexed(p.address), "tokenOut": indexed(p.address), "amountSyToRedeem": p.uint256, "amountTokenOut": p.uint256}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", {"from": indexed(p.address), "to": indexed(p.address), "value": p.uint256}),
}

export const functions = {
    accruedRewards: viewFun("0x128fced1", {"user": p.address}, p.array(p.uint256)),
    allowance: viewFun("0xdd62ed3e", {"owner": p.address, "spender": p.address}, p.uint256),
    approve: fun("0x095ea7b3", {"spender": p.address, "amount": p.uint256}, p.bool),
    assetInfo: viewFun("0xa40bee50", {}, {"assetType": p.uint8, "assetAddress": p.address, "assetDecimals": p.uint8}),
    balanceOf: viewFun("0x70a08231", {"account": p.address}, p.uint256),
    claimRewards: fun("0xef5cfb8c", {"user": p.address}, p.array(p.uint256)),
    decimals: viewFun("0x313ce567", {}, p.uint8),
    deposit: fun("0x20e8c565", {"receiver": p.address, "tokenIn": p.address, "amountTokenToDeposit": p.uint256, "minSharesOut": p.uint256}, p.uint256),
    exchangeRate: viewFun("0x3ba0b9a9", {}, p.uint256),
    getRewardTokens: viewFun("0xc4f59f9b", {}, p.array(p.address)),
    getTokensIn: viewFun("0x213cae63", {}, p.array(p.address)),
    getTokensOut: viewFun("0x071bc3c9", {}, p.array(p.address)),
    isValidTokenIn: viewFun("0xfa5a4f06", {"token": p.address}, p.bool),
    isValidTokenOut: viewFun("0x784367d6", {"token": p.address}, p.bool),
    name: viewFun("0x06fdde03", {}, p.string),
    previewDeposit: viewFun("0xb8f82b26", {"tokenIn": p.address, "amountTokenToDeposit": p.uint256}, p.uint256),
    previewRedeem: viewFun("0xcbe52ae3", {"tokenOut": p.address, "amountSharesToRedeem": p.uint256}, p.uint256),
    redeem: fun("0x769f8e5d", {"receiver": p.address, "amountSharesToRedeem": p.uint256, "tokenOut": p.address, "minTokenOut": p.uint256, "burnFromInternalBalance": p.bool}, p.uint256),
    rewardIndexesCurrent: fun("0xf8b2f991", {}, p.array(p.uint256)),
    rewardIndexesStored: viewFun("0xda88ecb4", {}, p.array(p.uint256)),
    symbol: viewFun("0x95d89b41", {}, p.string),
    totalSupply: viewFun("0x18160ddd", {}, p.uint256),
    transfer: fun("0xa9059cbb", {"to": p.address, "amount": p.uint256}, p.bool),
    transferFrom: fun("0x23b872dd", {"from": p.address, "to": p.address, "amount": p.uint256}, p.bool),
    yieldToken: viewFun("0x76d5de85", {}, p.address),
}

export class Contract extends ContractBase {

    accruedRewards(user: AccruedRewardsParams["user"]) {
        return this.eth_call(functions.accruedRewards, {user})
    }

    allowance(owner: AllowanceParams["owner"], spender: AllowanceParams["spender"]) {
        return this.eth_call(functions.allowance, {owner, spender})
    }

    assetInfo() {
        return this.eth_call(functions.assetInfo, {})
    }

    balanceOf(account: BalanceOfParams["account"]) {
        return this.eth_call(functions.balanceOf, {account})
    }

    decimals() {
        return this.eth_call(functions.decimals, {})
    }

    exchangeRate() {
        return this.eth_call(functions.exchangeRate, {})
    }

    getRewardTokens() {
        return this.eth_call(functions.getRewardTokens, {})
    }

    getTokensIn() {
        return this.eth_call(functions.getTokensIn, {})
    }

    getTokensOut() {
        return this.eth_call(functions.getTokensOut, {})
    }

    isValidTokenIn(token: IsValidTokenInParams["token"]) {
        return this.eth_call(functions.isValidTokenIn, {token})
    }

    isValidTokenOut(token: IsValidTokenOutParams["token"]) {
        return this.eth_call(functions.isValidTokenOut, {token})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    previewDeposit(tokenIn: PreviewDepositParams["tokenIn"], amountTokenToDeposit: PreviewDepositParams["amountTokenToDeposit"]) {
        return this.eth_call(functions.previewDeposit, {tokenIn, amountTokenToDeposit})
    }

    previewRedeem(tokenOut: PreviewRedeemParams["tokenOut"], amountSharesToRedeem: PreviewRedeemParams["amountSharesToRedeem"]) {
        return this.eth_call(functions.previewRedeem, {tokenOut, amountSharesToRedeem})
    }

    rewardIndexesStored() {
        return this.eth_call(functions.rewardIndexesStored, {})
    }

    symbol() {
        return this.eth_call(functions.symbol, {})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }

    yieldToken() {
        return this.eth_call(functions.yieldToken, {})
    }
}

/// Event types
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type ClaimRewardsEventArgs = EParams<typeof events.ClaimRewards>
export type DepositEventArgs = EParams<typeof events.Deposit>
export type RedeemEventArgs = EParams<typeof events.Redeem>
export type TransferEventArgs = EParams<typeof events.Transfer>

/// Function types
export type AccruedRewardsParams = FunctionArguments<typeof functions.accruedRewards>
export type AccruedRewardsReturn = FunctionReturn<typeof functions.accruedRewards>

export type AllowanceParams = FunctionArguments<typeof functions.allowance>
export type AllowanceReturn = FunctionReturn<typeof functions.allowance>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type AssetInfoParams = FunctionArguments<typeof functions.assetInfo>
export type AssetInfoReturn = FunctionReturn<typeof functions.assetInfo>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type ClaimRewardsParams = FunctionArguments<typeof functions.claimRewards>
export type ClaimRewardsReturn = FunctionReturn<typeof functions.claimRewards>

export type DecimalsParams = FunctionArguments<typeof functions.decimals>
export type DecimalsReturn = FunctionReturn<typeof functions.decimals>

export type DepositParams = FunctionArguments<typeof functions.deposit>
export type DepositReturn = FunctionReturn<typeof functions.deposit>

export type ExchangeRateParams = FunctionArguments<typeof functions.exchangeRate>
export type ExchangeRateReturn = FunctionReturn<typeof functions.exchangeRate>

export type GetRewardTokensParams = FunctionArguments<typeof functions.getRewardTokens>
export type GetRewardTokensReturn = FunctionReturn<typeof functions.getRewardTokens>

export type GetTokensInParams = FunctionArguments<typeof functions.getTokensIn>
export type GetTokensInReturn = FunctionReturn<typeof functions.getTokensIn>

export type GetTokensOutParams = FunctionArguments<typeof functions.getTokensOut>
export type GetTokensOutReturn = FunctionReturn<typeof functions.getTokensOut>

export type IsValidTokenInParams = FunctionArguments<typeof functions.isValidTokenIn>
export type IsValidTokenInReturn = FunctionReturn<typeof functions.isValidTokenIn>

export type IsValidTokenOutParams = FunctionArguments<typeof functions.isValidTokenOut>
export type IsValidTokenOutReturn = FunctionReturn<typeof functions.isValidTokenOut>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type PreviewDepositParams = FunctionArguments<typeof functions.previewDeposit>
export type PreviewDepositReturn = FunctionReturn<typeof functions.previewDeposit>

export type PreviewRedeemParams = FunctionArguments<typeof functions.previewRedeem>
export type PreviewRedeemReturn = FunctionReturn<typeof functions.previewRedeem>

export type RedeemParams = FunctionArguments<typeof functions.redeem>
export type RedeemReturn = FunctionReturn<typeof functions.redeem>

export type RewardIndexesCurrentParams = FunctionArguments<typeof functions.rewardIndexesCurrent>
export type RewardIndexesCurrentReturn = FunctionReturn<typeof functions.rewardIndexesCurrent>

export type RewardIndexesStoredParams = FunctionArguments<typeof functions.rewardIndexesStored>
export type RewardIndexesStoredReturn = FunctionReturn<typeof functions.rewardIndexesStored>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type TransferParams = FunctionArguments<typeof functions.transfer>
export type TransferReturn = FunctionReturn<typeof functions.transfer>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

export type YieldTokenParams = FunctionArguments<typeof functions.yieldToken>
export type YieldTokenReturn = FunctionReturn<typeof functions.yieldToken>

