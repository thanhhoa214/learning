import TrieNode from "./TrieNode.js";

class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }

  insert(word) {
    let pre = this.root;
    let maxIndex = word.length - 1;
    for (let i = 0; i <= maxIndex; i++) {
      const char = word[i];
      if (pre.children[char] && pre.children[char].key === char) {
        pre = pre.children[char];
      } else {
        const newNode = new TrieNode(char);
        pre.children[char] = newNode;
        pre = newNode;
      }
      if (i === maxIndex) pre.isWord = true;
    }
  }

  contains(word) {
    const characters = Array.from(word);
    const node = characters.reduce(
      (pre, cur) => pre && pre.children[cur],
      this.root
    );
    return node && node.isWord;
  }
}

export default Trie;
