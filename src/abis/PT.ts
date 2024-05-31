import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", {"owner": indexed(p.address), "spender": indexed(p.address), "value": p.uint256}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", {"from": indexed(p.address), "to": indexed(p.address), "value": p.uint256}),
}

export const functions = {
    SY: viewFun("0xafd27bf5", {}, p.address),
    YT: viewFun("0x781c18db", {}, p.address),
    allowance: viewFun("0xdd62ed3e", {"owner": p.address, "spender": p.address}, p.uint256),
    approve: fun("0x095ea7b3", {"spender": p.address, "amount": p.uint256}, p.bool),
    balanceOf: viewFun("0x70a08231", {"account": p.address}, p.uint256),
    burnByYT: fun("0xb64761f9", {"user": p.address, "amount": p.uint256}, ),
    decimals: viewFun("0x313ce567", {}, p.uint8),
    expiry: viewFun("0xe184c9be", {}, p.uint256),
    factory: viewFun("0xc45a0155", {}, p.address),
    initialize: fun("0xc4d66de8", {"_YT": p.address}, ),
    isExpired: viewFun("0x2f13b60c", {}, p.bool),
    mintByYT: fun("0x12a31dcc", {"user": p.address, "amount": p.uint256}, ),
    name: viewFun("0x06fdde03", {}, p.string),
    symbol: viewFun("0x95d89b41", {}, p.string),
    totalSupply: viewFun("0x18160ddd", {}, p.uint256),
    transfer: fun("0xa9059cbb", {"to": p.address, "amount": p.uint256}, p.bool),
    transferFrom: fun("0x23b872dd", {"from": p.address, "to": p.address, "amount": p.uint256}, p.bool),
}

export class Contract extends ContractBase {

    SY() {
        return this.eth_call(functions.SY, {})
    }

    YT() {
        return this.eth_call(functions.YT, {})
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

    isExpired() {
        return this.eth_call(functions.isExpired, {})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    symbol() {
        return this.eth_call(functions.symbol, {})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }
}

/// Event types
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type TransferEventArgs = EParams<typeof events.Transfer>

/// Function types
export type SYParams = FunctionArguments<typeof functions.SY>
export type SYReturn = FunctionReturn<typeof functions.SY>

export type YTParams = FunctionArguments<typeof functions.YT>
export type YTReturn = FunctionReturn<typeof functions.YT>

export type AllowanceParams = FunctionArguments<typeof functions.allowance>
export type AllowanceReturn = FunctionReturn<typeof functions.allowance>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type BurnByYTParams = FunctionArguments<typeof functions.burnByYT>
export type BurnByYTReturn = FunctionReturn<typeof functions.burnByYT>

export type DecimalsParams = FunctionArguments<typeof functions.decimals>
export type DecimalsReturn = FunctionReturn<typeof functions.decimals>

export type ExpiryParams = FunctionArguments<typeof functions.expiry>
export type ExpiryReturn = FunctionReturn<typeof functions.expiry>

export type FactoryParams = FunctionArguments<typeof functions.factory>
export type FactoryReturn = FunctionReturn<typeof functions.factory>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsExpiredParams = FunctionArguments<typeof functions.isExpired>
export type IsExpiredReturn = FunctionReturn<typeof functions.isExpired>

export type MintByYTParams = FunctionArguments<typeof functions.mintByYT>
export type MintByYTReturn = FunctionReturn<typeof functions.mintByYT>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type TransferParams = FunctionArguments<typeof functions.transfer>
export type TransferReturn = FunctionReturn<typeof functions.transfer>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

