// frontend/src/App.jsx
import React, { useState } from "react";

function App() {
  const [age, setAge] = useState("");
  const [result, setResult] = useState("");
  const [proofData, setProofData] = useState(null);

  const checkAge = async () => {
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum)) {
      setResult("Please enter a valid number.");
      return;
    }

    setResult("⏳ Generating ZK proof...");

    const res = await fetch("http://localhost:3001/generate-proof", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ age: ageNum })
    });

    const data = await res.json();

    if (data.error) {
      setResult("❌ Proof generation failed.");
      return;
    }

    setProofData(data);
    setResult("✅ Proof generated. Now verifying...");

    // Now verify the proof
    const verifyRes = await fetch("http://localhost:3001/verify-proof", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        proof: data.proof,
        publicSignals: data.publicSignals
      })
    });

    const verifyData = await verifyRes.json();

    
    if (verifyData.status === "VALID_OVER18") {
      setResult("🎉 Proof is valid! Age is over 18.");
    } else {
      setResult("❌ Invalid proof.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "2rem" }}>
      <h1>🧪 ZK Age Verification</h1>
      <input
        type="number"
        value={age}
        placeholder="Enter your age"
        onChange={(e) => setAge(e.target.value)}
        style={{ padding: "0.5rem", width: "200px" }}
      />
      <button onClick={checkAge} style={{ padding: "0.5rem 1rem" }}>Check</button>
      {result && <p>{result}</p>}
      {proofData && (
        <details style={{ maxWidth: "90%", marginTop: "1rem" }}>
          <summary>🔎 View Proof Data</summary>
          <pre style={{ textAlign: "left" }}>
            {JSON.stringify(proofData, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}

export default App;
