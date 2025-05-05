pragma circom 2.0.0;

include "poseidon.circom";
include "comparators.circom";

template AgeCheck(threshold) {
    signal input age;
    signal input hash; // Commitment to age
    signal input nonce;

    signal output valid;

    // Poseidon hash = Poseidon([age, nonce])
    component hasher = Poseidon(2);
    hasher.inputs[0] <== age;
    hasher.inputs[1] <== nonce;
    hash === hasher.out;

    // Check if age >= threshold
    component cmp = GreaterEqThan(32);
    cmp.in[0] <== age;
    cmp.in[1] <== threshold;

    valid <== cmp.out;

    valid === 1;
}

component main = AgeCheck(18);
