"use client";
import React, { ReactEventHandler } from "react";
import { Button } from "../ui/button";
import { CheckCircle, ExternalLink, Gift } from "lucide-react";
import { useAccount, useSendTransaction } from "wagmi";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { parseEther } from "viem";
import { toast } from "sonner";
import { useIsClient } from "usehooks-ts";

export default function DonateButton({
  address,
  className,
}: {
  address: string;
  className?: string;
}) {
  const isClient = useIsClient();
  const { address: myAddress } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();

  const onSubmit: ReactEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const amount = e.currentTarget["amount"].value;
    const parsedAmount = parseEther(amount);
    if (parsedAmount < 0) {
      return toast("Amount must be larger than 0");
    }

    const { hash } = await sendTransactionAsync({
      to: address,
      value: parsedAmount,
    });
    toast("Thanks for your donation. The owner will be much appreciated!", {
      icon: <CheckCircle />,
      action: {
        label: (
          <span className="inline-flex items-center gap-1">
            Etherscan <ExternalLink size={12} />
          </span>
        ),
        onClick: () =>
          window.open(`https://goerli.etherscan.io/tx/${hash}`, "_blank"),
      },
      dismissible: true,
    });
  };

  if (!isClient) return null;
  if (myAddress?.toLowerCase() === address.toLowerCase()) return null;

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex items-center gap-2 py-2 px-4 border rounded-lg bg-orange-100",
        className
      )}
    >
      <Gift />
      <Input
        name="amount"
        type="number"
        placeholder="Ether amount ~ 0.001"
        className="h-9 w-48"
        step={0.001}
        min={0}
      />
      <Button size={"sm"}>Donate</Button>
    </form>
  );
}
