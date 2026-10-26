"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/learn", label: "Learn" },
  { href: "/practice", label: "Practice" },
]

export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden>
        <rect width="28" height="28" rx="8" className="fill-primary" />
        <path
          d="M5 14c2.2 0 2.6-6 4.5-6s2.3 12 4.5 12 2.6-12 4.5-12 2.3 6 4.5 6"
          fill="none"
          className="stroke-primary-foreground"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span className="whitespace-nowrap font-heading text-[15px] font-medium tracking-tight">
        Signals <span className="text-muted-foreground">&amp;</span> Systems
      </span>
    </span>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Home">
          <Wordmark />
        </Link>
        <nav className="flex items-center gap-1">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors sm:px-3.5",
                  active ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <span className="mx-1 h-5 w-px bg-border" aria-hidden />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
