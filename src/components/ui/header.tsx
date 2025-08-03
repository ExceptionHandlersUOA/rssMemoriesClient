"use client"

interface HeaderProps {
  onLoginClick: () => void
}

export function Header({ onLoginClick }: HeaderProps) {
  return (
    <header className="header absolute top-0 right-0 left-0">
      <div className="header-content">
        <div className="header-logo">
          <h1 className="logo-text">RSS Memories</h1>
        </div>
        <nav className="header-nav">
          <a href="#" className="nav-link">
            About
          </a>
          <a href="#" className="nav-link">
            Features
          </a>
          <a href="#" className="nav-link">
            Help
          </a>
          <button className="header-login-btn" onClick={onLoginClick}>
            Login
          </button>
        </nav>
      </div>

      <style jsx>{`
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
          font-family: "Times New Roman", "Georgia", serif;
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
          font-family: "Times New Roman", "Georgia", serif;
          color: #8b4513;
          font-size: 16px;
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: color 0.3s ease;
          font-weight: 500;
        }

        .nav-link:hover {
          color: #a0522d;
          text-decoration: underline;
        }

        .header-login-btn {
          background: #8b4513;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-family: "Times New Roman", "Georgia", serif;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .header-login-btn:hover {
          background: #a0522d;
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
    </header>
  )
}
