class TrieNode {
  constructor(key) {
    this.key = key;
    this.children = {};
    this.isWord = false;
  }
}

export default TrieNode;
