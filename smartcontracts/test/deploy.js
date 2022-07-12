// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
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
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
