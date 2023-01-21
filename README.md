# Gift List

## Solution

I solved this project using the MER approach (minimum-effort-required). 
The goal is to see what is the least amount of code changes to solve this "puzzle".

1. Get the merkle root for the `niceList.json` by adding a `console.log(root)` to `example.js` and run it using `node example.js`.
2. Paste the root hash in the `server/index.js` file for the MERKLE_ROOT constant.
3. Use the `verifyProof` function in `server/index.js` using the submitted proof and the MERKLE_ROOT
5. In `client/index.js` use the `MerkleTree` class and it's method `.getProof` to get the proof for a name.
5. Send the proof to the server to receive the `gift` message (reward).

I went a little further and made some followup changes breaking my own rules to use the MER approach:

1. Added a readline interface to the client to read line input from the console, prompting the user for a name to look up.
2. Added a case-insensitive search for the name so it's easier for the user to look up names.
3. Fixed a bug on the server to not crash on empty input

## Setup

To get started with the repository, clone it and then run `npm install` in the top-level directory to install the dependencies.

There are three folders in this repository:

## Client

You can run the client from the top-level directory with `node client/index`. This file is a script which will send an HTTP request to the server.

Think of the client as the _prover_ here. It needs to prove to the server that some `name` is in the `MERKLE_ROOT` on the server. 

## Server

You can run the server from the top-level directory with `node server/index`. This file is an express server which will be hosted on port 1225 and respond to the client's request.

Think of the server as the _verifier_ here. It needs to verify that the `name` passed by the client is in the `MERKLE_ROOT`. If it is, then we can send the gift! 

## Utils

There are a few files in utils:

- The `niceList.json` which contains all the names of the people who deserve a gift this year (this is randomly generated, feel free to add yourself and others to this list!)
- The `example.js` script shows how we can generate a root, generate a proof and verify that some value is in the root using the proof. Try it out from the top-level folder with `node/example.js`
- The `MerkleTree.js` should look familiar from the Merkle Tree module! This one has been modified so you should not have to deal with any crypto type conversion. You can import this in your client/server
- The `verifyProof.js` should also look familiar. This was the last stage in the module. You can use this function to prove a name is in the merkle root, as show in the example.
