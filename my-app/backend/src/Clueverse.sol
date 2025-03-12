// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '../lib/openzeppelin-contracts/contracts/access/Ownable.sol';
import '../lib/openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol';

contract Clueverse is ERC1155, Ownable {
    uint public constant PUZZLE_PRICE = 1 ether;

    mapping(address => mapping(uint => bool)) public hasSolved;
    mapping(uint => bytes32) public correctAnswerHashes;

    // IPFS CIDs per puzzle ID
    mapping(uint => string) private tokenURIs;

    event PuzzleSolved(address indexed user, uint indexed puzzleId);
    event WrongAnswer(address indexed user, uint indexed puzzleId);
    event Withdrawal(address indexed owner, uint amount);

    constructor() ERC1155("") Ownable(msg.sender) {
        correctAnswerHashes[1] = 0xb07ae9b51244cf35d39b423ce5d21414a9f701e6e5580001a010f7e3b8e54215;
        correctAnswerHashes[2] = 0xfdf81848136595c31bb5f76217767372bc4bf906663038eb38381131ea27ecba;
        correctAnswerHashes[3] = 0x4d13bd2393ac6dd698b8ed4ff328bbb350bc6c5b8b32483cdd63c4200a674ece;

        // IPFS metadata URIs
        tokenURIs[1] = "ipfs://bafkreibhprme32h6okfqnjt7mdidzxqg667ovc2u6pgm2tbzf347shx4om";
        tokenURIs[2] = "ipfs://bafkreicnrf3l4i6krongni34jt3y2ehaqvikzali3m43squirppczovnra";
        tokenURIs[3] = "ipfs://bafkreifqwhxf6ejjnhgswodfihufvifz544bsdpfqoho74kikz46uee34y";
    }

    function submitAnswer(uint puzzleId, string calldata userAnswer) external payable {
        require(msg.value == PUZZLE_PRICE, "Must pay 1 CORE to submit");
        require(!hasSolved[msg.sender][puzzleId], "Already solved this puzzle");

        if (keccak256(abi.encodePacked(userAnswer)) == correctAnswerHashes[puzzleId]) {
            hasSolved[msg.sender][puzzleId] = true;
            _mint(msg.sender, puzzleId, 1, "");
            emit PuzzleSolved(msg.sender, puzzleId);
        } else {
            emit WrongAnswer(msg.sender, puzzleId);
        }
    }

    function checkSolved(address user, uint puzzleId) external view returns (bool) {
        return hasSolved[user][puzzleId];
    }

    function withdraw() external onlyOwner {
        uint amount = address(this).balance;
        require(amount > 0, "Nothing to withdraw");
        payable(owner()).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }

    // 🔒 Make NFTs non-transferable (soulbound)
    function safeTransferFrom(address, address, uint256, uint256, bytes memory) public virtual override {
        revert("Soulbound NFTs: Transfer disabled");
    }

    function safeBatchTransferFrom(address, address, uint256[] memory, uint256[] memory, bytes memory) public virtual override {
        revert("Soulbound NFTs: Transfer disabled");
    }

    // 🧠 Return IPFS URI per tokenId
    function uri(uint256 id) public view override returns (string memory) {
        return tokenURIs[id];
    }
}
