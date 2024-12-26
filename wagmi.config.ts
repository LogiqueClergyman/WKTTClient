import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { sepolia } from "wagmi/chains";
import dotenv from "dotenv";
dotenv.config();
export default defineConfig({
  out: "app/generated.ts",
  contracts: [],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: sepolia.id,
      contracts: [
        {
          name: "Capped_Burnable_ERC20",
          address: "0xDa600F56b872F611daf584c83f73f839360FC15d",
        },
      ],
    }),
    react(),
  ],
});
