import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './FAQSection.css';

const FAQSection = ({ id }) => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [sectionRef, isIntersecting] = useIntersectionObserver();

  const faqs = [
    {
      id: 1,
      question: 'איך מתחילים פרויקט מוצר חדש?',
      answer: 'נתחיל בשיחה קצרה להבנת הצרכים והיעדים שלכם. אבנה מפת דרכים מפורטת עם אבני דרך ברורות, ואתחיל בעבודת האפיון והמחקר.'
    },
    {
      id: 2,
      question: 'כמה זמן לוקח לבנות MVP?',
      answer: 'תלוי במורכבות המוצר, אבל בדרך כלל בין 4-8 שבועות. אני מתמקד בבניית מוצר מינימלי שעובד ומספק ערך מיידי.'
    },
    {
      id: 3,
      question: 'האם אתם עובדים עם צוותים קיימים?',
      answer: 'כן, אני יכול לעבוד עם הצוות הקיים שלכם או להמליץ על מפתחים ופרילנסרים מתאימים. אני מתמחה בבניית גשרים בין הצד העסקי לטכני.'
    },
    {
      id: 4,
      question: 'מה ההבדל בין ניהול מוצר חלקי ל-CPO במשרה מלאה?',
      answer: 'ניהול מוצר חלקי מאפשר לכם לקבל את הידע והניסיון של מנהל מוצר מנוסה בלי להעסיק במשרה מלאה. אני עובד איתכם לפי הצורך ומעביר ידע לצוות הפנימי.'
    },
    {
      id: 5,
      question: 'איך אתם מתמחרים את השירותים?',
      answer: 'המחיר תלוי בהיקף העבודה והמורכבות. אני מציע תכניות גמישות - החל מפרויקטים חד פעמיים ועד ליווי מתמשך. נתחיל בשיחה חינמית להבנת הצרכים.'
    }
  ];

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <section id={id} className="faq-section" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title fade-in-up ${isIntersecting ? 'animate' : ''}`}>שאלות נפוצות</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className={`faq-item fade-in-up ${isIntersecting ? 'animate' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <button 
                className={`faq-question ${openFAQ === faq.id ? 'active' : ''}`}
                onClick={() => toggleFAQ(faq.id)}
              >
                {faq.question}
                <i className={`fas fa-chevron-${openFAQ === faq.id ? 'up' : 'down'}`}></i>
              </button>
              <div className={`faq-answer ${openFAQ === faq.id ? 'active' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
