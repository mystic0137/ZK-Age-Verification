# 🔒 ZK Age Verification App

This project is a privacy-preserving age verification system built using Zero-Knowledge Proofs (ZKPs). It allows users to prove they're above or below a certain age (e.g., 18) without revealing their exact age or any other personal information.

The application consists of:

* A **React frontend** UI for age input.
* An **Express backend** for ZK proof generation and verification.
* A **ZKP circuit** compiled using Circom and SnarkJS.

---

## 🌐 Features

* ✅ Secure age verification without exposing personal data
* 🧠 Uses ZKPs for compliance without compromising privacy
* ⚡️ Optimized frontend built with Vite + React

---

## 🛠️ Tech Stack

* **Frontend**: React, Vite, TypeScript
* **Backend**: Express, Node.js
* **ZK Toolkit**: Circom, SnarkJS, age\_check\_js (wasm + zkey)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/zk-age-verification.git
cd zk-age-verification
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Compile the ZK Circuit (only needed if not already compiled)

```bash
# Make sure ptau and circom binaries are available
# Then run the compilation command 
circom circuits/age_check.circom --r1cs --wasm --sym
snarkjs groth16 setup age_check.r1cs powersOfTau28_hez_final.ptau age_check.zkey
snarkjs zkey export verificationkey age_check.zkey verification_key.json
```

#### Start the Backend Server

```bash
node server.js
```

### 3. Frontend Setup

```bash
cd frontend/age_check
npm install
npm run dev
```

The app should now be running at `http://localhost:5173`.

---

## 🧠 Concept

This project demonstrates how Zero-Knowledge Proofs can be used to handle sensitive user data (like age) in a privacy-first way—offering real-world KYC solutions without traditional identity exposure.

---

## 📄 License

MIT License
