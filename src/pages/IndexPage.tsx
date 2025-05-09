import { Button } from "@/shared/components/ui/button";
import { publicClient, walletClient } from "@/shared/config/wagmi.config";
import { EXAMPLE_SWAP_CONTRACT_ADDRESS } from "@/shared/constants/addresses.js";
import EXAMPLE_SWAP_ABI from "@/shared/abis/exampleSwapAbi.json";
import { useState } from "react";
import { getContract, zeroAddress } from "viem";
import { useAccount } from "wagmi";

export default function IndexPage() {

  const [swapCounter, setSwapCounter] = useState<number | null>(null);
  const account = useAccount();

  const handleGetSwapsCounter = async () => {
    const contract = getContract({
      address: EXAMPLE_SWAP_CONTRACT_ADDRESS,
      abi: EXAMPLE_SWAP_ABI,
      client: publicClient,
    });

    const result = (await contract.read.swapCallCount()) as bigint;

    setSwapCounter(Number(result));
  };

  const handleMakeSwap = async () => {

    if (!account.address) {
      return;
    }
    
    const contract = getContract({
      address: EXAMPLE_SWAP_CONTRACT_ADDRESS,
      abi: EXAMPLE_SWAP_ABI,
      client: walletClient,
    });

    await contract.write.swap([zeroAddress, zeroAddress, 0, 0, 0], { account: account.address });
  };

  return (
    <div className="p-2">
      <p>swaps count: {swapCounter ? swapCounter : "нет"}</p>
      <Button onClick={handleGetSwapsCounter}>Get swaps counter</Button>
      <Button onClick={handleMakeSwap}>Make swap</Button>
    </div>
  );
}
