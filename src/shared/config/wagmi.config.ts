import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { createPublicClient, createWalletClient, custom, defineChain, http } from "viem";
import { USER_ACCOUNT_ADDRESS } from "../constants/addresses";
import { TENDERLY_NET_ID } from "../constants/ids";

// Simulate transaction or get logs with http request etc.
// const TENDERLY_PROJECT_API_URL = process.env.VITE_TENDERLY_PROJECT_API_URL;
// const TENDERLY_ACCESS_TOKEN = process.env.VITE_TENDERLY_ACCESS_TOKEN;

// Tenderly virtual Net consts
const TENDERLY_NET_RPC = import.meta.env.VITE_TENDERLY_NET_RPC;
const TENDERLY_NET_EXPLORER = import.meta.env.VITE_TENDERLY_NET_EXPLORER;

// WalletConnect (https://cloud.reown.com/)
const WALLET_CONNECT_PROJECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

// All the settings u can take from tenderly project
export const virtual_net = defineChain({
  id: TENDERLY_NET_ID,
  name: "Virtual Net",
  nativeCurrency: { name: "VETH", symbol: "VETH", decimals: 18 },
  rpcUrls: {
    default: { http: [TENDERLY_NET_RPC] },
  },
  blockExplorers: {
    default: {
      name: "Tenderly Net Explorer",
      url: TENDERLY_NET_EXPLORER,
    },
  },
});

// All the settings u can take from reown cloud
export const config = getDefaultConfig({
  appName: "Test",
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [virtual_net],
});

export const publicClient = createPublicClient({
  chain: virtual_net,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: virtual_net,
  transport: custom(window.ethereum),
  account: USER_ACCOUNT_ADDRESS,
});