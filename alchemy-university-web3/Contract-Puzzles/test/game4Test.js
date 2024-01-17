const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game4", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    const signer1 = ethers.provider.getSigner(0);
    const signer2 = ethers.provider.getSigner(1);

    return { game, signer1, signer2 };
  }
  it("should be a winner", async function () {
    const { game, signer1, signer2 } = await loadFixture(
      deployContractAndSetVariables
    );

    // nested mappings are rough :}
    await game.connect(signer1).write(signer2.getAddress());

    await game.connect(signer2).win(signer1.getAddress());

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
