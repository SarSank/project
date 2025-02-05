import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Briefcase, GraduationCap, Home as HomeIcon } from 'lucide-react';

const loanTypes = [
  {
    icon: Building2,
    title: 'Personal Loans',
    description: 'Find the best personal loan rates for your needs',
    link: '/compare?type=personal'
  },
  {
    icon: Briefcase,
    title: 'Business Loans',
    description: 'Grow your business with competitive financing options',
    link: '/compare?type=business'
  },
  {
    icon: GraduationCap,
    title: 'Student Loans',
    description: 'Fund your education with flexible student loans',
    link: '/compare?type=student'
  },
  {
    icon: HomeIcon,
    title: 'Mortgage Loans',
    description: 'Make your dream home a reality with the right mortgage',
    link: '/compare?type=mortgage'
  }
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Loan</h1>
          <p className="hero-subtitle">
            Compare rates from multiple lenders and find the best loan for your needs.
          </p>
          <Link to="/compare" className="button">
            Compare Loans Now
          </Link>
        </div>
      </section>

      {/* Loan Types Section */}
      <section className="loan-types">
        <h2 className="section-title">Explore Loan Options</h2>
        <div className="loan-grid">
          {loanTypes.map((type) => (
            <Link key={type.title} to={type.link} className="loan-card">
              <type.icon className="loan-icon" />
              <h3 className="loan-title">{type.title}</h3>
              <p className="loan-description">{type.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-title">Compare Multiple Lenders</h3>
            <p className="feature-description">Get quotes from multiple banks in one place</p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Save Time & Money</h3>
            <p className="feature-description">Find the best rates without visiting multiple banks</p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Expert Guidance</h3>
            <p className="feature-description">Get personalized recommendations based on your needs</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;