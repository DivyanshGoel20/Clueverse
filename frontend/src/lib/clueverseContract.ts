export const CONTRACT_ADDRESS = '0xf075c24F06C796CD790e36E4859300107cFB5E30';

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
