const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    return { game };
  }
  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
    const threshold = BigInt("0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf");
    let goodSigner = null;
    for (let index = 0; index < 10; index++) {
      const signer = ethers.provider.getSigner(index);
      if (BigInt(await signer.getAddress()) < threshold) {
        goodSigner = signer;
        break;
      }
    }
    await game.connect(goodSigner).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
