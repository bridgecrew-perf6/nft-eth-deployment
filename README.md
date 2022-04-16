# NFT-ETH-DEPLOYMENT

Basic NFT minting and deployment on ETH

# Installation

yarn

# APIs

You will need a Pinata account and Alchemy account (view .env, pinata.js)

# Explanation

## Image & Metadata

On Pinata you will need to create an API key (top right on profile click). Put the API key information in the .env file `./.env`

```bash
PINATA_ID="PINATA_ID"
PINATA_KEY="PINATA_KEY"
```

You can then edit the test image that will be uploaded: `./test.jpg` as well as the metadata related to the NFT `scripts/pinata.js --> metadata`

You can then run 

```bash
node scripts/pinata.js
```

This will return you the URL to the json data hosted on IPFS.

---

## Deploying the contract

The contract for the NFT is located in `contracts.MyNFT.sol` 

For contracts I follow the open standard set by OpenZeppelin. For information can be found in their documentation:

https://docs.openzeppelin.com/contracts/3.x/erc721

The ERC721 is the standard respected by most of online NFT marketplace (mintable, opensea)

You will need to add in the `./.env` the following values:

```bash
API_URL="https://eth-rinkeby.alchemyapi.io/v2/your_endpoint"
PRIVATE_KEY="your private key that should not be shared"
PUBLIC_KEY="your public key"
```

You can find the `API_URL` when you create an app on `Rinkeby` on Alchemy: https://dashboard.alchemyapi.io/apps


You can find your private and public key in your metamask wallet under `Account Details`

To deploy the contract to the testnet you can use the following command: 

```bash
yarn hardhat run scripts/deploy.js --network rinkeby
```

This will give you the address of the contract on the testnet that you will need for the minting.

---

## Minting the NFT

After having deployed the metadata and the contract you can edit the following file:

`scripts/mint-nft.js` and set the `contractAddress` to the address of your contract and on the last line set the url that points to your json data on IPFS.

Once having changed both values you can then use the following command to mint your NFT

```bash
node scripts/mint-nft.js
```

Once you have done this you can look at the OpenSea marketplace that is connected to the testnetwork to make sure it was minted properly.

https://testnets.opensea.io/account

You should be able to see your NFT if you can't you might need to add the contract as a collection to do this go here:

https://testnets.opensea.io/get-listed

Select `Live on a testnet`

Select the `Rinkeby` network and add the address of the contract.


---

## Deployment

If you wish to deploy to another network (MATIC, LIVE Ethereum network, etc.) you simply have to create a new app on alchemy pointing to that network and update the `.env` with the proper url.

You will need also to update the `hardhat.config.js` with the proper network information.

Example (MATIC)

```js
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    matic: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: [PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",

  },
  mocha: { timeout: 20000 }
};
```

---

# Next Steps

In this small example there are still a few manual actions to perform. Ideally this process should be automated or with a small UI interfact.

---

# Author 

**Author:** Burlet Mederic

**Discord:** 『　　』#6014

**Twitter:** https://twitter.com/crimson_med

