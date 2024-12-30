import Allowance from "./Allowance";
import Approve from "./Approve";
import Balance from "./Balance";
import BurnToken from "./BurnToken";
import MintTokens from "./MintToken";
import TokenInfo from "./TokenInfo";
import Transfer from "./Transfer";
import Wallet from "./Wallet";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-end items-center p-4 bg-slate-300">
        <Wallet />
      </div>
      <div className="w-full flex">
        <div>
          <TokenInfo />
        </div>
        <div>
          <Balance />
          <MintTokens />
          <Approve />
          <Transfer />
          <Allowance />
          <BurnToken />
        </div>
      </div>
    </div>
  );
}
