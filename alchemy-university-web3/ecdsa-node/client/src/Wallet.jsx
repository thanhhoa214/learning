import { useState } from "react";
import useBalance from "./hooks/useBalance";

function Wallet() {
  const [address, setAddress] = useState("");
  const [balance] = useBalance(address);

  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
  }

  return (
    <div className="container wallet">
      <h1>Balance Explorer</h1>
      <p>Wallet balances are recorded publicly due to blockchain.</p>

      <label>
        Wallet Address (Public key)
        <input
          placeholder="Type an address, for example: 0x1"
          value={address}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
