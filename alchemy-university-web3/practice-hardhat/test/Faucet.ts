import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import { viem } from "hardhat";
import { getAddress, parseGwei, parseEther } from "viem";

describe("TestFaucet", () => {
  async function deployFixture() {
    const [owner, otherAccount] = await viem.getWalletClients();
    const faucet = await viem.deployContract("Faucet", [], {
      value: parseEther("0.001"),
    });
    const publicClient = await viem.getPublicClient();
    return { owner, otherAccount, faucet, publicClient };
  }

  it("should deploy", async () => {
    const { faucet } = await deployFixture();

    expect(faucet.address).not.to.be.null;
  });

  it("should has balance 0.001 ether", async () => {
    const { faucet } = await deployFixture();
  });
});
