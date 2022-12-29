// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Lydia {
    uint public transactionCount;
    event Transfer(address indexed _from, address indexed _to, uint _value, string message, uint timestamp);

    constructor() {
        transactionCount = 0;
    }

    function transfer(address _receiver, string calldata message) public payable {
        require(msg.value > 0, "You must send some Ether");
        require(_receiver != address(0), "You must specify a receiver");
        transactionCount++;
        payable(_receiver).transfer(msg.value);
        emit Transfer(msg.sender, _receiver, msg.value, message, block.timestamp);
    }
}