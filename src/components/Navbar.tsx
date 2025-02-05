import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, LogIn, Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" className="nav-brand">
            <Building2 className="nav-icon" />
            <span>Better Banking</span>
          </Link>
        </div>

        <div className="nav-links desktop-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/compare" className="nav-link">Compare Loans</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="login-button"
          >
            <LogIn className="button-icon" />
            Login
          </button>
        </div>

        <div className="mobile-menu">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="menu-button"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/compare" className="nav-link">Compare Loans</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="login-button"
          >
            Login
          </button>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;