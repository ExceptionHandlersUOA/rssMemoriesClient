export function Footer() {
  return (
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
    
    <style jsx>{`
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
    }`}</style>
    </footer>
  )
}