import React, { useState, useEffect } from 'react';
import { translations } from './translations.js';
import { emailManagementTranslations } from './emailManagementTranslations.js';
import {
  Settings, FileText, BarChart3, ListChecks, Calendar, RefreshCw,
  Check, X, Link2, Sliders,
  ShieldCheck, Star, Mail
} from 'lucide-react';

export default function EmailManagementPage() {
  // --- Language State ---
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('lang') || 'en';
    } catch (e) {
      return 'en';
    }
  });

  const t = (key) => {
    const parts = key.split('.');
    
    // Check page-specific translations first
    let current = emailManagementTranslations[lang];
    let found = true;
    for (const part of parts) {
      if (current && current[part] !== undefined) {
        current = current[part];
      } else {
        found = false;
        break;
      }
    }
    if (found) return current;

    // Fall back to homepage translations
    current = translations[lang];
    for (const part of parts) {
      if (current && current[part] !== undefined) {
        current = current[part];
      } else {
        return key; // Fallback to key itself
      }
    }
    return current;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${t('title')} | Digimabble AI`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('hero.subtitle'));
    }
    try {
      localStorage.setItem('lang', lang);
    } catch (e) {
      // Ignore localStorage block
    }
  }, [lang]);

  // --- Scroll State ---
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Demo Booking Modal ---
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    message: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const field = id.replace('cf-', '');
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus({
      submitted: true,
      message: lang === 'fr' ? 'Merci! Votre demande a été reçue.' : 
               lang === 'nl' ? 'Bedankt! Uw aanvraag is ontvangen.' :
               lang === 'es' ? '¡Gracias! Su solicitud ha sido recibida.' :
               lang === 'pl' ? 'Dziękujemy! Twoje zgłoszenie zostało odebrane.' :
               'Thank you! Your request has been received.'
    });
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setSubmitStatus({ submitted: false, message: '' });
      setIsDemoModalOpen(false);
    }, 2000);
  };

  const getSubmitButtonText = () => {
    if (submitStatus.submitted) {
      return lang === 'fr' ? 'Envoi en cours...' : 
             lang === 'nl' ? 'Verzenden...' : 
             lang === 'es' ? 'Enviando...' : 
             lang === 'pl' ? 'Wysyłanie...' : 
             'Sending...';
    }
    return t('contact.submit');
  };

  return (
    <div className="about-page-wrapper">
      {/* Decorative Background Elements */}
      <div className="grid-overlay"></div>
      <div className="glow-blob blob-1"></div>
      <div className="glow-blob blob-2"></div>
      <div className="glow-blob blob-3"></div>

      {/* HEADER & NAVIGATION */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="/index.html" className="logo">
            <img src="/assets/logo-colored.png" alt="DIGI MABBLE Logo" className="logo-img logo-colored" />
            <img src="/assets/logo-white.png" alt="DIGI MABBLE Logo" className="logo-img logo-white" />
          </a>

          <div className="nav-actions">
            <div className="lang-selector-desktop">
              <select 
                className="lang-select desktop-lang-select" 
                value={lang} 
                onChange={(e) => setLang(e.target.value)}
                aria-label="Language Selector"
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="nl">NL</option>
                <option value="es">ES</option>
                <option value="pl">PL</option>
              </select>
            </div>
            <button className="btn btn-primary nav-btn" onClick={() => setIsDemoModalOpen(true)}>
              {t('nav.call')}
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="email-hero-section">
        <div className="container email-hero-grid">
          <div className="email-hero-content">
            <h1 className="email-hero-title">{t('hero.title')}</h1>
            <p className="email-hero-subtitle">{t('hero.subtitle')}</p>
          </div>

          {/* HERO IMAGE MOCKUP */}
          <div className="email-hero-mockup-img-wrap">
            <img src="/assets/ai-email-mockup.png" alt="AI Email Management Dashboard" className="email-hero-mockup-img" />
          </div>
        </div>
      </section>

      {/* OUR SOLUTION: EMAIL MANAGEMENT BOT */}
      <section className="email-solution-section">
        <div className="container">
          <div className="solution-header-wrap">
            <h2 className="email-section-title m-0">{t('solution.title')}</h2>
          </div>

          <div className="solution-cards-grid">
            {/* Card 1 */}
            <div className="solution-colored-card card-cyan">
              <div className="solution-card-icon-wrap">
                <Settings size={24} />
              </div>
              <h3>{t('solution.card1_title')}</h3>
              <p>{t('solution.card1_desc')}</p>
            </div>

            {/* Card 2 */}
            <div className="solution-colored-card card-green">
              <div className="solution-card-icon-wrap">
                <FileText size={24} />
              </div>
              <h3>{t('solution.card2_title')}</h3>
              <p>{t('solution.card2_desc')}</p>
            </div>

            {/* Card 3 */}
            <div className="solution-colored-card card-orange">
              <div className="solution-card-icon-wrap">
                <BarChart3 size={24} />
              </div>
              <h3>{t('solution.card3_title')}</h3>
              <p>{t('solution.card3_desc')}</p>
            </div>

            {/* Card 4 */}
            <div className="solution-colored-card card-purple">
              <div className="solution-card-icon-wrap">
                <ListChecks size={24} />
              </div>
              <h3>{t('solution.card4_title')}</h3>
              <p>{t('solution.card4_desc')}</p>
            </div>

            {/* Card 5 */}
            <div className="solution-colored-card card-copper">
              <div className="solution-card-icon-wrap">
                <Calendar size={24} />
              </div>
              <h3>{t('solution.card5_title')}</h3>
              <p>{t('solution.card5_desc')}</p>
            </div>

            {/* Card 6 */}
            <div className="solution-colored-card card-teal">
              <div className="solution-card-icon-wrap">
                <RefreshCw size={24} />
              </div>
              <h3>{t('solution.card6_title')}</h3>
              <p>{t('solution.card6_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE EMAIL CHALLENGE SECTION */}
      <section className="email-challenge-section">
        <div className="container">
          
          {/* Block 1: The Challenge */}
          <div className="benefits-split-container mb-120">
            <div className="split-mockup-column">
              {/* Inbox Mockup */}
              <div className="split-mockup-box yellow-glow">
                <div className="mockup-window-header">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                  <span className="window-title-text">Write an email</span>
                </div>
                <div className="mockup-window-content">
                  <div className="mockup-email-field"><strong>To:</strong> client@example.com</div>
                  <div className="mockup-email-field"><strong>Subject:</strong> Proposal Draft</div>
                  <div className="mockup-email-body">
                    <p>Hi, try my FREE 2026 email template mockup design!</p>
                    <p className="spelling-highlight">This structured approach makes the AI email <span className="highlight-red">genertor</span> tool more user friendly and customizable.</p>
                    <div className="spellcheck-popup">
                      <div className="popup-title">Correct your spelling</div>
                      <div className="popup-suggestion">generator</div>
                      <div className="popup-actions">
                        <span>Add to dictionary</span>
                        <span>Dismiss</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="split-text-column">
              <h2 className="split-section-title">{t('challenge.title')}</h2>
              <p className="split-section-subtitle">{t('challenge.subtitle')}</p>
              <ul className="split-checklist">
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p>{t('challenge.bullet1')}</p>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p>{t('challenge.bullet2')}</p>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p>{t('challenge.bullet3')}</p>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p>{t('challenge.bullet4')}</p>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p>{t('challenge.bullet5')}</p>
                </li>
              </ul>
              <p className="split-footer-text"><strong>{t('challenge.footer')}</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS BENEFITS SECTION */}
      <section className="email-benefits-section">
        <div className="container">

          {/* Block 2: Business Benefits */}
          <div className="benefits-split-container reverse">
            <div className="split-text-column">
              <h2 className="split-section-title">{t('benefits.title')}</h2>
              <p className="split-section-subtitle">{t('benefits.subtitle')}</p>
              <ul className="split-checklist">
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p>{t('benefits.bullet1')}</p>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p>{t('benefits.bullet2')}</p>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p>{t('benefits.bullet3')}</p>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p>{t('benefits.bullet4')}</p>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p>{t('benefits.bullet5')}</p>
                </li>
              </ul>
              <p className="split-footer-text"><strong>{t('benefits.footer')}</strong></p>
            </div>
            <div className="split-mockup-column">
              {/* Writer Mockup */}
              <div className="split-mockup-box purple-glow">
                <div className="mockup-window-header">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                  <span className="window-title-text">Compose Message</span>
                </div>
                <div className="mockup-window-content p-4">
                  <div className="mockup-editor-form-row">
                    <div className="form-select-col">
                      <label>Select language</label>
                      <select className="editor-select-box" disabled><option>English</option></select>
                    </div>
                    <div className="form-select-col">
                      <label>Select tone</label>
                      <select className="editor-select-box" disabled><option>Candid</option></select>
                    </div>
                  </div>
                  <div className="editor-keyword-box">
                    <label>Key points</label>
                    <div className="keyword-tag-input">thankyou, kind, work, goals, together, opportunity...</div>
                  </div>
                  <div className="editor-result-box">
                    <h6>Subject: Inquiry Regarding Website Design for Business</h6>
                    <p>Dear [Your Name],</p>
                    <p>Thank you for reaching out and for your kind words about our work. I'm delighted to hear that you're interested in collaborating on a new website design for your upcoming business fair...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* WHO IT'S FOR SECTION */}
      <section className="email-who-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="email-section-title">{t('who.title')}</h2>
            <p className="email-section-subtitle">{t('who.subtitle')}</p>
          </div>
          <div className="who-cards-grid">
            <div className="who-card">
              <span className="who-card-num">1</span>
              <p className="who-card-text">{t('who.item1_desc')}</p>
            </div>
            <div className="who-card">
              <span className="who-card-num">2</span>
              <p className="who-card-text">{t('who.item2_desc')}</p>
            </div>
            <div className="who-card">
              <span className="who-card-num">3</span>
              <p className="who-card-text">{t('who.item3_desc')}</p>
            </div>
            <div className="who-card">
              <span className="who-card-num">4</span>
              <p className="who-card-text">{t('who.item4_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="email-how-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="email-section-title">{t('how.title')}</h2>
          </div>
          <div className="how-cards-grid">
            {/* Step 1 */}
            <div className="how-step-card">
              <div className="how-step-icon icon-cyan">
                <Link2 size={24} />
              </div>
              <h4>{t('how.step1_title')}</h4>
              <p>{t('how.step1_desc')}</p>
            </div>

            {/* Step 2 */}
            <div className="how-step-card">
              <div className="how-step-icon icon-green">
                <Sliders size={24} />
              </div>
              <h4>{t('how.step2_title')}</h4>
              <p>{t('how.step2_desc')}</p>
            </div>

            {/* Step 3 */}
            <div className="how-step-card">
              <div className="how-step-icon icon-orange">
                <ShieldCheck size={24} />
              </div>
              <h4>{t('how.step3_title')}</h4>
              <p>{t('how.step3_desc')}</p>
            </div>

            {/* Step 4 */}
            <div className="how-step-card">
              <div className="how-step-icon icon-purple">
                <Star size={24} />
              </div>
              <h4>{t('how.step4_title')}</h4>
              <p>{t('how.step4_desc')}</p>
            </div>
          </div>
        </div>
      </section>





      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-col branding-col">
            <a href="/index.html" className="logo mb-2">
              <img src="/assets/logo-white.png" alt="DIGI MABBLE Logo" className="logo-img" />
            </a>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/digi-mabble" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/digimabbleproduct/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.facebook.com/people/Digi-Mabble/61582498770534/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t('footer.col1')}</h4>
            <div className="footer-links">
              <a href="/index.html#platform">{t('footer.link_capabilities')}</a>
              <a href="/index.html#products">{t('footer.link_products')}</a>
              <a href="/index.html#usecases">{t('footer.link_usecases')}</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t('footer.col2')}</h4>
            <div className="footer-links">
              <a href="/index.html#faq">{t('footer.link_faq')}</a>
              <a href="/index.html#testimonials">{t('footer.link_clients')}</a>
              <a href="/index.html#contact">{t('footer.link_contact')}</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t('footer.col3')}</h4>
            <div className="footer-links">
              <a href="/index.html#privacy">{t('footer.link_privacy')}</a>
              <a href="/index.html#terms">{t('footer.link_terms')}</a>
              <a href="/index.html#refund">{t('footer.link_refund')}</a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>{t('footer.copy')}</p>
        </div>
      </footer>

      {/* REQUEST DEMO MODAL */}
      {isDemoModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsDemoModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsDemoModalOpen(false)}>×</button>
            <h3 className="modal-title">{t('contact.title')}</h3>
            <p className="modal-subtitle">{t('contact.desc')}</p>

            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="cf-name">{t('contact.label_name')}</label>
                <input 
                  className="form-input" 
                  type="text" 
                  id="cf-name" 
                  required 
                  placeholder={t('contact.ph_name')}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cf-email">{t('contact.label_email')}</label>
                <input 
                  className="form-input" 
                  type="email" 
                  id="cf-email" 
                  required 
                  placeholder={t('contact.ph_email')}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cf-phone">{t('contact.label_phone_field')}</label>
                <input 
                  className="form-input" 
                  type="tel" 
                  id="cf-phone" 
                  required 
                  placeholder={t('contact.ph_phone')}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cf-company">{t('contact.label_company')}</label>
                <input 
                  className="form-input" 
                  type="text" 
                  id="cf-company" 
                  required 
                  placeholder={t('contact.ph_company')}
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cf-message">{t('contact.label_message')}</label>
                <textarea 
                  className="form-textarea" 
                  id="cf-message" 
                  placeholder={t('contact.ph_msg')}
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                {getSubmitButtonText()}
              </button>
              <div className={`form-status ${submitStatus.submitted ? 'success' : ''}`} style={{ display: submitStatus.submitted ? 'block' : 'none' }}>
                {submitStatus.message}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
