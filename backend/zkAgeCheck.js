// backend/zkAgeCheck.js
const snarkjs = require("snarkjs");
const crypto = require("crypto");
const path = require("path");
const circomlibjs = require("circomlibjs");
const { Scalar } = require("ffjavascript");

async function poseidonHash([a, b]) {
  const poseidon = await circomlibjs.buildPoseidon();
  const hash = poseidon([a, b]);
  const hashBigInt = poseidon.F.toObject(hash);
  return BigInt(hashBigInt);
}

async function generateProof(age) {
  const nonce = BigInt(crypto.randomInt(1, 2 ** 30));
  const ageBigInt = BigInt(age);
  const hash = await poseidonHash([ageBigInt, nonce]);

  const input = {
    age: ageBigInt.toString(),
    nonce: nonce.toString(),
    hash: hash.toString()
  };

  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    input,
    path.join(__dirname, "age_check_js", "age_check.wasm"),
    path.join(__dirname, "age_check_final.zkey")
  );

  return {
    proof,
    publicSignals,
    hash: hash.toString()
  };
}

module.exports = { generateProof };
