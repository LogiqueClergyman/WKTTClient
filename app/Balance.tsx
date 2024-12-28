"use client";
import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useReadCappedBurnableErc20BalanceOf } from "./generated";

function Balance() {
  const account = useAccount();
  const [balance, setBalance] = useState<string>("0");

  const { data, error } = useReadCappedBurnableErc20BalanceOf({
    args: [account.address || "0x0000000000000000000000000000000000000000"],
  });

  useEffect(() => {
    if (data) {
      setBalance(data.toString());
    }
  }, [data]);

  if (error) {
    return <div>Error fetching balance</div>;
  }

  return (
    <div>
      <h3>Your Balance</h3>
      <p>{balance}</p>
    </div>
  );
}

export default Balance;
