// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

interface CalleeContract {
    function attempt() external;
}

contract ContractCaller {
    function callContract(address con) external {
        CalleeContract(con).attempt();
    }
}
