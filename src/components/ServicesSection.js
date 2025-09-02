import React, { useState } from 'react';
import { useStaggeredAnimation } from '../hooks/useIntersectionObserver';
import './ServicesSection.css';

const ServicesSection = ({ id }) => {
  const [expandedService, setExpandedService] = useState(null);
  const [itemRefs, animatedItems] = useStaggeredAnimation(5); // 5 services

  const services = [
    {
      id: 'service1',
      icon: 'fas fa-brain',
      title: 'אסטרטגיית מוצר & Roadmap',
      description: 'מפת דרכים, חזון, תעדוף והצמדת מטרות עסקיות.',
      details: {
        includes: [
          'ניתוח שוק מתחרים וזיהוי הזדמנויות',
          'בניית חזון מוצר ברור ומדיד',
          'יצירת מפת דרכים עם אבני דרך מוגדרות',
          'תדוף תכונות לפי ROI ויעדים עסקיים',
          'הגדרת KPIs ומדדי הצלחה'
        ],
        suitableFor: 'סטארטאפים בתחילת הדרך, עסקים שמחפשים כיוון חדש, או מוצרים קיימים שצריכים רענון אסטרטגי.'
      }
    },
    {
      id: 'service2',
      icon: 'fas fa-search',
      title: 'אפיון & מחקר משתמשים',
      description: 'ראיונות, מיפוי כאבים, הגדרת MVP ממוקד.',
      details: {
        includes: [
          'ראיונות עומק עם משתמשים פוטנציאליים',
          'מיפוי כאבים וצרכים לא מסופקים',
          'יצירת personas מפורטים',
          'בניית user journey maps',
          'הגדרת MVP עם תכונות חיוניות בלבד'
        ],
        suitableFor: 'צוותים שרוצים להבין מה המשתמשים באמת רוצים, לפני שמתחילים לפתח.'
      }
    },
    {
      id: 'service3',
      icon: 'fas fa-wrench',
      title: 'ליווי טכנולוגי וניהול מפתחים',
      description: 'סיוע בבחירת טכנולוגיה, ניהול פרילנסרים וצוותים.',
      details: {
        includes: [
          'ייעוץ בבחירת stack טכנולוגי מתאים',
          'ניהול צוותי פיתוח ופרילנסרים',
          'בקרת איכות ובדיקות קוד',
          'תכנון ארכיטקטורה וסקלביליות',
          'ניהול סיכונים טכנולוגיים'
        ],
        suitableFor: 'מייסדים ללא רקע טכני, או צוותים שצריכים גשר בין הצד העסקי לטכני.'
      }
    },
    {
      id: 'service4',
      icon: 'fas fa-chart-line',
      title: 'הטמעת מערכות וכלים פנימיים',
      description: 'בניית תשתיות עם Notion, CRM, ClickUp ועוד.',
      details: {
        includes: [
          'בניית מערכות ניהול ידע עם Notion',
          'הטמעת CRM וניהול לקוחות',
          'בניית תהליכי עבודה עם ClickUp/Asana',
          'אינטגרציה בין כלים שונים',
          'הדרכת צוותים בשימוש בכלים'
        ],
        suitableFor: 'עסקים שצריכים לייעל תהליכים פנימיים ולהגדיל פרודוקטיביות.'
      }
    },
    {
      id: 'service5',
      icon: 'fas fa-briefcase',
      title: 'ניהול מוצר חלקי / CPO זמני',
      description: 'אחריות אסטרטגית וניהולית ללא גיוס במשרה מלאה.',
      details: {
        includes: [
          'ניהול מוצר יומיומי וקבלת החלטות',
          'עבודה עם צוותי פיתוח ועיצוב',
          'ניהול תקציבים ותכנון משאבים',
          'דיווח למנהלים ומשקיעים',
          'העברת ידע לצוות פנימי'
        ],
        suitableFor: 'סטארטאפים שצריכים מנהל מוצר מנוסה אבל לא יכולים להרשות לעצמם CPO במשרה מלאה.'
      }
    }
  ];

  const toggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <section id={id} className="services-section">
      <div className="container">
        <h2 className="section-title">שירותים</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`service-card ${animatedItems.has(index) ? 'animate' : ''} ${expandedService === service.id ? 'active' : ''}`}
              ref={el => itemRefs.current[index] = el}
              onClick={() => toggleService(service.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-toggle">
                <i className={`fas fa-chevron-${expandedService === service.id ? 'up' : 'down'}`}></i>
              </div>
              {expandedService === service.id && (
                <div className="service-details">
                  <h4>מה כולל:</h4>
                  <ul>
                    {service.details.includes.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                  <p><strong>מתאים ל:</strong> {service.details.suitableFor}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
