import React from 'react';
import Navbar from './Navbar';
import './LandingPage.css';
import welcomeImage from '../images/image-1.png';
import featureImage from '../images/image-2.png';
import testimonialImage from '../images/testimonials.png';
import '@fortawesome/fontawesome-free/css/all.min.css';



const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-text">
          <h1>The only app that gets your money into shape</h1>
          <p>Manage your finances and track your expenses effortlessly with FinWell.</p>
          <div className="app-buttons">
            <a href="Signup">
              <button className="btn app-store">Get Started</button>
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src={welcomeImage} alt="FinWell Dashboard" />
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>How to get your money into shape?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <img src={featureImage} alt="Perfect control" />
            <h3>Have perfect control</h3>
            <p>Track all your expenses, accounts, E-Wallets, and crypto wallets in one place.</p>
          </div>
          <div className="feature-card">
            <img src={featureImage} alt="Quick overview" />
            <h3>Get a quick overview</h3>
            <p>Analyze your total income and expenses at a glance, anytime, anywhere.</p>
          </div>
          <div className="feature-card">
            <img src={featureImage} alt="Smart budgets" />
            <h3>Use smart budgets</h3>
            <p>Plan your savings for your dream car, vacation, or top university.</p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="steps-section">
        <h2>Steps to get started with FinWell</h2>
        <div className="steps">
          <div className="step">
            <h3>Step 1</h3>
            <p>Track your income and expenses easily.</p>
          </div>
          <div className="step">
            <h3>Step 2</h3>
            <p>Set budgets and save for your goals.</p>
          </div>
          <div className="step">
            <h3>Step 3</h3>
            <p>Stay on track with real-time alerts.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>What our users say</h2>
        <div className="testimonials">
          <div className="testimonial">
            <img src={testimonialImage} alt="User Testimonial" />
            <p>"FinWell has transformed the way I handle my finances. It's simple, intuitive, and effective!"</p>
            <h4>— John Doe</h4>
          </div>
          <div className="testimonial">
            <img src={testimonialImage} alt="User Testimonial" />
            <p>"Thanks to FinWell, I can now save effortlessly for my future goals. Highly recommended!"</p>
            <h4>— Jane Smith</h4>
          </div>
        </div>
      </div>

      {/* features section */}
          <div className="features-section">
      <h2>Want to get your money into shape?</h2>
      <div className="feature-cards">
        {/* Feature 1 */}
        <div className="feature-card">
          <i className="fas fa-wallet feature-icon"></i>
          <h3>Have perfect control</h3>
          <p>Track all your expenses, accounts, E-Wallets, and crypto wallets in one place.</p>
        </div>
        
        {/* Feature 2 */}
        <div className="feature-card">
          <i className="fas fa-chart-line feature-icon"></i>
          <h3>Get a quick overview</h3>
          <p>Analyze your total income and expenses at a glance, anytime, anywhere.</p>
        </div>

        {/* Feature 3 */}
        <div className="feature-card">
          <i className="fas fa-piggy-bank feature-icon"></i>
          <h3>Use smart budgets</h3>
          <p>Plan your savings for your dream car, vacation, or top university.</p>
        </div>

        {/* New Features */}
        <div className="feature-card">
          <i className="fas fa-bullseye feature-icon"></i>
          <h3>Track Your Goals</h3>
          <p>Set personal savings milestones and monitor your progress effortlessly.</p>
        </div>

        <div className="feature-card">
          <i className="fas fa-bell feature-icon"></i>
          <h3>Real-Time Alerts</h3>
          <p>Receive instant notifications for all transactions and budgets.</p>
        </div>

        <div className="feature-card">
          <i className="fas fa-lock feature-icon"></i>
          <h3>Secure Your Data</h3>
          <p>Your financial data is encrypted and protected with top-notch security.</p>
        </div>
      </div>
    </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#signup">Sign Up</a>
          <a href="#login">Log In</a>
        </div>
        <p>© 2024 FinWell. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
