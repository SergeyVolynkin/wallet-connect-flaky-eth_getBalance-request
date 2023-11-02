import { useEffect, useState } from "react";
import { sepolia, useAccount, useBalance } from "wagmi";
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
      const _balance = await WagmiActions.fetchBalance({
        address: account.address,
        chainId: sepolia.id,
      });
      setLoading(false);
      // console.log(_balance, _balance.value);
      setBalance(_balance);
    }, 1000);
  }, [account.address]);

  return isLoading ? (
    "Loading..."
  ) : (
    <span>
      Balance: {balance?.value.toString() ?? "Connect to see balance"}
    </span>
  );
}
