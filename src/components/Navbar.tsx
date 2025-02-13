import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, LogIn, Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate('/compare');
  };

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
          <Link to="/explore" className="nav-link" onClick={(e) => handleNavigation(e, '/explore')}>Explore</Link>
          <Link to="/business" className="nav-link" onClick={(e) => handleNavigation(e, '/business')}>Business</Link>
          <div className="nav-dropdown">
            <span className="nav-link">Policies</span>
            <div className="dropdown-content">
              <Link to="/policies/privacy" className="dropdown-item">Privacy Policy</Link>
              <Link to="/policies/terms" className="dropdown-item">Terms & Conditions</Link>
              <Link to="/policies/security" className="dropdown-item">Security</Link>
            </div>
          </div>
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
          <Link to="/explore" className="nav-link" onClick={(e) => handleNavigation(e, '/explore')}>Explore</Link>
          <Link to="/business" className="nav-link" onClick={(e) => handleNavigation(e, '/business')}>Business</Link>
          <div className="mobile-dropdown">
            <span className="nav-link">Policies</span>
            <div className="mobile-dropdown-content">
              <Link to="/policies/privacy" className="nav-link">Privacy Policy</Link>
              <Link to="/policies/terms" className="nav-link">Terms & Conditions</Link>
              <Link to="/policies/security" className="nav-link">Security</Link>
            </div>
          </div>
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