// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Clueverse {
    address public owner;
    uint public constant PUZZLE_PRICE = 1 ether; // 1 CORE (18 decimals)

    // address => puzzleId => hasUnlocked
    mapping(address => mapping(uint => bool)) public hasUnlocked;

    event PuzzleUnlocked(address indexed user, uint indexed puzzleId);

    constructor() {
        owner = msg.sender;
    }

    function payToUnlock(uint puzzleId) external payable {
        require(msg.value == PUZZLE_PRICE, "Incorrect payment");
        require(!hasUnlocked[msg.sender][puzzleId], "Already unlocked");

        hasUnlocked[msg.sender][puzzleId] = true;

        emit PuzzleUnlocked(msg.sender, puzzleId);
    }

    function withdraw() external {
        require(msg.sender == owner, "Not owner");
        payable(owner).transfer(address(this).balance);
    }

    function isUnlocked(address user, uint puzzleId) external view returns (bool) {
        return hasUnlocked[user][puzzleId];
    }
}
