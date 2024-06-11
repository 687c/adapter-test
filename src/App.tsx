import { useMemo, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import {
	WalletDisconnectButton,
	WalletModalProvider,
	WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

function App() {
	const [count, setCount] = useState(0);

	const network = WalletAdapterNetwork.Devnet;

	// You can also provide a custom RPC endpoint.
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);

	const wallets = useMemo(
		() => [
			/**
			 * Wallets that implement either of these standards will be available automatically.
			 *
			 *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
			 *     (https://github.com/solana-mobile/mobile-wallet-adapter)
			 *   - Solana Wallet Standard
			 *     (https://github.com/anza-xyz/wallet-standard)
			 *
			 * If you wish to support a wallet that supports neither of those standards,
			 * instantiate its legacy wallet adapter here. Common legacy adapters can be found
			 * in the npm package `@solana/wallet-adapter-wallets`.
			 */
			new UnsafeBurnerWalletAdapter(),
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[network]
	);

	return (
		<>
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider wallets={wallets} autoConnect>
					<WalletModalProvider>
						<WalletMultiButton />
						<WalletDisconnectButton />
						{/* Your app's components go here, nested within the context providers. */}
						<div>
							<a href="https://vitejs.dev" target="_blank">
								<img
									src={viteLogo}
									className="logo"
									alt="Vite logo"
								/>
							</a>
							<a href="https://react.dev" target="_blank">
								<img
									src={reactLogo}
									className="logo react"
									alt="React logo"
								/>
							</a>
						</div>
						<h1>Vite + React</h1>
						<div className="card">
							<button
								onClick={() => setCount((count) => count + 1)}
							>
								count is {count}
							</button>
							<p>
								Edit <code>src/App.tsx</code> and save to test
								HMR
							</p>
						</div>
						<p className="read-the-docs">
							Click on the Vite and React logos to learn more
						</p>
					</WalletModalProvider>
				</WalletProvider>
			</ConnectionProvider>
		</>
	);
}

export default App;
