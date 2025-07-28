import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './staking.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Add: new LogEvent<([stakToken: string, allocPoint: bigint] & {stakToken: string, allocPoint: bigint})>(
        abi, '0x2728c9d3205d667bbc0eefdfeda366261b4d021949630c047f3e5834b30611ab'
    ),
    ClaimRewardFromVault: new LogEvent<([userAddress: string, pid: bigint] & {userAddress: string, pid: bigint})>(
        abi, '0x926f6d060d7b34315435a6af02d8d2f0382328cd5821183eadda8a4742258d46'
    ),
    DelegateVotesChanged: new LogEvent<([delegate: string, previousBalance: bigint, newBalance: bigint] & {delegate: string, previousBalance: bigint, newBalance: bigint})>(
        abi, '0xdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724'
    ),
    EmergencyWithdraw: new LogEvent<([user: string, pid: bigint, amount: bigint] & {user: string, pid: bigint, amount: bigint})>(
        abi, '0xbb757047c2b5f3974fe26b7c10f732e7bce710b0952a71082702781e62ae0595'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    Set: new LogEvent<([pid: bigint, allocPoint: bigint] & {pid: bigint, allocPoint: bigint})>(
        abi, '0x545b620a3000f6303b158b321f06b4e95e28a27d70aecac8c6bdac4f48a9f6b3'
    ),
    Stake: new LogEvent<([user: string, pid: bigint, amount: bigint] & {user: string, pid: bigint, amount: bigint})>(
        abi, '0x5af417134f72a9d41143ace85b0a26dce6f550f894f2cbc1eeee8810603d91b6'
    ),
    Withdraw: new LogEvent<([user: string, pid: bigint, amount: bigint, reward: bigint] & {user: string, pid: bigint, amount: bigint, reward: bigint})>(
        abi, '0x02f25270a4d87bea75db541cdfe559334a275b4a233520ed6c0a2429667cca94'
    ),
}

