const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

/**
 *  Generate 3 pair private-public keys
 *
 *  @example
 *  '89d6391b9ac8c406b700fb99680a4dc16a3c55ef74189143fa4ba7e615082e2f' │ '029770e714129c71f1e9b43e4e3dc6412022c33b3c880786e763ebd20d97155090'
 *  '09748470c120141e08bead1ae7d3c49f3dcab54a82836b78db6e7f4b94deca20' │ '02ecc6b65621f61f1022cd31b2a99d9bd5dfd600de8c9f590ab9866b8d02853c5b'
 *  'e70d74bf4a5412c53d918170694551eb5a463a4b933d193e1422c3620fc3a96b' │ '0240125bb970d844a4bb9779d8b3541bc1416672eaa2b1e080ae25402988504260'
 **/
const keyPairs = Array.from({ length: 3 }, () => {
  const privateKey = secp256k1.utils.randomPrivateKey();
  const publicKey = secp256k1.getPublicKey(privateKey);
  return { privateKey: toHex(privateKey), publicKey: toHex(publicKey) };
});

console.table(keyPairs);
