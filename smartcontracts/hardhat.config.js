require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
const hre = require("hardhat");
const dotenv = require("dotenv");

dotenv.config();

task("deploy", "Deploys a DAO with name symbol and description")
  .addParam("name", "The DAO's name")
  .addParam("symbol", "The DAO's symbol")
  .addParam("description", "The DAO's description")
  .setAction(async () => {
    console.log("[4] Getting Deployer's address")
    const deployer = await hre.ethers.getSigner();
    console.log("[+] Deploying contract with address: ", deployer.address)

    console.log("[3] Getting the contract factory")
    const DAO = await hre.ethers.getContractFactory("DAO");

    console.log("[2] Deploying contract")
    const dao = await DAO.deploy(
      "Decentralized Autonomous Organization",
      "DAO",
      "An example of a decentralized autonomous organization."
    );

    console.log("[1] Awaiting deployment transaction to be mined")
    await dao.deployed();

    console.log("[FINISHED] Contract deployed with address: ", dao.address)
  });

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
