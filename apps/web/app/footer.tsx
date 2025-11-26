"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 md:px-6 pt-10 md:pt-16 bg-zinc-50 dark:bg-zinc-950 overflow-hidden md:max-h-[820px]">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-10 md:pb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-semibold text-lg mb-4 block">
              Acme
            </Link>
            <p className="text-sm text-muted-foreground">
              Manage your finances with confidence.
            </p>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold mb-1">Product</h3>
            <Link
              href="/features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold mb-1">Resources</h3>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms and Conditions
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Github
            </a>
            <Link
              href="/support"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Support
            </Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold mb-1">Company</h3>
            <Link
              href="/story"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Story
            </Link>
            <Link
              href="/updates"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Updates
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
