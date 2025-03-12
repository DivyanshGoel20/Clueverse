// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Clueverse.sol";

contract DeployClueverse is Script {
    function run() external {
        // Start broadcasting transactions
        vm.startBroadcast();

        new Clueverse();

        vm.stopBroadcast();
    }
}
