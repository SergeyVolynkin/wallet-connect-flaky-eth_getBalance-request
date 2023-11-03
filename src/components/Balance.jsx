import { useEffect, useState } from "react";
import { sepolia, useAccount, useBalance, erc20ABI } from "wagmi";
import * as WagmiActions from "wagmi/actions";

export default function Balance() {
  const account = useAccount();
  const [balance, setBalance] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setInterval(async () => {
      if (!account.isConnected) return;
      if (account.address == null) return;
      setLoading(true);
      const owner = account.address;
      const spender = "0xAd7d0ae23918B810e424eF09eA0A9371e4Eac561"; // l1BridgeAddress
      const _balance = await WagmiActions.readContract({
        address: "0x29A873159D5e14AcBd63913D4A7E2df04570c666",
        abi: erc20ABI,
        functionName: "allowance",
        args: [owner, spender],
      });
      setLoading(false);
      // console.log(_balance, _balance.value);
      setBalance(_balance);
    }, 1000);
  }, [account.address]);

  return isLoading ? (
    "Loading..."
  ) : (
    <span>Allowance: {balance?.toString() ?? "Connect to see balance"}</span>
  );
}
