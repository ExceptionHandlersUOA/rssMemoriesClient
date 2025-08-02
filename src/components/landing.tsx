"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function Landing() {
  const [isAnimating, setIsAnimating] = useState(false)

  const router = useRouter()

  const handleBookClick = () => {
    setIsAnimating(true)
  }

  const handleLoginClick = () => {
    router.push("/login")
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background relative overflow-hidden">
      {/* Header - hidden during animation */}
      {!isAnimating && (
        <header className="header absolute top-0 left-0 right-0">
          <div className="header-content">
            <div className="header-logo">
              <h1 className="logo-text">RSS Memories</h1>
            </div>
            <nav className="header-nav">
              <a href="#" className="nav-link">About</a>
              <a href="#" className="nav-link">Features</a>
              <a href="#" className="nav-link">Help</a>
              <button className="header-login-btn" onClick={handleLoginClick}>
                Login
              </button>
            </nav>
          </div>
        </header>
      )}

      <div className="flex flex-col items-center gap-8">
        {/* Book Image with Shaking Animation */}
        <div 
          className={`animate-shake ${isAnimating ? 'book-fly-up' : ''}`}
          onClick={handleBookClick}
        >
          <img
            src="/book.png"
            alt="Book"
            className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-lg cursor-pointer"
          />
        </div>
        
        {/* Optional content below the book */}
        <div className={`text-center ${isAnimating ? 'fade-out' : ''}`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            RSS Memories
          </h1>
          <p className="text-muted-foreground text-lg">
            Your memories, organized and preserved
          </p>
        </div>
      </div>

      {/* Open Book Animation */}
      {isAnimating && (
        <div className="open-book-animation absolute">
          <img
            src="/open_book.png"
            alt="Open Book"
            className="w-48 h-48 md:w-64 md:h-64 object-contain"
          />
        </div>
      )}

            {/* Open Book Animation */}
      {isAnimating && (
        <div className="book-content absolute inset-0 flex items-center justify-between text-center px-8 md:px-16">
            {/* Back Arrow Icon */}
            <div className="back-arrow" onClick={() => setIsAnimating(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center" style={{paddingRight: '8%'} }>
                <div className="book-content-wrapper" style={{maxWidth: '85%', maxHeight: '70%'}}>
                    <h2 className="book-title text-2xl md:text-4xl font-bold mb-4">
                        OUR PRODUCT NAME
                    </h2>
                    <div className="content-divider mb-4"></div>
                    <p className="book-text text-lg md:text-xl">
                        Our product description goes here. It can be a brief overview of what the product does and its key features.
                    </p>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center" >
                <div className="return-box">
                    <p className="main-text text-xl md:text-3xl mb-8">
                        Your memories deserve a special place. Sign in to keep writing your story and revisit the memories that matter most.
                    </p>
                    <button type="button" className="login-button cursor-pointer" onClick={handleLoginClick}>
                        Login
                    </button>
                </div>
            </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="footer absolute bottom-0 left-0 right-0">
        <div className="footer-content">
          <p className="footer-text">
            © 2025 RSS Memories. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <span className="footer-divider">|</span>
            <a href="#" className="footer-link">Terms of Service</a>
            <span className="footer-divider">|</span>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
      
      {/* Custom CSS for rotational shaking animation */}
      <style jsx>{`
        @keyframes rotationalShake {
          0%, 33% { transform: rotate(0deg); }
          3%, 9%, 15%, 21%, 27% { transform: rotate(-3deg); }
          6%, 12%, 18%, 24%, 30% { transform: rotate(3deg); }
          33%, 100% { transform: rotate(0deg); }
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

        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes fadeInText {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-shake {
          animation: rotationalShake 3s ease-in-out infinite;
        }
        
        .animate-shake:hover {
          animation: none;
        }

        .book-fly-up {
          animation: bookFlyUp 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards !important;
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

        .fade-out {
          animation: fadeOut 0.5s ease-out forwards;
        }

        .book-content {
          animation: fadeInText 0.8s ease-in 1.2s forwards;
          opacity: 0;
          z-index: 20;
          pointer-events: none;
        }

        .book-title {
          font-family: 'Times New Roman', 'Georgia', serif;
          color: #2c1810;
          text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.3);
          letter-spacing: 0.5px;
          line-height: 1.2;
        }

        .book-text {
          font-family: 'Times New Roman', 'Georgia', serif;
          color: #3a2317;
          text-shadow: 0.5px 0.5px 1px rgba(139, 69, 19, 0.2);
          line-height: 1.6;
          letter-spacing: 0.3px;
          text-align: center;
        }

        .book-content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2% 3%;
          overflow: hidden;
        }

        .content-divider {
          width: 80%;
          height: 1px;
          background: linear-gradient(to right, transparent, #8B4513, transparent);
          opacity: 0.3;
        }

        .return-box {
          border: 2px solid #8B4513;
          border-radius: 8px;
          padding: 30px 25px;
          max-width: 90%;
          background: rgba(245, 245, 220, 0.1);
          box-shadow: 0 2px 4px rgba(139, 69, 19, 0.2);
        }

        .main-text {
          font-family: 'Times New Roman', 'Georgia', serif;
          color: #2c1810;
          text-align: center;
          line-height: 1.4;
          letter-spacing: 0.3px;
          text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.2);
        }

        .return-text {
          font-family: 'Times New Roman', 'Georgia', serif;
          color: #2c1810;
          text-align: center;
          font-size: 16px;
          line-height: 1.4;
          margin-bottom: 15px;
          letter-spacing: 0.3px;
        }

        .login-button {
          background: #8B4513;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          font-family: 'Times New Roman', 'Georgia', serif;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
          width: 100%;
          pointer-events: auto;
        }

        .login-button:hover {
          background: #A0522D;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(139, 69, 19, 0.3);
        }

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
        }

        .back-arrow:hover {
          background: rgba(245, 245, 220, 0.4);
          transform: translateX(-2px);
        }

        .back-arrow svg {
          display: block;
        }

        .footer {
          background: rgba(245, 245, 220, 0.05);
          border-top: 1px solid rgba(139, 69, 19, 0.1);
          padding: 16px 20px;
          z-index: 5;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-text {
          font-family: 'Times New Roman', 'Georgia', serif;
          color: #6B4423;
          font-size: 14px;
          margin: 0;
          letter-spacing: 0.3px;
        }

        .footer-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-link {
          font-family: 'Times New Roman', 'Georgia', serif;
          color: #8B4513;
          font-size: 14px;
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #A0522D;
          text-decoration: underline;
        }

        .footer-divider {
          color: #8B4513;
          opacity: 0.5;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
          
          .footer-links {
            justify-content: center;
          }
        }

        .header {
          background: rgba(245, 245, 220, 0.05);
          border-bottom: 1px solid rgba(139, 69, 19, 0.1);
          padding: 16px 20px;
          z-index: 50;
          backdrop-filter: blur(10px);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-logo {
          display: flex;
          align-items: center;
        }

        .logo-text {
          font-family: 'Times New Roman', 'Georgia', serif;
          color: #2c1810;
          font-size: 24px;
          font-weight: bold;
          margin: 0;
          letter-spacing: 0.5px;
          text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.2);
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-link {
          font-family: 'Times New Roman', 'Georgia', serif;
          color: #8B4513;
          font-size: 16px;
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: color 0.3s ease;
          font-weight: 500;
        }

        .nav-link:hover {
          color: #A0522D;
          text-decoration: underline;
        }

        .header-login-btn {
          background: #8B4513;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-family: 'Times New Roman', 'Georgia', serif;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .header-login-btn:hover {
          background: #A0522D;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(139, 69, 19, 0.3);
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 12px;
          }
          
          .header-nav {
            gap: 16px;
          }
          
          .nav-link {
            font-size: 14px;
          }
          
          .logo-text {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  )
}
