'use client'


export function OpenBookAnimation() {
  return ( 
    <div className="open-book-animation absolute">
        <img
        src="/open_book.png"
        alt="Open Book"
        className="w-48 h-48 md:w-64 md:h-64 object-contain"
        />
        <style jsx>{`
        @keyframes openBookSlideUp {
          0% { 
            transform: translateY(100vh);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% { 
            transform: translateY(0);
            opacity: 1;
          }
        }
        .open-book-animation {
          left: 0;
          top: 6%;
          animation: openBookSlideUp 1.2s ease-out forwards;
          z-index: 10;
        }

        .open-book-animation img {
          width: 100vw;
          height: auto;
          z-index: 1;
        }
        `}</style>
    </div>
    )
}