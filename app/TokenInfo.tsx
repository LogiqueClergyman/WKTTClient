"use client";
import React from 'react'
import {
  useReadCappedBurnableErc20Cap,
  useReadCappedBurnableErc20Decimals,
  useReadCappedBurnableErc20Name,
  useReadCappedBurnableErc20Symbol,
  useReadCappedBurnableErc20TotalSupply,
  cappedBurnableErc20Address,
} from "./generated";

const TokenInfo = () => {
  const { data: cap } = useReadCappedBurnableErc20Cap();
  const { data: decimals } = useReadCappedBurnableErc20Decimals();
  const { data: name } = useReadCappedBurnableErc20Name();
  const { data: symbol } = useReadCappedBurnableErc20Symbol();
  const { data: totalSupply } = useReadCappedBurnableErc20TotalSupply();

  const chainId = 11155111; // Sepolia testnet
  const contractAddress = cappedBurnableErc20Address[chainId];

  const infoItems = [
    { label: "Token Name", value: name },
    { label: "Symbol", value: symbol },
    { label: "Decimals", value: decimals?.toString() },
    { label: "Total Supply", value: totalSupply?.toString() },
    { label: "Cap", value: cap?.toString() },
    { label: "Contract Address", value: contractAddress },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Token Information
      </h1>
      
      <div className="grid gap-4">
        {infoItems.map(({ label, value }) => (
          <div 
            key={label} 
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <span className="text-sm font-medium text-gray-600 mb-1 sm:mb-0">
              {label}
            </span>
            <span className="text-sm font-mono bg-white px-3 py-1 rounded border break-all">
              {value || "Loading..."}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a
          href={`https://sepolia.etherscan.io/address/${contractAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 text-sm inline-flex items-center"
        >
          View on Etherscan
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default TokenInfo;