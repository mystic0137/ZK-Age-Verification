const { generateProof } = require('./zkAgeCheck');
const fs = require('fs');
const path = require('path');

(async () => {
  const age = 28;

  try {
    console.log("🔧 Generating proof for age:", age);
    const result = await generateProof(age);
    console.log("✅ Proof generated.");

    const tempDir = path.join(__dirname, 'temp');

    // Ensure the temp directory exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // Save proof and public signals
    fs.writeFileSync(path.join(tempDir, 'proof.json'), JSON.stringify(result.proof, null, 2));
    fs.writeFileSync(path.join(tempDir, 'publicSignals.json'), JSON.stringify(result.publicSignals, null, 2));

    console.log("💾 Saved proof and public signals to temp folder.");
  } catch (err) {
    console.error("❌ Failed to generate proof.");
    console.error(err.message || err);
  }

  process.exit(0);
})();
