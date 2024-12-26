import { http, createConfig, cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    ssr: true,
    chains: [mainnet, sepolia],
    connectors: [
      metaMask({
        dappMetadata: {
          name: "Wagmi",
          url: "https://wagmi.io",
          iconUrl: "https://wagmi.io/favicon.ico",
        },
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  });
}
declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
