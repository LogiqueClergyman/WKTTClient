import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Capped_Burnable_ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const cappedBurnableErc20Abi = [
  {
    type: "constructor",
    inputs: [
      { name: "name_", internalType: "string", type: "string" },
      { name: "symbol_", internalType: "string", type: "string" },
      { name: "cap_", internalType: "uint256", type: "uint256" },
      { name: "decimals_", internalType: "uint8", type: "uint8" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "_approve_",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "_transfer_",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "value", internalType: "uint256", type: "uint256" }],
    name: "burn",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "cap",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const cappedBurnableErc20Address = {
  11155111: "0xDa600F56b872F611daf584c83f73f839360FC15d",
} as const;

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const cappedBurnableErc20Config = {
  address: cappedBurnableErc20Address,
  abi: cappedBurnableErc20Abi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useReadCappedBurnableErc20 = /*#__PURE__*/ createUseReadContract({
  abi: cappedBurnableErc20Abi,
  address: cappedBurnableErc20Address,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useReadCappedBurnableErc20Allowance =
  /*#__PURE__*/ createUseReadContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "allowance",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useReadCappedBurnableErc20BalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "balanceOf",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"cap"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useReadCappedBurnableErc20Cap =
  /*#__PURE__*/ createUseReadContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "cap",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useReadCappedBurnableErc20Decimals =
  /*#__PURE__*/ createUseReadContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "decimals",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useReadCappedBurnableErc20Name =
  /*#__PURE__*/ createUseReadContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "name",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useReadCappedBurnableErc20Symbol =
  /*#__PURE__*/ createUseReadContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "symbol",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useReadCappedBurnableErc20TotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "totalSupply",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useWriteCappedBurnableErc20 = /*#__PURE__*/ createUseWriteContract(
  { abi: cappedBurnableErc20Abi, address: cappedBurnableErc20Address }
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useWriteCappedBurnableErc20Approve =
  /*#__PURE__*/ createUseWriteContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "approve",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useWriteCappedBurnableErc20Burn =
  /*#__PURE__*/ createUseWriteContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "burn",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useWriteCappedBurnableErc20Mint =
  /*#__PURE__*/ createUseWriteContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "mint",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useWriteCappedBurnableErc20Transfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "transfer",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useWriteCappedBurnableErc20TransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useSimulateCappedBurnableErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useSimulateCappedBurnableErc20Approve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "approve",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useSimulateCappedBurnableErc20Burn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "burn",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useSimulateCappedBurnableErc20Mint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "mint",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useSimulateCappedBurnableErc20Transfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "transfer",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useSimulateCappedBurnableErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cappedBurnableErc20Abi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useWatchCappedBurnableErc20Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `eventName` set to `"_approve_"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useWatchCappedBurnableErc20ApproveEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    eventName: "_approve_",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cappedBurnableErc20Abi}__ and `eventName` set to `"_transfer_"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDa600F56b872F611daf584c83f73f839360FC15d)
 */
export const useWatchCappedBurnableErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cappedBurnableErc20Abi,
    address: cappedBurnableErc20Address,
    eventName: "_transfer_",
  });
