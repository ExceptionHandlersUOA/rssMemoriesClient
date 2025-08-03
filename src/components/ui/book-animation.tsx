"use client"

interface BookAnimationProps {
  isAnimating: boolean
  onClick: () => void
}

export function BookAnimation({ isAnimating, onClick }: BookAnimationProps) {
  return (
    <div
      className={`animate-shake ${isAnimating ? "book-fly-up" : ""}`}
      onClick={onClick}
    >
      <img
        src="/book.png"
        alt="Book"
        className="h-48 w-48 cursor-pointer object-contain drop-shadow-lg md:h-64 md:w-64"
      />

      <style jsx>{`
        @keyframes rotationalShake {
          0%,
          33% {
            transform: rotate(0deg);
          }
          3%,
          9%,
          15%,
          21%,
          27% {
            transform: rotate(-3deg);
          }
          6%,
          12%,
          18%,
          24%,
          30% {
            transform: rotate(3deg);
          }
          33%,
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes bookFlyUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-200vh) scale(0.5);
            opacity: 0;
          }
        }

        .animate-shake {
          animation: rotationalShake 3s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .animate-shake:hover {
          animation: none;
          transform: scale(1.1);
          filter: drop-shadow(0 16px 20px rgba(0, 0, 0, 0.4))
            drop-shadow(0 6px 6px rgba(139, 69, 19, 0.3));
        }

        .book-fly-up {
          animation: bookFlyUp 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards !important;
        }
      `}</style>
    </div>
  )
}
