import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import { viem } from "hardhat";
import { getAddress, formatEther, parseEther } from "viem";
/**
 * Test cases:
 * 1. Owner should be defined
 * 3. `withdraw` should revert if _amount > 0.1 ether and sender shouldn't receive ether
 * 4. `withdraw` should pass   if _amount <= 0.1 ether and sender should receive ether
 * 5. `withdrawAll` by NOT owner should raise error
 * 5. `withdrawAll` owner balance should change
 * 6. `destroyFaucet` owner balance should change
 * 6. `receive` contract balance should change, and sender balance should change
 */
describe.only("TestFaucet", () => {
  const initialFund = parseEther("0.5");

  async function deployContract() {
    const [owner, alchemyTestAccount] = await viem.getWalletClients();
    const faucet = await viem.deployContract("Faucet", [], {
      value: initialFund,
    });
    const publicClient = await viem.getPublicClient();

    return { owner, alchemyTestAccount, faucet, publicClient };
  }

  describe("Deployment", function () {
    it("set the right owner", async () => {
      const { faucet, owner } = await loadFixture(deployContract);

      expect(await faucet.read.owner()).to.equal(
        getAddress(owner.account.address)
      );
    });

    it("receive and store the funds", async () => {
      const { faucet, publicClient } = await loadFixture(deployContract);

      expect(await publicClient.getBalance({ address: faucet.address })).to.eq(
        initialFund
      );
    });
  });

  describe("withdraw()", function () {
    it("revert if larger than 0.1 ether", async () => {
      const { faucet } = await loadFixture(deployContract);
      const withdrawalAmount = parseEther("0.11");

      await expect(faucet.write.withdraw([withdrawalAmount])).to.be.rejected;
    });

    it("balance changes if <= 0.1 ether", async () => {
      const AMOUNT_ETHER = "0.09";
      const { faucet, publicClient, alchemyTestAccount } = await loadFixture(
        deployContract
      );
      const withdrawalAmount = parseEther(AMOUNT_ETHER);

      await faucet.write.withdraw([withdrawalAmount], {
        account: alchemyTestAccount.account,
      });

      const faucetBalance = await publicClient.getBalance({
        address: faucet.address,
      });

      const expectedBalance = initialFund - parseEther(AMOUNT_ETHER);

      expect(formatEther(faucetBalance)).to.equal(formatEther(expectedBalance));
    });
  });

  describe("withdrawAll()", function () {
    it("fail with non-owner account", async () => {
      const { faucet, alchemyTestAccount } = await loadFixture(deployContract);

      await expect(
        faucet.write.withdrawAll({ account: alchemyTestAccount.account })
      ).to.be.rejected;
    });

    it("success with owner account", async () => {
      const { faucet, publicClient } = await loadFixture(deployContract);

      await faucet.write.withdrawAll();

      const faucetBalance = await publicClient.getBalance({
        address: faucet.address,
      });

      expect(faucetBalance).to.eq(BigInt(0));
    });
  });

  describe("destroyFaucet()", () => {
    it("fail with non-owner account", async () => {
      const { faucet, alchemyTestAccount } = await loadFixture(deployContract);

      await expect(
        faucet.write.destroyFaucet({ account: alchemyTestAccount.account })
      ).to.be.rejected;
    });

    it("success with owner account", async () => {
      const { faucet } = await loadFixture(deployContract);

      await faucet.write.destroyFaucet();
      // After selfdestruct, all values in contract will be deleted, owner() is no longer existed
      await expect(faucet.read.owner()).to.be.rejected;
    });
  });

  describe("receive()", () => {
    it("receive tokens", async () => {
      const { faucet, alchemyTestAccount, publicClient } = await loadFixture(
        deployContract
      );
      const AMOUNT_ETHER = "1";

      await alchemyTestAccount.sendTransaction({
        to: faucet.address,
        value: parseEther(AMOUNT_ETHER),
      });

      const faucetBalance = await publicClient.getBalance({
        address: faucet.address,
      });
      const bigIntToFloat = (num: bigint) => parseFloat(formatEther(num));
      expect(bigIntToFloat(faucetBalance)).to.be.greaterThan(
        bigIntToFloat(initialFund)
      );
    });
  });
});
