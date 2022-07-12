require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
const dotenv = require("dotenv");

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.15",
  networks: {
    mumbai: {
      url: process.env.CHAINSTACK_POLYGON_MUMBAI,
      accounts: [
        process.env.PRIVATE_KEY
      ]
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
