// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Faucet {
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    function withdraw(uint _amount) external {
        require(_amount < 0.1 ether, "withdraw must less than 0.1 ether");
        payable(msg.sender).transfer(_amount);
    }

    function withdrawAll() external onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }

    function destroyFaucet() external onlyOwner {
        selfdestruct(owner);
    }

    receive() external payable {}

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can do this action");
        _;
    }
}
