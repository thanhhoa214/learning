// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Faucet {
    function withdraw() external {
        payable(msg.sender).transfer(0.005 ether);
    }

    receive() external payable {}
}
