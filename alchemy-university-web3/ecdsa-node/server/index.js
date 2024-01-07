const express = require("express");
const app = express();
const cors = require("cors");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { sha256 } = require("ethereum-cryptography/sha256");
const { hexToBytes, utf8ToBytes } = require("ethereum-cryptography/utils");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x029770e714129c71f1e9b43e4e3dc6412022c33b3c880786e763ebd20d97155090": 100,
  "0x02ecc6b65621f61f1022cd31b2a99d9bd5dfd600de8c9f590ab9866b8d02853c5b": 50,
  "0x0240125bb970d844a4bb9779d8b3541bc1416672eaa2b1e080ae25402988504260": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { signature, sender, recipient, amount } = req.body;
  const senderPublicKey = hexToBytes(sender);
  if (
    secp256k1.verify(
      signature,
      sha256(utf8ToBytes([sender, recipient, amount].join("@"))),
      senderPublicKey
    ) === false
  )
    res.status(400).send({
      message:
        "Transaction has been rejected because the signature is not matched.",
    });

  console.log([sender, recipient, amount]);
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
