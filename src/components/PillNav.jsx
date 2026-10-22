import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function PillNav({ items }) {
  const location = useLocation();

  return (
    <>
      <style>{`
        .pill-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px;
          background: #151518;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .pill-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          padding: 0 16px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #9a9aa3;
          text-decoration: none;
          border-radius: 9999px;
          background: transparent;
          transition: background-color 0.2s ease, color 0.2s ease;
          cursor: pointer;
        }
        /* Active Tab: Muted dark gray background with white text */
        .pill-item.active {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          font-weight: 700;
        }
        /* Hover State: Fills up solid white with dark text */
        .pill-item:hover {
          background: #ffffff;
          color: #000000;
          font-weight: 700;
        }
        .pill-dot {
          position: absolute;
          bottom: 4px;
          width: 4px;
          height: 4px;
          background: #e00122;
          border-radius: 50%;
        }
      `}</style>

      <nav className="pill-nav" aria-label="Main">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`pill-item${isActive ? ' active' : ''}`}
            >
              {item.label}
              {isActive && <span className="pill-dot" />}
            </Link>
          );
        })}
      </nav>
    </>
  );
}