# Web3 Fullstack Demo

🔥 **Live Demo**: https://web3-fullstack-demo.netlify.app/

✅ **Etherscan**: https://ropsten.etherscan.io/address/0x4dabC6a4f04c1E94cd875D4d8B2Eaf52eF407176

## Projects

### Client

- Technology: **React Hooks**, **ethers**, **TypeScript**, **SCSS**, **hardhat**
- Feature: Transfer money between logged Metamask account to another

#### 1. Installation

#### 2. Smart Contract Connection

After the contract has been deployed, do the following steps:

1. Copy `smart-contract/artifacts/contracts/Transactions.json` to `assets/contracts/Transactions.json`

2. Create `utils/constants.ts` to contain contract info then exports 2 things `contractAbi` and `contractAddress`

```typescript
import Transactions from "../assets/contract/Transactions.json";

export const contractAbi = Transactions.abi;
export const contractAddress = "0x4dabC6a4f04c1E94cd875D4d8B2Eaf52eF407176";
```

### Smart Contract

- Development Environment: **Hardhat**

#### 1. Installation

- Init npm project

```bash
npm init -y
```

- Install `hardhat`

```bash
npm i -D hardhat
```

- Install `hardhat` plugins (`waffle` and `ethers`)

```bash
npm i -D @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
```

#### 2. Deployment

- Create an **[Alchemy](https://www.alchemy.com/)** app
- Go to the app details, click **VIEW KEY** on top right and copy **HTTP** url
- Open `hardhat.config.js` and add the following information:

```js
...
module.exports = {
    ...,
    networks: {
        ropsten: {
            url: YOUR_ALCHEMY_COPIED_HTTP_URL,
            accounts: [YOUR_ACCOUNT_PRIVATE_KEY]
        }
    }
    }
}
```

- Run command to deploy, will result in a successful contract address (0x4dabC6a4f04c1E94cd875D4d8B2Eaf52eF407176)

```bash
npx hardhat run scripts/deploy.js --network ropsten
```

## Reference:

- [Build and Deploy a Modern Web 3.0 Blockchain App | Solidity, Smart Contracts, Crypto](https://youtu.be/Wn_Kb3MR_cU)
