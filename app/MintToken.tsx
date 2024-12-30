"use client";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { useWriteCappedBurnableErc20Mint } from "./generated";
import { styles } from './styles/common';

const MintTokens = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("0");

  const {
    writeContract: mint,
    isPending,
    isSuccess,
    error,
  } = useWriteCappedBurnableErc20Mint();

  const handleMint = () => {
    if (!address || !amount) return;

    try {
      const result = mint({
        args: [address, BigInt(amount)],
      });
      console.log("Success:", result);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className={`${styles.card} ${styles.container}`}>
      <h2 className={styles.title}>Mint Tokens</h2>
      <div className="space-y-4">
        <div>
          <label className={styles.label}>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to mint"
            className={styles.input}
            min="0"
            disabled={isPending}
          />
        </div>

        <button
          onClick={handleMint}
          disabled={isPending || !address || !amount}
          className={styles.button}
        >
          {isPending ? "Minting..." : "Mint Tokens"}
        </button>

        {error && <div className={styles.error}>{error.message}</div>}
        {isSuccess && <div className={styles.success}>Transaction successful!</div>}
      </div>
    </div>
  );
};

export default MintTokens;
