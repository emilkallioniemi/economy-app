"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  isSignedIn: boolean;
}

export function Header(props: Props) {
  return (
    <nav className="fixed max-w-2xl w-full left-1/2 -translate-x-1/2 mt-10 border border-border px-4 flex items-center backdrop-filter backdrop-blur-xl bg-[#FFFFFF]/65 dark:bg-[#121212]/80 bg-opacity-70 h-[50px] z-20">
      <div className="flex items-center flex-1">
        <Link href="/" className="font-semibold">
          Acme
        </Link>
      </div>
      <div className="hidden lg:flex items-center gap-8 text-sm absolute left-1/2 -translate-x-1/2">
        <Link
          href="/features"
          className="text-foreground/50 hover:text-foreground transition-colors"
        >
          Features
        </Link>
        <Link
          href="/pricing"
          className="text-foreground/50 hover:text-foreground transition-colors"
        >
          Pricing
        </Link>
        <Link
          href="/privacy"
          className="text-foreground/50 hover:text-foreground transition-colors"
        >
          Privacy
        </Link>
      </div>
      <div className="flex items-center gap-4 flex-1 justify-end">
        {props.isSignedIn ? (
          <Button asChild size="xs">
            <Link href="/chat">Go to App</Link>
          </Button>
        ) : (
          <Button asChild size="xs">
            <Link href="/chat">Get Started</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
