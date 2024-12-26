import Wallet from "./Wallet";

export default function Home() {
  console.log("heee", process.env.ETHERSCAN_API_KEY);
  return (
    <div>
      <Wallet />
      
    </div>
  );
}
