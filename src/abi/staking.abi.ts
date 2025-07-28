export const ABI_JSON = [
    {
        "type": "event",
        "anonymous": false,
        "name": "Add",
        "inputs": [
            {
                "type": "address",
                "name": "stakToken",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "allocPoint",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "ClaimRewardFromVault",
        "inputs": [
            {
                "type": "address",
                "name": "userAddress",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "pid",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "DelegateVotesChanged",
        "inputs": [
            {
                "type": "address",
                "name": "delegate",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "previousBalance",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "newBalance",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "EmergencyWithdraw",
        "inputs": [
            {
                "type": "address",
                "name": "user",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "pid",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "amount",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "type": "address",
                "name": "previousOwner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newOwner",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Set",
        "inputs": [
            {
                "type": "uint256",
                "name": "pid",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "allocPoint",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Stake",
        "inputs": [
            {
                "type": "address",
                "name": "user",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "pid",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "amount",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Withdraw",
        "inputs": [
            {
                "type": "address",
                "name": "user",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "pid",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "amount",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "reward",
                "indexed": false
            }
        ]
    },
    {
        "type": "function",
        "name": "BONUS_MULTIPLIER",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "add",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_allocPoint"
            },
            {
                "type": "address",
                "name": "_stakeToken"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "bonusEndBlock",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "checkpoints",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
            },
            {
                "type": "address",
                "name": ""
            },
            {
                "type": "uint32",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "uint32",
                "name": "fromBlock"
            },
            {
                "type": "uint256",
                "name": "votes"
            }
        ]
    },
    {
        "type": "function",
        "name": "claimRewardFromVault",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "userAddress"
            },
            {
                "type": "uint256",
                "name": "pid"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "emergencyWithdraw",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "getMultiplier",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_from"
            },
            {
                "type": "uint256",
                "name": "_to"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getPriorVotes",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            },
            {
                "type": "address",
                "name": "account"
            },
            {
                "type": "uint256",
                "name": "blockNumber"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getStakingAmount",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "pid"
            },
            {
                "type": "address",
                "name": "user"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "initialize",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_rewardToken"
            },
            {
                "type": "uint256",
                "name": "_rewardPerBlock"
            },
            {
                "type": "uint256",
                "name": "_startBlock"
            },
            {
                "type": "uint256",
                "name": "_bonusEndBlock"
            },
            {
                "type": "uint256",
                "name": "_multiplier"
            },
            {
                "type": "address",
                "name": "_rewardVault"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "massUpdatePools",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "numCheckpoints",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
            },
            {
                "type": "address",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "uint32",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "owner",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "pendingReward",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            },
            {
                "type": "address",
                "name": "_user"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "poolInfo",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "stakeToken"
            },
            {
                "type": "uint256",
                "name": "allocPoint"
            },
            {
                "type": "uint256",
                "name": "lastRewardBlock"
            },
            {
                "type": "uint256",
                "name": "accCHNPerShare"
            },
            {
                "type": "uint256",
                "name": "totalAmountStake"
            }
        ]
    },
    {
        "type": "function",
        "name": "poolLength",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "poolTokens",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "rewardPerBlock",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "rewardToken",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "rewardVault",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "set",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            },
            {
                "type": "uint256",
                "name": "_allocPoint"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setRewardPerblock",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "speed"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "stake",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            },
            {
                "type": "uint256",
                "name": "_amount"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "startBlock",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "totalAllocPoint",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "newOwner"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "updatePool",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "userInfo",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
            },
            {
                "type": "address",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "uint256",
                "name": "rewardDebt"
            },
            {
                "type": "uint256",
                "name": "pendingTokenReward"
            }
        ]
    },
    {
        "type": "function",
        "name": "withdraw",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            },
            {
                "type": "uint256",
                "name": "_amount"
            }
        ],
        "outputs": []
    }
]
