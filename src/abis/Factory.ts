import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    CreateNewMarket: event("0xae811fae25e2770b6bd1dcb1475657e8c3a976f91d1ebf081271db08eef920af", {"market": indexed(p.address), "PT": indexed(p.address), "scalarRoot": p.int256, "initialAnchor": p.int256, "lnFeeRateRoot": p.uint256}),
    NewTreasuryAndFeeReserve: event("0xc612910a1561af820dd8961721344b949df6bfcb3cd8dda1f87a5f25e80852cb", {"treasury": indexed(p.address), "reserveFeePercent": p.uint8}),
    SetGaugeController: event("0x613940253cf21d005743a34a04b5c9c39fb1700b83758166647e87af9b826ac7", {"gaugeController": indexed(p.address)}),
    SetOverriddenFee: event("0xea7fdf3abb8ced24e7f9c441f3e98071fb5ea1f9278e2b9202c4a6d306cce59f", {"router": indexed(p.address), "market": indexed(p.address), "lnFeeRateRoot": p.uint80}),
}

export const functions = {
    createNewMarket: fun("0xf661cf6b", {"PT": p.address, "scalarRoot": p.int256, "initialAnchor": p.int256, "lnFeeRateRoot": p.uint80}, p.address),
    getMarketConfig: viewFun("0x5c098c11", {"market": p.address, "router": p.address}, {"treasury": p.address, "overriddenFee": p.uint80, "reserveFeePercent": p.uint8}),
    isValidMarket: viewFun("0x58e6309f", {"market": p.address}, p.bool),
}

export class Contract extends ContractBase {

    getMarketConfig(market: GetMarketConfigParams["market"], router: GetMarketConfigParams["router"]) {
        return this.eth_call(functions.getMarketConfig, {market, router})
    }

    isValidMarket(market: IsValidMarketParams["market"]) {
        return this.eth_call(functions.isValidMarket, {market})
    }
}

/// Event types
export type CreateNewMarketEventArgs = EParams<typeof events.CreateNewMarket>
export type NewTreasuryAndFeeReserveEventArgs = EParams<typeof events.NewTreasuryAndFeeReserve>
export type SetGaugeControllerEventArgs = EParams<typeof events.SetGaugeController>
export type SetOverriddenFeeEventArgs = EParams<typeof events.SetOverriddenFee>

/// Function types
export type CreateNewMarketParams = FunctionArguments<typeof functions.createNewMarket>
export type CreateNewMarketReturn = FunctionReturn<typeof functions.createNewMarket>

export type GetMarketConfigParams = FunctionArguments<typeof functions.getMarketConfig>
export type GetMarketConfigReturn = FunctionReturn<typeof functions.getMarketConfig>

export type IsValidMarketParams = FunctionArguments<typeof functions.isValidMarket>
export type IsValidMarketReturn = FunctionReturn<typeof functions.isValidMarket>

