"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import { useWriteCappedBurnableErc20Approve } from "./generated";

const Approve = () => {
  const address = useAccount();
  const [amount, setAmount] = useState<string>("0");
  const [spender, setSpender] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { writeContract: approve } = useWriteCappedBurnableErc20Approve();
  const handleApprove = async () => {
    if (!address || !amount || !spender) return;
    setIsPending(true);
    setError(null);

    try {
      // Call the approve function
      approve({
        args: [spender as `0x${string}`, BigInt(amount)],
      });
      console.log("Approving", spender, amount);
      setIsSuccess(true);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsPending(false);
      setAmount("0");
      setSpender("");
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Approve Tokens
      </h1>

      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="spender"
            className="block text-sm font-medium text-gray-700"
          >
            Spender Address
          </label>
          <input
            id="spender"
            type="text"
            value={spender}
            onChange={(e) => setSpender(e.target.value)}
            placeholder="Enter spender address (0x...)"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100"
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to approve"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100"
            min="0"
            disabled={isPending}
          />
        </div>

        <button
          onClick={handleApprove}
          disabled={isPending || !address || !amount}
          className="w-full py-3 px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
        >
          {isPending ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Approving...
            </span>
          ) : (
            "Approve"
          )}
        </button>

        {error && (
          <div className="p-4 text-red-700 bg-red-100 rounded-lg">
            {error.message}
          </div>
        )}

        {isSuccess && (
          <div className="p-4 text-green-700 bg-green-100 rounded-lg">
            Transaction successful!
          </div>
        )}
      </div>
    </div>
  );
};

export default Approve;
