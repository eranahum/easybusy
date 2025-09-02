import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Footer.css';

const Footer = () => {
  const [sectionRef, isIntersecting] = useIntersectionObserver();

  return (
    <footer className="footer" ref={sectionRef}>
      <div className="container">
        <div className="footer-content">
          <div className={`footer-section fade-in-up ${isIntersecting ? 'animate' : ''}`}>
            <div className="footer-logo">
              <img src="/cyclic_heptagon_minSide48_allMoving_12s_equal_transparent.webp" alt="EasyBusy Logo" />
              <div>
                <h3>EasyBusy</h3>
                <p>Product Engineering & Technology Consulting</p>
              </div>
            </div>
          </div>
          <div className={`footer-section fade-in-up ${isIntersecting ? 'animate' : ''}`}>
            <h4>שירותים</h4>
            <ul>
              <li>אסטרטגיית מוצר</li>
              <li>אפיון משתמשים</li>
              <li>ליווי טכנולוגי</li>
              <li>הטמעת מערכות</li>
            </ul>
          </div>
          <div className={`footer-section fade-in-up ${isIntersecting ? 'animate' : ''}`}>
            <h4>צור קשר</h4>
            <ul>
              <li>info@easybusy.com</li>
              <li>+972-50-123-4567</li>
              <li>תיאום פגישה</li>
            </ul>
          </div>
        </div>
        <div className={`footer-bottom fade-in-up ${isIntersecting ? 'animate' : ''}`}>
          <p>&copy; 2024 EasyBusy. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
