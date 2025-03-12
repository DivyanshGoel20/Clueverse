// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Clueverse {
    address public owner;
    uint public constant PUZZLE_PRICE = 1 ether;

    mapping(address => mapping(uint => bool)) public hasSolved;
    mapping(uint => bytes32) public correctAnswerHashes;

    event PuzzleSolved(address indexed user, uint indexed puzzleId);
    event WrongAnswer(address indexed user, uint indexed puzzleId);
    event Withdrawal(address indexed owner, uint amount);

    constructor() {
        owner = msg.sender;

        // ✅ Precomputed keccak256 hashes of each answer
        correctAnswerHashes[0] = 0xb07ae9b51244cf35d39b423ce5d21414a9f701e6e5580001a010f7e3b8e54215;
        correctAnswerHashes[1] = 0xfdf81848136595c31bb5f76217767372bc4bf906663038eb38381131ea27ecba;
        correctAnswerHashes[2] = 0x4d13bd2393ac6dd698b8ed4ff328bbb350bc6c5b8b32483cdd63c4200a674ece;
    }

    function submitAnswer(uint puzzleId, string calldata userAnswer) external payable {
        require(msg.value == PUZZLE_PRICE, "Must pay 1 CORE to submit");
        require(!hasSolved[msg.sender][puzzleId], "Already solved this puzzle");

        if (keccak256(abi.encodePacked(userAnswer)) == correctAnswerHashes[puzzleId]) {
            hasSolved[msg.sender][puzzleId] = true;
            emit PuzzleSolved(msg.sender, puzzleId);
        } else {
            emit WrongAnswer(msg.sender, puzzleId);
        }
    }

    function checkSolved(address user, uint puzzleId) external view returns (bool) {
        return hasSolved[user][puzzleId];
    }

    function withdraw() external {
        require(msg.sender == owner, "Not the owner");
        uint amount = address(this).balance;
        require(amount > 0, "Nothing to withdraw");
        payable(owner).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }
}