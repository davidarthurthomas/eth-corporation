// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    /**
    * @dev Function to mint tokens to a given address.
    */
    function mint(address to, uint256 amount) public {
        require(amount > 0, "ERC20: mint amount must be greater than 0");
        require(to != address(0), "ERC20: mint to address cannot be the zero address");
        _mint(to, amount);
    }
}