export const functions = {
    BONUS_MULTIPLIER: new Func<[], {}, bigint>(
        abi, '0x8aa28550'
    ),
    add: new Func<[_allocPoint: bigint, _stakeToken: string], {_allocPoint: bigint, _stakeToken: string}, []>(
        abi, '0x2b8bbbe8'
    ),
    bonusEndBlock: new Func<[], {}, bigint>(
        abi, '0x1aed6553'
    ),
    checkpoints: new Func<[_: bigint, _: string, _: number], {}, ([fromBlock: number, votes: bigint] & {fromBlock: number, votes: bigint})>(
        abi, '0x525eef2f'
    ),
    claimRewardFromVault: new Func<[userAddress: string, pid: bigint], {userAddress: string, pid: bigint}, bigint>(
        abi, '0x4bea3f03'
    ),
    emergencyWithdraw: new Func<[_pid: bigint], {_pid: bigint}, []>(
        abi, '0x5312ea8e'
    ),
    getMultiplier: new Func<[_from: bigint, _to: bigint], {_from: bigint, _to: bigint}, bigint>(
        abi, '0x8dbb1e3a'
    ),
    getPriorVotes: new Func<[_pid: bigint, account: string, blockNumber: bigint], {_pid: bigint, account: string, blockNumber: bigint}, bigint>(
        abi, '0xc418441c'
    ),
    getStakingAmount: new Func<[pid: bigint, user: string], {pid: bigint, user: string}, bigint>(
        abi, '0xb3349467'
    ),
    initialize: new Func<[_rewardToken: string, _rewardPerBlock: bigint, _startBlock: bigint, _bonusEndBlock: bigint, _multiplier: bigint, _rewardVault: string], {_rewardToken: string, _rewardPerBlock: bigint, _startBlock: bigint, _bonusEndBlock: bigint, _multiplier: bigint, _rewardVault: string}, []>(
        abi, '0x5df5f96f'
    ),
    massUpdatePools: new Func<[], {}, []>(
        abi, '0x630b5ba1'
    ),
    numCheckpoints: new Func<[_: bigint, _: string], {}, number>(
        abi, '0xd82ada50'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    pendingReward: new Func<[_pid: bigint, _user: string], {_pid: bigint, _user: string}, bigint>(
        abi, '0x98969e82'
    ),
    poolInfo: new Func<[_: bigint], {}, ([stakeToken: string, allocPoint: bigint, lastRewardBlock: bigint, accCHNPerShare: bigint, totalAmountStake: bigint] & {stakeToken: string, allocPoint: bigint, lastRewardBlock: bigint, accCHNPerShare: bigint, totalAmountStake: bigint})>(
        abi, '0x1526fe27'
    ),
    poolLength: new Func<[], {}, bigint>(
        abi, '0x081e3eda'
    ),
    poolTokens: new Func<[_: string], {}, boolean>(
        abi, '0xa9126169'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    rewardPerBlock: new Func<[], {}, bigint>(
        abi, '0x8ae39cac'
    ),
    rewardToken: new Func<[], {}, string>(
        abi, '0xf7c618c1'
    ),
    rewardVault: new Func<[], {}, string>(
        abi, '0x3a2c6777'
    ),
    set: new Func<[_pid: bigint, _allocPoint: bigint], {_pid: bigint, _allocPoint: bigint}, []>(
        abi, '0x1ab06ee5'
    ),
    setRewardPerblock: new Func<[speed: bigint], {speed: bigint}, []>(
        abi, '0xa6d6f4ed'
    ),
    stake: new Func<[_pid: bigint, _amount: bigint], {_pid: bigint, _amount: bigint}, []>(
        abi, '0x7b0472f0'
    ),
    startBlock: new Func<[], {}, bigint>(
        abi, '0x48cd4cb1'
    ),
    totalAllocPoint: new Func<[], {}, bigint>(
        abi, '0x17caf6f1'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    updatePool: new Func<[_pid: bigint], {_pid: bigint}, []>(
        abi, '0x51eb05a6'
    ),
    userInfo: new Func<[_: bigint, _: string], {}, ([amount: bigint, rewardDebt: bigint, pendingTokenReward: bigint] & {amount: bigint, rewardDebt: bigint, pendingTokenReward: bigint})>(
        abi, '0x93f1a40b'
    ),
    withdraw: new Func<[_pid: bigint, _amount: bigint], {_pid: bigint, _amount: bigint}, []>(
        abi, '0x441a3e70'
    ),
}

export class Contract extends ContractBase {

    BONUS_MULTIPLIER(): Promise<bigint> {
        return this.eth_call(functions.BONUS_MULTIPLIER, [])
    }

    bonusEndBlock(): Promise<bigint> {
        return this.eth_call(functions.bonusEndBlock, [])
    }

    checkpoints(arg0: bigint, arg1: string, arg2: number): Promise<([fromBlock: number, votes: bigint] & {fromBlock: number, votes: bigint})> {
        return this.eth_call(functions.checkpoints, [arg0, arg1, arg2])
    }

    getMultiplier(_from: bigint, _to: bigint): Promise<bigint> {
        return this.eth_call(functions.getMultiplier, [_from, _to])
    }

    getPriorVotes(_pid: bigint, account: string, blockNumber: bigint): Promise<bigint> {
        return this.eth_call(functions.getPriorVotes, [_pid, account, blockNumber])
    }

    getStakingAmount(pid: bigint, user: string): Promise<bigint> {
        return this.eth_call(functions.getStakingAmount, [pid, user])
    }

    numCheckpoints(arg0: bigint, arg1: string): Promise<number> {
        return this.eth_call(functions.numCheckpoints, [arg0, arg1])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    pendingReward(_pid: bigint, _user: string): Promise<bigint> {
        return this.eth_call(functions.pendingReward, [_pid, _user])
    }

    poolInfo(arg0: bigint): Promise<([stakeToken: string, allocPoint: bigint, lastRewardBlock: bigint, accCHNPerShare: bigint, totalAmountStake: bigint] & {stakeToken: string, allocPoint: bigint, lastRewardBlock: bigint, accCHNPerShare: bigint, totalAmountStake: bigint})> {
        return this.eth_call(functions.poolInfo, [arg0])
    }

    poolLength(): Promise<bigint> {
        return this.eth_call(functions.poolLength, [])
    }

    poolTokens(arg0: string): Promise<boolean> {
        return this.eth_call(functions.poolTokens, [arg0])
    }

    rewardPerBlock(): Promise<bigint> {
        return this.eth_call(functions.rewardPerBlock, [])
    }

    rewardToken(): Promise<string> {
        return this.eth_call(functions.rewardToken, [])
    }

    rewardVault(): Promise<string> {
        return this.eth_call(functions.rewardVault, [])
    }

    startBlock(): Promise<bigint> {
        return this.eth_call(functions.startBlock, [])
    }

    totalAllocPoint(): Promise<bigint> {
        return this.eth_call(functions.totalAllocPoint, [])
    }

    userInfo(arg0: bigint, arg1: string): Promise<([amount: bigint, rewardDebt: bigint, pendingTokenReward: bigint] & {amount: bigint, rewardDebt: bigint, pendingTokenReward: bigint})> {
        return this.eth_call(functions.userInfo, [arg0, arg1])
    }
}
