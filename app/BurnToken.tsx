"use client";
import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import {
  useReadCappedBurnableErc20BalanceOf,
  useWriteCappedBurnableErc20Burn,
} from "./generated";

const BurnToken = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const {
    writeContract: burn,
    isPending,
    isError,
    isSuccess,
    error,
  } = useWriteCappedBurnableErc20Burn();

  const { data: balance } = useReadCappedBurnableErc20BalanceOf({
    args: address ? [address] : undefined,
  });

  // Reset form on successful burn
  useEffect(() => {
    if (isSuccess) {
      setAmount("");
      setHasAttemptedSubmit(false);
      setHasInteracted(false);
    }
  }, [isSuccess]);

  const isValidAmount = (val: string) => {
    const num = Number(val);
    if (!num || isNaN(num) || num <= 0) return false;

    // Check against balance if available
    if (balance) {
      const burnAmount = BigInt(val);
      return burnAmount <= balance;
    }
    return true;
  };

  // Add helper function to get validation message
  const getValidationMessage = () => {
    // Only show messages if user has interacted or attempted to submit
    if (!hasInteracted && !hasAttemptedSubmit) return null;

    if (!address) return "Please connect your wallet";
    if (!amount) return "Please enter an amount";
    if (isNaN(Number(amount)) || Number(amount) <= 0) return "Please enter a valid amount greater than 0";
    if (balance && BigInt(amount) > balance) return `Amount exceeds your balance of ${balance.toString()} tokens`;
    return null;
  };

  // Get validation message whenever relevant values change
  const validationMessage = getValidationMessage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setHasInteracted(true);
  };

  const handleBurn = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    setHasInteracted(true);

    // Exit if validation fails
    if (!address || !isValidAmount(amount)) {
      return;
    }

    try {
      burn({ args: [BigInt(amount)] });
    } catch (err) {
      console.error("Burn error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Burn Tokens
      </h1>

      <form onSubmit={handleBurn} className="space-y-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount to Burn
          </label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={handleInputChange}
            onBlur={() => setHasInteracted(true)}
            placeholder="Enter amount to burn"
            className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isPending || Boolean(validationMessage)}
          className={`w-full px-4 py-3 rounded-lg font-medium text-white 
            ${(isPending || Boolean(validationMessage))
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-blue-500 hover:bg-blue-600"} 
            transition-colors`}
        >
          {isPending ? "Burning..." : "Burn Tokens"}
        </button>

        {/* Show validation message only after interaction or submit attempt */}
        {validationMessage && (
          <div className="mt-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
            <p className="text-yellow-600 text-sm">{validationMessage}</p>
          </div>
        )}
      </form>

      {/* Error Message */}
      {isError && (
        <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-red-600 text-sm">
            {error?.message || "Failed to burn tokens"}
          </p>
        </div>
      )}

    </div>
  );
};

export default BurnToken;
