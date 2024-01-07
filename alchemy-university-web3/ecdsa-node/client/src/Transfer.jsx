import { useMemo, useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { sha256 } from "ethereum-cryptography/sha256";
import { toHex, utf8ToBytes, hexToBytes } from "ethereum-cryptography/utils";
import useBalance from "./hooks/useBalance";

function Transfer() {
  const [privateKey, setPrivateKey] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const senderPublicKey = useMemo(() => {
    try {
      const privateKeyBytes = hexToBytes(privateKey);
      return `0x${toHex(secp256k1.getPublicKey(privateKeyBytes))}`;
    } catch (error) {
      return "";
    }
  });
  const [balance, setBalance] = useBalance(senderPublicKey);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    if (!privateKey.startsWith("0x") || !recipient.startsWith("0x")) {
      return alert(
        'Incorrect format private/public key, it should start with "0x"'
      );
    }

    try {
      const privateKeyBytes = hexToBytes(privateKey);
      const amount = parseInt(sendAmount);
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: senderPublicKey,
        signature: secp256k1
          .sign(
            sha256(utf8ToBytes([senderPublicKey, recipient, amount].join("@"))),
            privateKeyBytes
          )
          .toCompactHex(),
        amount,
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      console.log(ex);
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Private key{" "}
        <small>
          The web needs to use your private key to sign the transaction
        </small>
        <input
          placeholder="Type an private key, for example: 0x89d6391b9ac8c406b700fb99680a4dc16a3c55ef74189143fa4ba7e615082e2f"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
          style={{ marginTop: 4 }}
        ></input>
      </label>

      <label>
        Send Amount (maximum: {balance})
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
