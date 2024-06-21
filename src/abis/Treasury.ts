import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Initialized: event("0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498", {"version": p.uint8}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    RedeemSyToToken: event("0x64f0c68ed440e9cecd5286d6610ef48dd7db3e7d80a8bdd3a54dde81637f177a", {"market": p.address, "tokenOut": p.address, "wTime": p.uint128, "amount": p.uint256}),
}

export const functions = {
    addWhitelistDistributor: fun("0xf0d15216", {"distributor": p.address}, ),
    claimOwnership: fun("0x4e71e0c8", {}, ),
    feeTo: viewFun("0x017e7e58", {}, p.address),
    getAccumulatedAmount: viewFun("0x73e00b2b", {"market": p.address, "token": p.address, "wTime": p.uint128}, p.uint256),
    maxReserveFeePercent: viewFun("0xe50bf2dc", {}, p.uint8),
    owner: viewFun("0x8da5cb5b", {}, p.address),
    pendingOwner: viewFun("0xe30c3978", {}, p.address),
    redeemSyToToken: fun("0x27146cac", {"market": p.address, "output": p.struct({"tokenOut": p.address, "minTokenOut": p.uint256, "tokenRedeemSy": p.address, "zenlinkSwap": p.address, "swapData": p.struct({"swapType": p.uint8, "executor": p.address, "route": p.bytes})})}, ),
    redeemToken: fun("0x0d71bdc3", {"token": p.address, "to": p.address, "amount": p.uint256}, ),
    removeWhitelistDistributor: fun("0xeeb3bfcf", {"distributor": p.address}, ),
    reserveFeePercent: viewFun("0x1feec244", {}, p.uint8),
    setFeeToAndFeeReserve: fun("0x3b0c38df", {"newFeeTo": p.address, "newReserveFeePercent": p.uint8}, ),
    transferOwnership: fun("0x078dfbe7", {"newOwner": p.address, "direct": p.bool, "renounce": p.bool}, ),
}

export class Contract extends ContractBase {

    feeTo() {
        return this.eth_call(functions.feeTo, {})
    }

    getAccumulatedAmount(market: GetAccumulatedAmountParams["market"], token: GetAccumulatedAmountParams["token"], wTime: GetAccumulatedAmountParams["wTime"]) {
        return this.eth_call(functions.getAccumulatedAmount, {market, token, wTime})
    }

    maxReserveFeePercent() {
        return this.eth_call(functions.maxReserveFeePercent, {})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    pendingOwner() {
        return this.eth_call(functions.pendingOwner, {})
    }

    reserveFeePercent() {
        return this.eth_call(functions.reserveFeePercent, {})
    }
}

/// Event types
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type RedeemSyToTokenEventArgs = EParams<typeof events.RedeemSyToToken>

/// Function types
export type AddWhitelistDistributorParams = FunctionArguments<typeof functions.addWhitelistDistributor>
export type AddWhitelistDistributorReturn = FunctionReturn<typeof functions.addWhitelistDistributor>

export type ClaimOwnershipParams = FunctionArguments<typeof functions.claimOwnership>
export type ClaimOwnershipReturn = FunctionReturn<typeof functions.claimOwnership>

export type FeeToParams = FunctionArguments<typeof functions.feeTo>
export type FeeToReturn = FunctionReturn<typeof functions.feeTo>

export type GetAccumulatedAmountParams = FunctionArguments<typeof functions.getAccumulatedAmount>
export type GetAccumulatedAmountReturn = FunctionReturn<typeof functions.getAccumulatedAmount>

export type MaxReserveFeePercentParams = FunctionArguments<typeof functions.maxReserveFeePercent>
export type MaxReserveFeePercentReturn = FunctionReturn<typeof functions.maxReserveFeePercent>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type PendingOwnerParams = FunctionArguments<typeof functions.pendingOwner>
export type PendingOwnerReturn = FunctionReturn<typeof functions.pendingOwner>

export type RedeemSyToTokenParams = FunctionArguments<typeof functions.redeemSyToToken>
export type RedeemSyToTokenReturn = FunctionReturn<typeof functions.redeemSyToToken>

export type RedeemTokenParams = FunctionArguments<typeof functions.redeemToken>
export type RedeemTokenReturn = FunctionReturn<typeof functions.redeemToken>

export type RemoveWhitelistDistributorParams = FunctionArguments<typeof functions.removeWhitelistDistributor>
export type RemoveWhitelistDistributorReturn = FunctionReturn<typeof functions.removeWhitelistDistributor>

export type ReserveFeePercentParams = FunctionArguments<typeof functions.reserveFeePercent>
export type ReserveFeePercentReturn = FunctionReturn<typeof functions.reserveFeePercent>

export type SetFeeToAndFeeReserveParams = FunctionArguments<typeof functions.setFeeToAndFeeReserve>
export type SetFeeToAndFeeReserveReturn = FunctionReturn<typeof functions.setFeeToAndFeeReserve>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

