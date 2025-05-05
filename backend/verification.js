const snarkjs = require('snarkjs');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const tempDir = path.join(__dirname, 'temp');

    const proof = JSON.parse(fs.readFileSync(path.join(tempDir, 'proof.json')));
    const publicSignals = JSON.parse(fs.readFileSync(path.join(tempDir, 'publicSignals.json')));
    const vKey = JSON.parse(fs.readFileSync(path.join(__dirname, 'verification_key.json')));

    console.log("🔐 Verifying proof...");
    const isValid = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (isValid) {
      console.log("✅ Proof is VALID.✅ Age is verified.");
    } else {
      console.log("❌ Proof is INVALID.")  
    }
  } catch (err) {
    console.error("❌ Verification failed.");
    console.error(err.message || err);
  }

  process.exit(0);
})();
