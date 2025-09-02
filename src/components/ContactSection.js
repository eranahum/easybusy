import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './ContactSection.css';

const ContactSection = ({ id }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [sectionRef, isIntersecting] = useIntersectionObserver();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section id={id} className="contact-section" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title fade-in-up ${isIntersecting ? 'animate' : ''}`}>צור קשר</h2>
        <div className="contact-content">
          <div className={`contact-info fade-in-up ${isIntersecting ? 'animate' : ''}`}>
            <h3>בואו נדבר על הפרויקט שלכם</h3>
            <p>אני כאן כדי לעזור לכם להפוך את החזון שלכם למציאות. בואו נדבר על היעדים שלכם ואיך אני יכול לעזור.</p>
            <div className="contact-methods">
              <div className="contact-method">
                <i className="fas fa-envelope"></i>
                <div>
                  <h4>אימייל</h4>
                  <p>info@easybusy.com</p>
                </div>
              </div>
              <div className="contact-method">
                <i className="fas fa-phone"></i>
                <div>
                  <h4>טלפון</h4>
                  <p>+972-50-123-4567</p>
                </div>
              </div>
              <div className="contact-method">
                <i className="fas fa-calendar-alt"></i>
                <div>
                  <h4>תיאום פגישה</h4>
                  <a href="https://calendly.com/your-calendly-link" target="_blank" rel="noopener noreferrer">
                    קבע פגישה חינמית
                  </a>
                </div>
              </div>
            </div>
          </div>
          <form className={`contact-form fade-in-up ${isIntersecting ? 'animate' : ''}`} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">שם מלא *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">אימייל *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">חברה</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">הודעה *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              <i className="fas fa-paper-plane"></i>
              שלח הודעה
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
