const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  const name = "Sammy Huel"
  const mt = new MerkleTree(niceList)
  const index = niceList.findIndex(n => n === name)
  const proof = mt.getProof(index)

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof
  });

  console.log({ gift });
}

main();