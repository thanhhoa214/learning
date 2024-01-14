const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");
const dotenv = require("dotenv");
dotenv.config();
const { ALCHEMY_API_KEY, TEST_PRIVATE_KEY } = process.env;

const alchemy = new Alchemy({
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
});
const wallet = new Wallet(TEST_PRIVATE_KEY);

(async () => {
  const nonce = await alchemy.core.getTransactionCount(wallet.address);
  let transaction = {
    to: "0x4Bd8406CB57BCA539E97fA9a032Ea323b7017f71",
    value: Utils.parseEther("0.0001"), // 0.001 worth of ETH being sent
    gasLimit: "21000",
    maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
    maxFeePerGas: Utils.parseUnits("20", "gwei"),
    nonce,
    type: 2,
    chainId: 5, // göerli transaction
  };
  const rawTx = await wallet.signTransaction(transaction);
  console.log("Raw tx: ", rawTx);
  let tx = await alchemy.core.sendTransaction(rawTx);
  console.log(`https://goerli.etherscan.io/tx/${tx.hash}`);
})();
