import { publicProvider } from "wagmi/providers/public";
import { walletConnectProvider } from "@web3modal/wagmi";
import { EIP6963Connector, createWeb3Modal } from "@web3modal/wagmi/react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { configureChains, createConfig, WagmiConfig } from "wagmi";

import { useEffect, useState } from "react";
import { mainnet, sepolia } from "wagmi/chains";
import "../styles.css";

// 1. Get projectID at https://cloud.walletconnect.com
const PUBLIC_PROJECT_ID = null;

if (PUBLIC_PROJECT_ID == null) {
  throw new Error("Set PUBLIC_PROJECT_ID in src/pages/_app.jsx");
}
const projectId = PUBLIC_PROJECT_ID;

// 2. Configure wagmi client
const availableChains = [mainnet, sepolia];

const { chains, publicClient } = configureChains(availableChains, [
  walletConnectProvider({ projectId }),
  publicProvider(),
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false },
    }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        /**
         * Defaults to true, check back later if can be removed in the future versions of MetaMask
         * @see https://github.com/MetaMask/metamask-extension/issues/10353
         */
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
});

createWeb3Modal({ projectId, wagmiConfig });

export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready ? (
    <WagmiConfig config={wagmiConfig}>
      <Component {...pageProps} />
    </WagmiConfig>
  ) : null;
}
