import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("ChordsNFT", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const chordsNFT = await hre.viem.deployContract("ChordsNFT");
    const publicClient = await hre.viem.getPublicClient();

    return { chordsNFT, owner, otherAccount, publicClient };
  }

  describe("Deployment", function () {
    it("Should set the right metadata", async function () {
      const { chordsNFT } = await loadFixture(deployOneYearLockFixture);

      expect(await chordsNFT.read.name()).to.equal("Chords NFT");
      expect(await chordsNFT.read.symbol()).to.equal("CNFT");
    });
  });

  describe("Mint", function () {
    it("Should mint NFT successfully", async function () {
      const { chordsNFT, owner } = await loadFixture(deployOneYearLockFixture);
      const ownerAddress = owner.account.address;
      const fakeUri = "0iws21sdksxj";
      const tokenId = BigInt(1);

      expect(await chordsNFT.read.balanceOf([ownerAddress])).to.equal(
        BigInt(0)
      );

      await chordsNFT.write.safeMint([fakeUri], { account: ownerAddress });

      const mintEvents = await chordsNFT.getEvents.Transfer();
      expect(mintEvents).to.have.lengthOf(1);
      expect(mintEvents[0].args.to?.toLowerCase()).to.equal(ownerAddress);
      expect(mintEvents[0].args.tokenId).to.equal(tokenId);

      expect(await chordsNFT.read.balanceOf([ownerAddress])).to.equal(
        BigInt(1)
      );
    });
  });
});
