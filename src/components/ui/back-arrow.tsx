"use client"

interface BackArrowProps {
  onClick: () => void
}

export function BackArrow({ onClick }: BackArrowProps) {
  return (
    <div className="back-arrow" onClick={onClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <style jsx>{`
        .back-arrow {
        position: absolute;
        top: 20px;
        left: 20px;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        background: rgba(245, 245, 220, 0.2);
        transition: all 0.3s ease;
        pointer-events: auto;
        z-index: 30;
                .back-arrow:hover {
        background: rgba(245, 245, 220, 0.4);
        transform: translateX(-2px);
                .back-arrow svg {
        display: block;
        }
        `}</style>
    </div>
  )
}
