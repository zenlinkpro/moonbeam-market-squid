import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    AddPool: event("0x336f0b3cc523e98d21e261389542b62abaffc094a21a82f1eec2779d7c8323cb", {"chainId": indexed(p.uint64), "pool": indexed(p.address)}),
    AdminChanged: event("0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f", {"previousAdmin": p.address, "newAdmin": p.address}),
    BeaconUpgraded: event("0x1cf3b03a6cf19fa2baba4df148e9dcabedea7f8a5c07840e207e5c089be95d3e", {"beacon": indexed(p.address)}),
    BroadcastResults: event("0xc78a580f215ba474e75ecbd7636c375e8d2cd25edb0f2467f99b2d0752e104ba", {"chainId": indexed(p.uint64), "wTime": indexed(p.uint128), "totalZLKPerSec": p.uint128}),
    Initialized: event("0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498", {"version": p.uint8}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    PoolVoteChange: event("0xa512c82e73ec974de3c794a3ea6bbdfbad18531c1394ace9972f3f0166b67863", {"pool": indexed(p.address), "vote": p.struct({"bias": p.uint128, "slope": p.uint128})}),
    RemovePool: event("0xf2e3b584c4d1ed5ead9a4b7de2a8225fd42d13f09e417cd294d03f1dd07fc914", {"chainId": indexed(p.uint64), "pool": indexed(p.address)}),
    SetZLKPerSec: event("0x415aff8bca0fbb5b26c8976127b380373d8831645591229178dce3dbc2480ddf", {"newZLKPerSec": p.uint256}),
    Upgraded: event("0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b", {"implementation": indexed(p.address)}),
    Vote: event("0xc71e393f1527f71ce01b78ea87c9bd4fca84f1482359ce7ac9b73f358c61b1e1", {"user": indexed(p.address), "pool": indexed(p.address), "weight": p.uint64, "vote": p.struct({"bias": p.uint128, "slope": p.uint128})}),
}

export const functions = {
    GOVERNANCE_ZLK_VOTE: viewFun("0xb837b3db", {}, p.uint128),
    MAX_LOCK_TIME: viewFun("0xfa78668f", {}, p.uint128),
    WEEK: viewFun("0xf4359ce5", {}, p.uint128),
    addDestinationContract: fun("0x21049028", {"_address": p.address, "_chainId": p.uint256}, ),
    addPool: fun("0xd68ffecb", {"chainId": p.uint64, "pool": p.address}, ),
    applyPoolSlopeChanges: fun("0x38b8765c", {"pool": p.address}, ),
    approxDstExecutionGas: viewFun("0x9efc7575", {}, p.uint256),
    broadcastResults: fun("0xc291230d", {"chainId": p.uint64}, ),
    claimOwnership: fun("0x4e71e0c8", {}, ),
    deployedWTime: viewFun("0xb292bf95", {}, p.uint128),
    finalizeEpoch: fun("0x82ae9ef7", {}, ),
    forceBroadcastResults: fun("0x1c9bdb49", {"chainId": p.uint64, "wTime": p.uint128, "forcedzlkPerSec": p.uint128}, ),
    getActiveChainPools: viewFun("0x16ac7e30", {"chainId": p.uint64}, p.array(p.address)),
    getAllActivePools: viewFun("0xd5cd7d20", {}, p.array(p.address)),
    getAllDestinationContracts: viewFun("0x3e39b650", {}, {"chainIds": p.array(p.uint256), "addrs": p.array(p.address)}),
    getAllRemovedPools: viewFun("0xcc88370e", {"start": p.uint256, "end": p.uint256}, {"lengthOfRemovedPools": p.uint256, "arr": p.array(p.address)}),
    getBroadcastResultFee: viewFun("0x2477bfbe", {"chainId": p.uint64}, p.uint256),
    getPoolData: viewFun("0x366c771d", {"pool": p.address, "wTimes": p.array(p.uint128)}, {"chainId": p.uint64, "lastSlopeChangeAppliedAt": p.uint128, "totalVote": p.struct({"bias": p.uint128, "slope": p.uint128}), "slopeChanges": p.array(p.uint128)}),
    getPoolTotalVoteAt: viewFun("0xf144cf17", {"pool": p.address, "wTime": p.uint128}, p.uint128),
    getUserData: viewFun("0x8f45ff78", {"user": p.address, "pools": p.array(p.address)}, {"totalVotedWeight": p.uint64, "voteForPools": p.array(p.struct({"weight": p.uint64, "vote": p.struct({"bias": p.uint128, "slope": p.uint128})}))}),
    getUserPoolHistoryAt: viewFun("0x632c096d", {"user": p.address, "pool": p.address, "index": p.uint256}, p.struct({"timestamp": p.uint128, "value": p.struct({"bias": p.uint128, "slope": p.uint128})})),
    getUserPoolHistoryLength: viewFun("0x6aea2826", {"user": p.address, "pool": p.address}, p.uint256),
    getUserPoolVote: viewFun("0x646fb67c", {"user": p.address, "pool": p.address}, p.struct({"weight": p.uint64, "vote": p.struct({"bias": p.uint128, "slope": p.uint128})})),
    getWeekData: viewFun("0x8d66c284", {"wTime": p.uint128, "pools": p.array(p.address)}, {"isEpochFinalized": p.bool, "totalVotes": p.uint128, "poolVotes": p.array(p.uint128)}),
    initialize: fun("0x8129fc1c", {}, ),
    owner: viewFun("0x8da5cb5b", {}, p.address),
    pendingOwner: viewFun("0xe30c3978", {}, p.address),
    proxiableUUID: viewFun("0x52d1902d", {}, p.bytes32),
    removePool: fun("0x3b7d0946", {"pool": p.address}, ),
    setApproxDstExecutionGas: fun("0xd45f5e21", {"gas": p.uint256}, ),
    setZLKPerSec: fun("0x95de8fa1", {"newZLKPerSec": p.uint128}, ),
    transferOwnership: fun("0x078dfbe7", {"newOwner": p.address, "direct": p.bool, "renounce": p.bool}, ),
    upgradeTo: fun("0x3659cfe6", {"newImplementation": p.address}, ),
    upgradeToAndCall: fun("0x4f1ef286", {"newImplementation": p.address, "data": p.bytes}, ),
    veZLK: viewFun("0x36539c54", {}, p.address),
    vote: fun("0x698766ee", {"pools": p.array(p.address), "weights": p.array(p.uint64)}, ),
    zenlinkMsgSendEndpoint: viewFun("0xb77f1ba3", {}, p.address),
    zlkPerSec: viewFun("0x3f81a664", {}, p.uint128),
}

