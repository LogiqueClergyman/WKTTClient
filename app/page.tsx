import Allowance from "./Allowance";
import Approve from "./Approve";
import Balance from "./Balance";
import BurnToken from "./BurnToken";
import MintTokens from "./MintToken";
import TokenInfo from "./TokenInfo";
import Transfer from "./Transfer";
import Wallet from "./Wallet";

export default function Home() {
  console.log("heee", process.env.ETHERSCAN_API_KEY);
  return (
    <div>
      <TokenInfo />
      <Wallet />
      <Balance />
      <MintTokens />
      <Approve />
      <Transfer />
      <Allowance />
      <BurnToken />
    </div>
  );
}
