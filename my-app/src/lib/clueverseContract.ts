export const CONTRACT_ADDRESS = '0x5411F7EB719EAA802b4c5F3265f6d4a545663E87';

export const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "puzzleId", "type": "uint256" },
      { "internalType": "string", "name": "userAnswer", "type": "string" }
    ],
    "name": "submitAnswer",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "user", "type": "address" },
      { "internalType": "uint256", "name": "puzzleId", "type": "uint256" }
    ],
    "name": "checkSolved",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  }
];
