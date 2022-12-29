// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract Lydia {
    uint public transactionCount;
    event Transfer(address indexed _from, address indexed _to, uint _value, string message, uint timestamp);

    struct Transaction {
        address sender;
        address receiver;
        uint value;
        string message;
        uint timestamp;
    }

    Transaction[] public transactions;

    constructor() {
        transactionCount = 0;
    }

    function getTransactions() public view returns(Transaction[] memory) {
        return transactions;
    }

    function transfer(address _receiver, string calldata message) public payable {
        require(msg.value > 0, "You must send some Ether");
        require(_receiver != address(0), "You must specify a receiver");

        payable(_receiver).transfer(msg.value);
        transactions.push(Transaction(msg.sender, _receiver, msg.value, message, block.timestamp));
        transactionCount++;        
        emit Transfer(msg.sender, _receiver, msg.value, message, block.timestamp);
    }
}