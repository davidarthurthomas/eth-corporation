To run DApp:

cd dapp
npm run start

Connect your Metamask account

To deploy a DAO:

cd smartcontracts

Add your private key to the .env variables

npx hardhat deploy --name NAME --symbol SYMBOL --description DESCRIPTION --network mumbai

npx hardhat verify CONTRACT_ADDRESS NAME SYMBOL DESCRIPTION --network mumbai
