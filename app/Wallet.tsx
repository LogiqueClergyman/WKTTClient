"use client";

import React from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";

function ConnectWallet() {
  const { connect, connectors, error, isPending } = useConnect();

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={isPending}
          className="px-6 py-2 text-sm font-medium text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {connector.name}
          {isPending && " (connecting)"}
        </button>
      ))}

      {error && <div className="text-red-500 text-sm">{error.message}</div>}
    </div>
  );
}

function DisconnectWallet() {
  const { disconnect } = useDisconnect();
  return (
    <button
      onClick={() => disconnect()}
      className="px-6 py-2 text-sm font-medium text-white transition-colors duration-300 bg-red-600 rounded-lg hover:bg-red-700"
    >
      Disconnect
    </button>
  );
}

function Wallet() {
  const { address, isConnected } = useAccount();

  return (
    <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      {isConnected ? (
        <div className="flex flex-col items-center gap-4">
          <div className="text-gray-700 font-medium">
            Connected as:{" "}
            <span className="text-sm text-gray-500 break-all">{address}</span>
          </div>
          <DisconnectWallet />
        </div>
      ) : (
        <ConnectWallet />
      )}
    </div>
  );
}

export default Wallet;