export class Contract extends ContractBase {

    GOVERNANCE_ZLK_VOTE() {
        return this.eth_call(functions.GOVERNANCE_ZLK_VOTE, {})
    }

    MAX_LOCK_TIME() {
        return this.eth_call(functions.MAX_LOCK_TIME, {})
    }

    WEEK() {
        return this.eth_call(functions.WEEK, {})
    }

    approxDstExecutionGas() {
        return this.eth_call(functions.approxDstExecutionGas, {})
    }

    deployedWTime() {
        return this.eth_call(functions.deployedWTime, {})
    }

    getActiveChainPools(chainId: GetActiveChainPoolsParams["chainId"]) {
        return this.eth_call(functions.getActiveChainPools, {chainId})
    }

    getAllActivePools() {
        return this.eth_call(functions.getAllActivePools, {})
    }

    getAllDestinationContracts() {
        return this.eth_call(functions.getAllDestinationContracts, {})
    }

    getAllRemovedPools(start: GetAllRemovedPoolsParams["start"], end: GetAllRemovedPoolsParams["end"]) {
        return this.eth_call(functions.getAllRemovedPools, {start, end})
    }

    getBroadcastResultFee(chainId: GetBroadcastResultFeeParams["chainId"]) {
        return this.eth_call(functions.getBroadcastResultFee, {chainId})
    }

    getPoolData(pool: GetPoolDataParams["pool"], wTimes: GetPoolDataParams["wTimes"]) {
        return this.eth_call(functions.getPoolData, {pool, wTimes})
    }

    getPoolTotalVoteAt(pool: GetPoolTotalVoteAtParams["pool"], wTime: GetPoolTotalVoteAtParams["wTime"]) {
        return this.eth_call(functions.getPoolTotalVoteAt, {pool, wTime})
    }

    getUserData(user: GetUserDataParams["user"], pools: GetUserDataParams["pools"]) {
        return this.eth_call(functions.getUserData, {user, pools})
    }

    getUserPoolHistoryAt(user: GetUserPoolHistoryAtParams["user"], pool: GetUserPoolHistoryAtParams["pool"], index: GetUserPoolHistoryAtParams["index"]) {
        return this.eth_call(functions.getUserPoolHistoryAt, {user, pool, index})
    }

