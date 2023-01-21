const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const writePrompt = () => {
  process.stdin.write("Enter a name: ")
}

const butter = (spreadable) => {
  return spreadable ? [spreadable] : []
}

async function main() {
  const mt = new MerkleTree(niceList)
  const rl = require('readline').createInterface({
    input: process.stdin
  })

  writePrompt()

  rl.on('line', async (name) => {
    // Find name in niceList (case-insensitive)
    const index = niceList.findIndex(n => n.toLowerCase() === name.toLowerCase())
    const actualName = niceList[index] ?? name
    const proof = mt.getProof(index)

    try {
      const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        name: actualName,
        proof
      });

      console.log([ ...butter(actualName), gift].join(', '))
    } catch (error) {
      console.error(String(error))
    } finally {
      writePrompt()
    }
  })

}

main();