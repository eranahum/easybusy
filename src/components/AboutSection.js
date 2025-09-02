import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './AboutSection.css';

const AboutSection = ({ id }) => {
  const [sectionRef, isIntersecting] = useIntersectionObserver();

  return (
    <section id={id} className="about-section" ref={sectionRef}>
      <div className="container">
        <div className="about-content">
          <div className={`about-image fade-in-up ${isIntersecting ? 'animate' : ''}`}>
            <div className="profile-image">
              <img src="/profile.jpg" alt="ערן נחום - מנהל מוצר" />
            </div>
          </div>
          <div className={`about-text fade-in-up ${isIntersecting ? 'animate' : ''}`}>
            <h2>אודות</h2>
            <p>אני ערן נחום — בעל נסיון עשיר ורחב בתחומי ניהול מוצר ופיתוח עסקי. היום אני מלווה עסקים קטנים-בינוניים בבניית MVP מדויק ומהיר, ובהמשך בהטמעת אוטומציה וסוכני AI בהתאם לצורך.</p>
            <ul>
              <li>ניהול מוצר ואסטרטגיה בחברות שיווק מרקטינג ומכירות</li>
              <li>בניית פלטפורמות BI ותהליכי קבלת החלטות</li>
              <li>6 שנים כמייסד ומנהל מוצר בסטארטאפ</li>
              <li>ניהול צוותי פיתוח מרחוק</li>
              <li>ניסיון בגיוס הון</li>
              <li>UI/UX ל-SaaS ומרקטפלייסים</li>
            </ul>
            <div className="about-cta">
              <p><strong>בואו נדבר — אשמח להבין את היעדים שלכם ולהציע תכנית קצרה.</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
