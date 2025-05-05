// backend/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const snarkjs = require('snarkjs');
const { generateProof } = require('./zkAgeCheck');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Generate ZK proof for age
app.post('/generate-proof', async (req, res) => {
  const { age } = req.body;

  if (!age || isNaN(age)) {
    return res.status(400).json({ error: 'Invalid or missing age' });
  }

  try {
    const result = await generateProof(parseInt(age));
    const tempDir = path.join(__dirname, 'temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    fs.writeFileSync(path.join(tempDir, 'proof.json'), JSON.stringify(result.proof, null, 2));
    fs.writeFileSync(path.join(tempDir, 'publicSignals.json'), JSON.stringify(result.publicSignals, null, 2));

    res.status(200).json({
      message: 'Proof generated successfully',
      proof: result.proof,
      publicSignals: result.publicSignals
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Proof generation failed', details: err.message });
  }
});

// Verify proof
app.post('/verify-proof', async (req, res) => {
  const { proof, publicSignals } = req.body;

  if (!proof || !publicSignals) {
    return res.status(400).json({ error: 'Missing proof or publicSignals' });
  }

  try {
    const vKeyPath = path.join(__dirname, 'verification_key.json');
    const vKey = JSON.parse(fs.readFileSync(vKeyPath));

    const isValid = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    let status = 'INVALID';
    if (isValid) status = 'VALID_OVER18';

    res.status(200).json({ verified: isValid, status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Verification failed', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
