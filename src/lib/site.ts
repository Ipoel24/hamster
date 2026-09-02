export const SITE = {
  name: "$HAMSTER",
  ticker: "HAMSTER",
  chain: "Robinhood Chain",
  chainId: 4663,
  chainIdHex: "0x1237",
  rpc: "https://rpc.mainnet.chain.robinhood.com",
  explorer: "https://robinhoodchain.blockscout.com",
  currency: "ETH",
  contract: "0x0000000000000000000000000000000000000000",
  artistUrl: "https://www.instagram.com/almarts27/",
  artistHandle: "@almarts27",
  walletUrl: "https://robinhood.com/us/en/crypto/wallet/",
  uniswapUrl: "https://app.uniswap.org/swap",
  twitterUrl: "#community",
  telegramUrl: "#community",
  dexscreenerUrl: "https://robinhoodchain.blockscout.com",
  supply: "1,000,000,000",
} as const;

export const CONTRACT_UNSET =
  SITE.contract === "0x0000000000000000000000000000000000000000";
