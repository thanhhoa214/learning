class MerkleTree {
  constructor(leaves, concat) {
    this.leaves = leaves;
    this.concat = concat;
  }
  getRoot() {
    let clone = [...this.leaves];
    while (clone.length > 1) {
      const nextLevel = [];
      for (let i = 0; i < clone.length - 1; i = i + 2) {
        nextLevel.push(this.concat(clone[i], clone[i + 1]));
      }
      if (clone.length % 2 === 1)
        clone = [...nextLevel, clone[clone.length - 1]];
      else clone = [...nextLevel];
    }
    return clone[0];
  }

  getProof(index) {
    if (index >= this.leaves.length) throw new Error("Invalid index");
    const proof = [];
    let clone = [...this.leaves];
    let indexInLevel = index;

    while (clone.length > 1) {
      const isLeft = indexInLevel % 2 === 0;
      if (isLeft) {
        if (clone[indexInLevel + 1])
          proof.push({ data: clone[indexInLevel + 1], left: false });
      } else {
        proof.push({ data: clone[indexInLevel - 1], left: true });
      }

      const nextLevel = [];
      for (let i = 0; i < clone.length; i = i + 2) {
        const item = clone[i + 1]
          ? this.concat(clone[i], clone[i + 1])
          : clone[i];
        nextLevel.push(item);
      }
      clone = [...nextLevel];
      indexInLevel = Math.floor(indexInLevel / 2);
    }
    return proof;
  }
}

export default MerkleTree;