    getUserPoolHistoryLength(user: GetUserPoolHistoryLengthParams["user"], pool: GetUserPoolHistoryLengthParams["pool"]) {
        return this.eth_call(functions.getUserPoolHistoryLength, {user, pool})
    }

    getUserPoolVote(user: GetUserPoolVoteParams["user"], pool: GetUserPoolVoteParams["pool"]) {
        return this.eth_call(functions.getUserPoolVote, {user, pool})
    }

    getWeekData(wTime: GetWeekDataParams["wTime"], pools: GetWeekDataParams["pools"]) {
        return this.eth_call(functions.getWeekData, {wTime, pools})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    pendingOwner() {
        return this.eth_call(functions.pendingOwner, {})
    }

    proxiableUUID() {
        return this.eth_call(functions.proxiableUUID, {})
    }

    veZLK() {
        return this.eth_call(functions.veZLK, {})
    }

    zenlinkMsgSendEndpoint() {
        return this.eth_call(functions.zenlinkMsgSendEndpoint, {})
    }

    zlkPerSec() {
        return this.eth_call(functions.zlkPerSec, {})
    }
}

/// Event types
export type AddPoolEventArgs = EParams<typeof events.AddPool>
export type AdminChangedEventArgs = EParams<typeof events.AdminChanged>
export type BeaconUpgradedEventArgs = EParams<typeof events.BeaconUpgraded>
export type BroadcastResultsEventArgs = EParams<typeof events.BroadcastResults>
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type PoolVoteChangeEventArgs = EParams<typeof events.PoolVoteChange>
export type RemovePoolEventArgs = EParams<typeof events.RemovePool>
export type SetZLKPerSecEventArgs = EParams<typeof events.SetZLKPerSec>
export type UpgradedEventArgs = EParams<typeof events.Upgraded>
export type VoteEventArgs = EParams<typeof events.Vote>

/// Function types
export type GOVERNANCE_ZLK_VOTEParams = FunctionArguments<typeof functions.GOVERNANCE_ZLK_VOTE>
export type GOVERNANCE_ZLK_VOTEReturn = FunctionReturn<typeof functions.GOVERNANCE_ZLK_VOTE>

export type MAX_LOCK_TIMEParams = FunctionArguments<typeof functions.MAX_LOCK_TIME>
export type MAX_LOCK_TIMEReturn = FunctionReturn<typeof functions.MAX_LOCK_TIME>

export type WEEKParams = FunctionArguments<typeof functions.WEEK>
export type WEEKReturn = FunctionReturn<typeof functions.WEEK>

export type AddDestinationContractParams = FunctionArguments<typeof functions.addDestinationContract>
export type AddDestinationContractReturn = FunctionReturn<typeof functions.addDestinationContract>

export type AddPoolParams = FunctionArguments<typeof functions.addPool>
export type AddPoolReturn = FunctionReturn<typeof functions.addPool>

export type ApplyPoolSlopeChangesParams = FunctionArguments<typeof functions.applyPoolSlopeChanges>
export type ApplyPoolSlopeChangesReturn = FunctionReturn<typeof functions.applyPoolSlopeChanges>

export type ApproxDstExecutionGasParams = FunctionArguments<typeof functions.approxDstExecutionGas>
export type ApproxDstExecutionGasReturn = FunctionReturn<typeof functions.approxDstExecutionGas>

export type BroadcastResultsParams = FunctionArguments<typeof functions.broadcastResults>
export type BroadcastResultsReturn = FunctionReturn<typeof functions.broadcastResults>

export type ClaimOwnershipParams = FunctionArguments<typeof functions.claimOwnership>
export type ClaimOwnershipReturn = FunctionReturn<typeof functions.claimOwnership>

export type DeployedWTimeParams = FunctionArguments<typeof functions.deployedWTime>
export type DeployedWTimeReturn = FunctionReturn<typeof functions.deployedWTime>

export type FinalizeEpochParams = FunctionArguments<typeof functions.finalizeEpoch>
export type FinalizeEpochReturn = FunctionReturn<typeof functions.finalizeEpoch>

export type ForceBroadcastResultsParams = FunctionArguments<typeof functions.forceBroadcastResults>
export type ForceBroadcastResultsReturn = FunctionReturn<typeof functions.forceBroadcastResults>

export type GetActiveChainPoolsParams = FunctionArguments<typeof functions.getActiveChainPools>
export type GetActiveChainPoolsReturn = FunctionReturn<typeof functions.getActiveChainPools>

export type GetAllActivePoolsParams = FunctionArguments<typeof functions.getAllActivePools>
export type GetAllActivePoolsReturn = FunctionReturn<typeof functions.getAllActivePools>

export type GetAllDestinationContractsParams = FunctionArguments<typeof functions.getAllDestinationContracts>
export type GetAllDestinationContractsReturn = FunctionReturn<typeof functions.getAllDestinationContracts>

export type GetAllRemovedPoolsParams = FunctionArguments<typeof functions.getAllRemovedPools>
export type GetAllRemovedPoolsReturn = FunctionReturn<typeof functions.getAllRemovedPools>

export type GetBroadcastResultFeeParams = FunctionArguments<typeof functions.getBroadcastResultFee>
export type GetBroadcastResultFeeReturn = FunctionReturn<typeof functions.getBroadcastResultFee>

export type GetPoolDataParams = FunctionArguments<typeof functions.getPoolData>
export type GetPoolDataReturn = FunctionReturn<typeof functions.getPoolData>

export type GetPoolTotalVoteAtParams = FunctionArguments<typeof functions.getPoolTotalVoteAt>
export type GetPoolTotalVoteAtReturn = FunctionReturn<typeof functions.getPoolTotalVoteAt>

export type GetUserDataParams = FunctionArguments<typeof functions.getUserData>
export type GetUserDataReturn = FunctionReturn<typeof functions.getUserData>

export type GetUserPoolHistoryAtParams = FunctionArguments<typeof functions.getUserPoolHistoryAt>
export type GetUserPoolHistoryAtReturn = FunctionReturn<typeof functions.getUserPoolHistoryAt>

export type GetUserPoolHistoryLengthParams = FunctionArguments<typeof functions.getUserPoolHistoryLength>
export type GetUserPoolHistoryLengthReturn = FunctionReturn<typeof functions.getUserPoolHistoryLength>

export type GetUserPoolVoteParams = FunctionArguments<typeof functions.getUserPoolVote>
export type GetUserPoolVoteReturn = FunctionReturn<typeof functions.getUserPoolVote>

export type GetWeekDataParams = FunctionArguments<typeof functions.getWeekData>
export type GetWeekDataReturn = FunctionReturn<typeof functions.getWeekData>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type PendingOwnerParams = FunctionArguments<typeof functions.pendingOwner>
export type PendingOwnerReturn = FunctionReturn<typeof functions.pendingOwner>

export type ProxiableUUIDParams = FunctionArguments<typeof functions.proxiableUUID>
export type ProxiableUUIDReturn = FunctionReturn<typeof functions.proxiableUUID>

export type RemovePoolParams = FunctionArguments<typeof functions.removePool>
export type RemovePoolReturn = FunctionReturn<typeof functions.removePool>

export type SetApproxDstExecutionGasParams = FunctionArguments<typeof functions.setApproxDstExecutionGas>
export type SetApproxDstExecutionGasReturn = FunctionReturn<typeof functions.setApproxDstExecutionGas>

export type SetZLKPerSecParams = FunctionArguments<typeof functions.setZLKPerSec>
export type SetZLKPerSecReturn = FunctionReturn<typeof functions.setZLKPerSec>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type UpgradeToParams = FunctionArguments<typeof functions.upgradeTo>
export type UpgradeToReturn = FunctionReturn<typeof functions.upgradeTo>

export type UpgradeToAndCallParams = FunctionArguments<typeof functions.upgradeToAndCall>
export type UpgradeToAndCallReturn = FunctionReturn<typeof functions.upgradeToAndCall>

export type VeZLKParams = FunctionArguments<typeof functions.veZLK>
export type VeZLKReturn = FunctionReturn<typeof functions.veZLK>

export type VoteParams = FunctionArguments<typeof functions.vote>
export type VoteReturn = FunctionReturn<typeof functions.vote>

export type ZenlinkMsgSendEndpointParams = FunctionArguments<typeof functions.zenlinkMsgSendEndpoint>
export type ZenlinkMsgSendEndpointReturn = FunctionReturn<typeof functions.zenlinkMsgSendEndpoint>

export type ZlkPerSecParams = FunctionArguments<typeof functions.zlkPerSec>
export type ZlkPerSecReturn = FunctionReturn<typeof functions.zlkPerSec>

