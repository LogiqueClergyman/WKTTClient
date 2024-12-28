"use client";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { useReadCappedBurnableErc20Allowance } from "./generated";

const Allowance = () => {
  const { address } = useAccount();
  const [owner, setOwner] = useState<string>("");
  const [spender, setSpender] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [allowanceToMeResult, setAllowanceToMeResult] = useState<string>("");
  const [allowanceFromMeResult, setAllowanceFromMeResult] =
    useState<string>("");

  // Configure hooks without enabling them automatically
  const allowanceToMe = useReadCappedBurnableErc20Allowance({
    args: owner && address ? [owner, address] : undefined,
    enabled: false,
  });

  const allowanceFromMe = useReadCappedBurnableErc20Allowance({
    args: spender && address ? [address, spender] : undefined,
    enabled: false,
  });

  const handleCheckAllowanceToMe = async () => {
    if (!address || !owner) {
      setError("Please enter owner address and connect your wallet");
      return;
    }
    try {
      const result = await allowanceToMe.refetch();
      // Handle all cases including zero value
      setAllowanceToMeResult(
        result.data !== undefined ? result.data.toString() : "0"
      );
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Error fetching allowance. Please check the addresses and try again."
      );
      setAllowanceToMeResult("");
    }
  };

  const handleCheckAllowanceFromMe = async () => {
    if (!address || !spender) {
      setError("Please enter spender address and connect your wallet");
      return;
    }
    try {
      const result = await allowanceFromMe.refetch();
      // Handle all cases including zero value
      setAllowanceFromMeResult(
        result.data !== undefined ? result.data.toString() : "0"
      );
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Error fetching allowance. Please check the addresses and try again."
      );
      setAllowanceFromMeResult("");
    }
  };

  const renderAllowanceResult = (label: string, value: string) => {
    if (!value && !error) return null;
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          {label} <span className="font-mono font-medium">{value || "0"}</span>
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Check Allowances
      </h1>

      {/* Check allowance granted to me */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Check Allowance Granted to Me
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="owner"
              className="block text-sm font-medium text-gray-700"
            >
              Owner Address
            </label>
            <input
              id="owner"
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Enter owner address (0x...)"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <button
            onClick={handleCheckAllowanceToMe}
            className="w-full px-4 py-3 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            Check Allowance
          </button>
          {renderAllowanceResult(
            "Allowance granted to me:",
            allowanceToMeResult
          )}
        </div>
      </div>

      {/* Check allowance I've granted */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Check Allowance I've Granted
        </h2>
        <div className="space-y-4">
          <div>
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
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <button
            onClick={handleCheckAllowanceFromMe}
            className="w-full px-4 py-3 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            Check Allowance
          </button>
          {renderAllowanceResult(
            "Allowance I've granted:",
            allowanceFromMeResult
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Allowance;
