import { SITE } from "@/lib/site";

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
};

function getEthereum(): EthereumProvider | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as Window & { ethereum?: EthereumProvider }).ethereum;
}

export async function addRobinhoodChain(): Promise<"added" | "no-wallet"> {
  const ethereum = getEthereum();
  if (!ethereum) return "no-wallet";

  await ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: SITE.chainIdHex,
        chainName: SITE.chain,
        nativeCurrency: {
          name: "Ether",
          symbol: SITE.currency,
          decimals: 18,
        },
        rpcUrls: [SITE.rpc],
        blockExplorerUrls: [SITE.explorer],
      },
    ],
  });

  return "added";
}
