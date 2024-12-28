"use client";
import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import {
  useWriteCappedBurnableErc20Transfer,
  useWriteCappedBurnableErc20TransferFrom,
  useReadCappedBurnableErc20BalanceOf,
} from "./generated";

const Transfer = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("0");
  const [recipient, setRecipient] = useState<string>("");
  const [fromAddress, setFromAddress] = useState<string>("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState({
    recipient: false,
    amount: false,
    fromAddress: false,
  });

  const {
    writeContract: transfer,
    data: transferData,
    error: transferError,
    isSuccess: isTransferSuccess,
  } = useWriteCappedBurnableErc20Transfer();

  const {
    writeContract: transferFrom,
    data: transferFromData,
    error: transferFromError,
    isSuccess: isTransferFromSuccess,
  } = useWriteCappedBurnableErc20TransferFrom();

  // Add balance hooks for both sender and from address
  const { data: senderBalance } = useReadCappedBurnableErc20BalanceOf({
    args: address ? [address] : undefined,
  });

  const { data: fromAddressBalance } = useReadCappedBurnableErc20BalanceOf({
    args: fromAddress ? [fromAddress as `0x${string}`] : undefined,
  });

  const isValidAddress = (address: string) => {
    if (!address) return true;
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const isValidAmount = (val: string) => {
    if (!val || val === "0") return true;
    const num = Number(val);
    return !isNaN(num) && num > 0;
  };

  const getValidationMessage = () => {
    if (!hasAttemptedSubmit && !Object.values(touchedFields).some(touched => touched)) {
      return null;
    }

    if (!address) return "Please connect your wallet";
    
    if (touchedFields.recipient && recipient && !isValidAddress(recipient)) {
      return "Please enter a valid recipient address";
    }
    
    if (touchedFields.amount && amount && !isValidAmount(amount)) {
      return "Please enter a valid amount greater than 0";
    }
    
    // Add balance validation
    if (amount && amount !== "0") {
      const transferAmount = BigInt(amount);
      if (fromAddress) {
        // Check fromAddress balance for transferFrom
        if (fromAddressBalance !== undefined && transferAmount > fromAddressBalance) {
          return `Amount exceeds sender's balance of ${fromAddressBalance.toString()} tokens`;
        }
      } else {
        // Check connected wallet balance for regular transfer
        if (senderBalance !== undefined && transferAmount > senderBalance) {
          return `Amount exceeds your balance of ${senderBalance.toString()} tokens`;
        }
      }
    }
    
    if (showAdvanced && touchedFields.fromAddress && fromAddress && !isValidAddress(fromAddress)) {
      return "Please enter a valid sender address";
    }

    if (hasAttemptedSubmit) {
      if (!recipient) return "Recipient address is required";
      if (!amount || amount === "0") return "Amount is required";
    }

    return null;
  };

  const validationMessage = getValidationMessage();

  const handleInputChange = (field: keyof typeof touchedFields) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      switch(field) {
        case 'recipient':
          setRecipient(value);
          break;
        case 'amount':
          setAmount(value);
          break;
        case 'fromAddress':
          setFromAddress(value);
          break;
      }
      setTouchedFields(prev => ({
        ...prev,
        [field]: true
      }));
  };

  const handleBlur = (field: keyof typeof touchedFields) => () => {
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleTransfer = () => {
    setHasAttemptedSubmit(true);
    setHasInteracted(true);

    if (validationMessage) return;

    setIsPending(true);
    setError(null);
    setIsSuccess(false);

    try {
      if (fromAddress) {
        transferFrom({
          args: [
            fromAddress as `0x${string}`,
            recipient as `0x${string}`,
            BigInt(amount),
          ],
        });
      } else {
        transfer({
          args: [recipient as `0x${string}`, BigInt(amount)],
        });
        
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transaction failed");
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (transferError) setError(transferError.message);
    if (transferFromError) setError(transferFromError.message);

    if (isTransferSuccess || isTransferFromSuccess) {
      setIsSuccess(true);
      setAmount("0");
      setRecipient("");
      setFromAddress("");
      setHasAttemptedSubmit(false);
      setTouchedFields({
        recipient: false,
        amount: false,
        fromAddress: false,
      });
    }
  }, [
    transferError,
    transferFromError,
    isTransferSuccess,
    isTransferFromSuccess,
  ]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Transfer Tokens
      </h1>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="recipient"
              className="block text-sm font-medium text-gray-700"
            >
              Recipient Address
            </label>
            <input
              id="recipient"
              type="text"
              value={recipient}
              onChange={handleInputChange('recipient')}
              onBlur={handleBlur('recipient')}
              placeholder="Enter recipient address (0x...)"
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
              onChange={handleInputChange('amount')}
              onBlur={handleBlur('amount')}
              placeholder="Enter amount"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100"
              disabled={isPending}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          {showAdvanced ? (
            <>
              <span>Hide Advanced Options</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          ) : (
            <>
              <span>Show Advanced Options</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          )}
        </button>

        {showAdvanced && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="space-y-2">
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700"
              >
                From Address
              </label>
              <input
                id="from"
                type="text"
                value={fromAddress}
                onChange={handleInputChange('fromAddress')}
                onBlur={handleBlur('fromAddress')}
                placeholder="Enter sender address (0x...)"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100"
                disabled={isPending}
              />
            </div>
          </div>
        )}

        {validationMessage && (
          <div className="mt-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
            <p className="text-yellow-600 text-sm">{validationMessage}</p>
          </div>
        )}

        <button
          onClick={handleTransfer}
          disabled={isPending || Boolean(validationMessage)}
          className={`w-full px-4 py-3 rounded-lg font-medium text-lg text-white transition-colors ${
            isPending || Boolean(validationMessage)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isPending
            ? "Transferring..."
            : fromAddress
              ? "Transfer From"
              : "Transfer"}
        </button>

        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transfer;
