"use client";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { useWriteCappedBurnableErc20Mint } from "./generated";

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
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">Mint Tokens</h1>
      <div className="flex flex-col gap-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to mint"
          className="p-2 border rounded w-full"
          min="0"
          disabled={isPending}
        />
        <button
          onClick={handleMint}
          disabled={isPending || !address || !amount}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
        >
          {isPending ? "Minting..." : "Mint Tokens"}
        </button>
        {error && (
          <div className="text-red-500 text-center">Error: {error.message}</div>
        )}
        {isSuccess && (
          <div className="text-green-500 text-center">
            Successfully minted tokens!
          </div>
        )}
      </div>
    </div>
  );
};

export default MintTokens;
