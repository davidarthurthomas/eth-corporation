// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../IERC20.sol";

/**
 * @dev Interface for holding investment rounds with an ERC20 token.
 *
 * _Available since v4.1._
 */
interface IERC20InvestmentRounds is IERC20 {
    /**
    * @dev Mints and transfers tokens to a specified address.
    */
    function mint(address _to, uint256 _amount) external;
}