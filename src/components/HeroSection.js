import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './HeroSection.css';

const HeroSection = ({ id }) => {
  const [sectionRef, isIntersecting] = useIntersectionObserver();

  return (
    <section id={id} className="hero-section" ref={sectionRef}>
      <div className="container">
        <div className="hero-content">
          <h1 className={`hero-title fade-in-up ${isIntersecting ? 'animate' : ''}`}>
            ערן נחום - הנדסת מוצרים טכנולוגים
          </h1>
          <p className={`hero-main-text fade-in-up ${isIntersecting ? 'animate' : ''}`}>
            אני יודע להפוך חזון למוצר שעובד, משלב התכנון, דרך הביצוע ועד ההצלחה
          </p>
          <ul className="hero-bullets">
            <li className={`fade-in-up ${isIntersecting ? 'animate' : ''}`}>אפיון משתמשים ומסעות לקוח</li>
            <li className={`fade-in-up ${isIntersecting ? 'animate' : ''}`}>הופך רעיון לאפיון ו-MVP</li>
            <li className={`fade-in-up ${isIntersecting ? 'animate' : ''}`}>בנייה ושילוב כלי AI במערכות קיימות</li>
            <li className={`fade-in-up ${isIntersecting ? 'animate' : ''}`}>תכלול המידע של העסק, עיבוד, ניתוח והסקת מסקנות ותובנות</li>
            <li className={`fade-in-up ${isIntersecting ? 'animate' : ''}`}>אוטומציה וקישוריות בין כל מערכות הארגון</li>
            <li className={`fade-in-up ${isIntersecting ? 'animate' : ''}`}>בניית צוותי סוכנים וסוכנים רבי שלבים</li>
          </ul>
          <a 
            href="https://calendly.com/your-calendly-link" 
            className={`cta-button fade-in-up ${isIntersecting ? 'animate' : ''}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-calendar-alt"></i>
            תיאום שיחה חינמית
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
