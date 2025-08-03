export function Footer() {
  return (
    <footer className="absolute right-0 bottom-0 left-0 z-5 border-t border-[rgba(139,69,19,0.1)] bg-[rgba(245,245,220,0.05)] px-5 py-4">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <p className="font-times m-0 text-sm tracking-[0.3px] text-[#6B4423]">
          © 2025 RSS Memories. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="font-times text-sm tracking-[0.3px] text-[#8B4513] no-underline transition-colors duration-300 hover:text-[#A0522D] hover:underline"
          >
            Privacy Policy
          </a>
          <span className="text-sm text-[#8B4513] opacity-50">|</span>
          <a
            href="#"
            className="font-times text-sm tracking-[0.3px] text-[#8B4513] no-underline transition-colors duration-300 hover:text-[#A0522D] hover:underline"
          >
            Terms of Service
          </a>
          <span className="text-sm text-[#8B4513] opacity-50">|</span>
          <a
            href="#"
            className="font-times text-sm tracking-[0.3px] text-[#8B4513] no-underline transition-colors duration-300 hover:text-[#A0522D] hover:underline"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
