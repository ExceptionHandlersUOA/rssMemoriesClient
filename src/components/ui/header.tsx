"use client"

import Link from "next/link"

export function Header() {
  return (
    <header className="absolute top-0 right-0 left-0 z-50 border-b border-[rgba(139,69,19,0.1)] bg-[rgba(245,245,220,0.05)] px-5 py-4 backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <div className="flex items-center">
          <h1 className="font-times m-0 text-2xl font-bold tracking-[0.5px] text-[#2c1810] drop-shadow-[1px_1px_2px_rgba(139,69,19,0.2)]">
            Web Memories
          </h1>
        </div>
        <nav className="flex items-center gap-6">
          <a
            href="#"
            className="font-times text-base font-medium tracking-[0.3px] text-[#8b4513] no-underline transition-colors duration-300 hover:text-[#a0522d] hover:underline"
          >
            About
          </a>
          <a
            href="#"
            className="font-times text-base font-medium tracking-[0.3px] text-[#8b4513] no-underline transition-colors duration-300 hover:text-[#a0522d] hover:underline"
          >
            Features
          </a>
          <a
            href="#"
            className="font-times text-base font-medium tracking-[0.3px] text-[#8b4513] no-underline transition-colors duration-300 hover:text-[#a0522d] hover:underline"
          >
            Help
          </a>
          <Link
            href="/login"
            className="font-times cursor-pointer rounded border-none bg-[#8b4513] px-4 py-2 text-sm font-bold tracking-wide text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-[#a0522d] hover:shadow-[0_2px_4px_rgba(139,69,19,0.3)]"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  )
}
