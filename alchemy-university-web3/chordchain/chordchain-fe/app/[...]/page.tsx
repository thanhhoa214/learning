import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="text-center lg:text-left md:pl-32 md:pr-12 lg:py-24 md:py-12 px-4 py-12 items-center flex justify-center flex-col-reverse lg:flex-row lg:justify-between md:gap-12 gap-6">
      <div className="xl:pt-24 w-full xl:w-1/2 pb-12 lg:pb-0">
        <strong className="text-8xl">404</strong>
        <h2 className="my-2 font-bold text-2xl">
          Oops! Looks like you&apos;ve missed something
        </h2>
        <p className="my-2">
          Sorry about that! Please visit our hompage to retry
        </p>
        <Link href="/">
          <Button size={"lg"} className="text-xl mt-4">
            Bring me Home!
          </Button>
        </Link>
      </div>
      <div className="w-1/2">
        <Image src="/404.svg" alt="404" width={360} height={300} />
      </div>
    </div>
  );
}
