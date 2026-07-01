import React, { useState, useEffect } from 'react';
import { translations } from './translations.js';
import { aboutPageTranslations } from './aboutPageTranslations.js';
import {
  Eye, Award, Zap, BookOpen, Users2, GitFork, MessageSquare,
  Bot, BarChart3, Wrench, Check,
  X, ShieldCheck, CheckCircle2
} from 'lucide-react';

export default function AboutPage() {
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
    
    // First try about page specific translations
    let current = aboutPageTranslations[lang];
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

    // Fall back to main homepage translations
    current = translations[lang];
    for (const part of parts) {
      if (current && current[part] !== undefined) {
        current = current[part];
      } else {
        return key; // Return key if not found anywhere
      }
    }
    return current;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${t('title')} | Digimabble AI`;
    try {
      localStorage.setItem('lang', lang);
    } catch (e) {
      // Ignore storage block
    }
  }, [lang]);

  // --- Scroll State for Header ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Book Demo Modal State ---
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', email: '', company: '', role: '', interest: '', message: '' });

  const handleDemoInput = (e) => {
    setDemoForm({
      ...demoForm,
      [e.target.name]: e.target.value
    });
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setIsDemoModalOpen(false);
      setDemoSubmitted(false);
      setDemoForm({ name: '', email: '', company: '', role: '', interest: '', message: '' });
    }, 3000);
  };

  const spansStyle = [
    { transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: 'all 0.3s' },
    { opacity: isMobileMenuOpen ? 0 : 1, transition: 'all 0.3s' },
    { transform: isMobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none', transition: 'all 0.3s' }
  ];

  return (
    <>
      {/* Decorative Background Elements */}
      <div className="grid-overlay"></div>
      <div className="glow-blob blob-1"></div>
      <div className="glow-blob blob-2"></div>
      <div className="glow-blob blob-3"></div>

      {/* HEADER */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="/index.html" className="logo">
            <img src="/assets/logo-colored.png" alt="DIGI MABBLE Logo" className="logo-img logo-colored" />
            <img src="/assets/logo-white.png" alt="DIGI MABBLE Logo" className="logo-img logo-white" />
          </a>

          <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <a href="/index.html" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.home')}</a>
            <a href="/about.html" className="nav-link active" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.about')}</a>
            <a href="/index.html#platform" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.platform')}</a>
            <a href="/index.html#products" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.products')}</a>
            <a href="/index.html#usecases" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.usecases')}</a>
            <a href="/index.html#testimonials" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.trust')}</a>
            <a href="/index.html#faq" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.faq')}</a>
            <a href="/index.html#contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.contact')}</a>
            
            <div className="nav-actions-mobile">
              <button className="btn btn-primary nav-btn" onClick={() => { setIsMobileMenuOpen(false); setIsDemoModalOpen(true); }}>{t('nav.call')}</button>
            </div>
            
            <div className="lang-selector-mobile">
              <select className="lang-select mobile-lang-select" aria-label="Select Language" value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="nl">NL</option>
                <option value="es">ES</option>
                <option value="pl">PL</option>
              </select>
            </div>
          </nav>

          <div className="nav-actions">
            <div className="lang-selector-desktop">
              <select className="lang-select desktop-lang-select" aria-label="Select Language" value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="nl">NL</option>
                <option value="es">ES</option>
                <option value="pl">PL</option>
              </select>
            </div>
            <button className="btn btn-primary nav-btn" onClick={() => setIsDemoModalOpen(true)}>{t('nav.call')}</button>
          </div>

          <div className="header-mobile-actions">
            <div className="lang-selector-header">
              <select className="lang-select header-lang-select" aria-label="Select Language" value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="nl">NL</option>
                <option value="es">ES</option>
                <option value="pl">PL</option>
              </select>
            </div>
            <div className="menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span style={spansStyle[0]}></span>
              <span style={spansStyle[1]}></span>
              <span style={spansStyle[2]}></span>
            </div>
          </div>
        </div>
      </header>


      {/* OUR CORE SECTION */}
      <section className="about-core-section">
        <div className="container text-center">
          <span className="about-tag">{t('core.tag')}</span>
          <h2 className="about-section-title">{t('core.title')}</h2>

          <div className="core-cards-grid">
            {/* Vision */}
            <div className="core-card">
              <div className="core-card-icon-wrap">
                <Eye size={24} className="core-icon" />
              </div>
              <h3>{t('core.vision.title')}</h3>
              <p>{t('core.vision.desc')}</p>
            </div>

            {/* Mission */}
            <div className="core-card">
              <div className="core-card-icon-wrap">
                <Award size={24} className="core-icon" />
              </div>
              <h3>{t('core.mission.title')}</h3>
              <p>{t('core.mission.desc')}</p>
            </div>

            {/* Value */}
            <div className="core-card">
              <div className="core-card-icon-wrap">
                <Zap size={24} className="core-icon" />
              </div>
              <h3>{t('core.value.title')}</h3>
              <p>{t('core.value.desc')}</p>
            </div>

            {/* Story */}
            <div className="core-card">
              <div className="core-card-icon-wrap">
                <BookOpen size={24} className="core-icon" />
              </div>
              <h3>{t('core.story.title')}</h3>
              <p>{t('core.story.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="about-what-we-do">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="what-we-do-title">{t('whatWeDo.title')}</h2>
            <p className="what-we-do-subtitle">{t('whatWeDo.subtitle')}</p>
          </div>

          <div className="what-we-do-grid">
            {/* 1. CRM */}
            <div className="what-we-do-card">
              <div className="what-we-do-icon">
                <Users2 size={24} />
              </div>
              <p><strong>{t('whatWeDo.item1_title')}</strong> {t('whatWeDo.item1_desc')}</p>
            </div>

            {/* 2. Workflows */}
            <div className="what-we-do-card">
              <div className="what-we-do-icon">
                <GitFork size={24} />
              </div>
              <p><strong>{t('whatWeDo.item2_title')}</strong> {t('whatWeDo.item2_desc')}</p>
            </div>

            {/* 3. Messaging */}
            <div className="what-we-do-card">
              <div className="what-we-do-icon">
                <MessageSquare size={24} />
              </div>
              <p><strong>{t('whatWeDo.item3_title')}</strong> {t('whatWeDo.item3_desc')}</p>
            </div>

            {/* 4. Smart Bots */}
            <div className="what-we-do-card">
              <div className="what-we-do-icon">
                <Bot size={24} />
              </div>
              <p><strong>{t('whatWeDo.item4_title')}</strong> {t('whatWeDo.item4_desc')}</p>
            </div>

            {/* 5. Analytics */}
            <div className="what-we-do-card">
              <div className="what-we-do-icon">
                <BarChart3 size={24} />
              </div>
              <p><strong>{t('whatWeDo.item5_title')}</strong> {t('whatWeDo.item5_desc')}</p>
            </div>

            {/* 6. Maintenance */}
            <div className="what-we-do-card">
              <div className="what-we-do-icon">
                <Wrench size={24} />
              </div>
              <p><strong>{t('whatWeDo.item6_title')}</strong> {t('whatWeDo.item6_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM & CULTURE SECTION */}
      <section className="about-team-section">
        <div className="container">
          <div className="team-container-box">
            <div className="team-intro-container">
              <h2 className="team-title">{t('team.title')}</h2>
              <p className="team-desc">{t('team.desc')}</p>
              
              {/* Checklist Grid */}
              <ul className="team-checklist">
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <span className="checklist-text">{t('team.bullet1')}</span>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <span className="checklist-text">{t('team.bullet2')}</span>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <span className="checklist-text">{t('team.bullet3')}</span>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <span className="checklist-text">{t('team.bullet4')}</span>
                </li>
              </ul>

              <p className="team-footer-text"><em>{t('team.footer')}</em></p>
            </div>

            {/* Members Grid */}
            <div className="team-members-grid">
              {/* Manivannan Babu */}
              <div className="member-card">
                <div className="member-photo-wrap">
                  <img src="/assets/manivannan_babu.png" alt="Manivannan Babu" className="member-photo" />
                </div>
                <div className="member-info">
                  <h3>Manivannan Babu</h3>
                  <p>Founder &amp; Director</p>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="member-linkedin" aria-label="LinkedIn Profile">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Vasavi Arumugam */}
              <div className="member-card">
                <div className="member-photo-wrap">
                  <img src="/assets/vasavi_arumugam.png" alt="Vasavi Arumugam" className="member-photo" />
                </div>
                <div className="member-info">
                  <h3>Vasavi Arumugam</h3>
                  <p>Digital Marketing</p>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="member-linkedin" aria-label="LinkedIn Profile">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Maxime Timmerman */}
              <div className="member-card">
                <div className="member-photo-wrap">
                  <img src="/assets/maxime_timmerman.png" alt="Maxime Timmerman" className="member-photo" />
                </div>
                <div className="member-info">
                  <h3>Maxime Timmerman</h3>
                  <p>AI-Driven Sales</p>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="member-linkedin" aria-label="LinkedIn Profile">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Baptiste Lamand */}
              <div className="member-card">
                <div className="member-photo-wrap">
                  <img src="/assets/baptiste_lamand.png" alt="Baptiste Lamand" className="member-photo" />
                </div>
                <div className="member-info">
                  <h3>Baptiste Lamand</h3>
                  <p>Business Developer</p>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="member-linkedin" aria-label="LinkedIn Profile">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Karthiga */}
              <div className="member-card">
                <div className="member-photo-wrap">
                  <img src="/assets/karthiga.png" alt="Karthiga" className="member-photo" />
                </div>
                <div className="member-info">
                  <h3>Karthiga</h3>
                  <p>HR Specialist</p>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="member-linkedin" aria-label="LinkedIn Profile">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR JOURNEY SECTION */}
      <section className="about-journey-section">
        <div className="container">
          <div className="journey-layout-grid">
            <div className="journey-image-block">
              <img src="/assets/airport_journey.png" alt="Our Journey" className="journey-image" />
            </div>
            <div className="journey-text-block">
              <h2 className="journey-title">{t('journey.title')}</h2>
              <p className="journey-desc">{t('journey.desc')}</p>

              <ul className="journey-checklist">
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p><strong>{t('journey.bullet1_title')}</strong>{t('journey.bullet1_desc')}</p>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p><strong>{t('journey.bullet2_title')}</strong>{t('journey.bullet2_desc')}</p>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p><strong>{t('journey.bullet3_title')}</strong>{t('journey.bullet3_desc')}</p>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p><strong>{t('journey.bullet4_title')}</strong>{t('journey.bullet4_desc')}</p>
                </li>
              </ul>

              <p className="journey-footer-text">{t('journey.footer')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="about-why-choose-us">
        <div className="container">
          <h2 className="why-choose-us-title text-center">{t('whyChooseUs.title')}</h2>

          <div className="why-choose-us-grid">
            {/* Card 1 */}
            <div className="why-card">
              <div className="why-card-icon">
                <Users2 size={24} />
              </div>
              <h3>{t('whyChooseUs.card1_title')}</h3>
              <p>{t('whyChooseUs.card1_desc')}</p>
            </div>

            {/* Card 2 */}
            <div className="why-card">
              <div className="why-card-icon">
                <Zap size={24} />
              </div>
              <h3>{t('whyChooseUs.card2_title')}</h3>
              <p>{t('whyChooseUs.card2_desc')}</p>
            </div>

            {/* Card 3 */}
            <div className="why-card">
              <div className="why-card-icon">
                <GitFork size={24} />
              </div>
              <h3>{t('whyChooseUs.card3_title')}</h3>
              <p>{t('whyChooseUs.card3_desc')}</p>
            </div>

            {/* Card 4 */}
            <div className="why-card">
              <div className="why-card-icon">
                <ShieldCheck size={24} />
              </div>
              <h3>{t('whyChooseUs.card4_title')}</h3>
              <p>{t('whyChooseUs.card4_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR COMMITMENT SECTION */}
      <section className="about-commitment-section">
        <div className="container">
          <div className="commitment-layout-grid">
            <div className="commitment-text-block">
              <h2 className="commitment-title">{t('commitment.title')}</h2>
              <p className="commitment-desc">{t('commitment.desc')}</p>

              <ul className="commitment-checklist">
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p>{t('commitment.bullet1')}</p>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p>{t('commitment.bullet2')}</p>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p>{t('commitment.bullet3')}</p>
                </li>
                <li>
                  <span className="checklist-bullet">
                    <Check size={18} />
                  </span>
                  <p>{t('commitment.bullet4')}</p>
                </li>
              </ul>
            </div>
            <div className="commitment-image-block">
              <img src="/assets/office_meeting.png" alt="Our Commitment" className="commitment-image" />
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
              <a href="#">{t('footer.link_privacy')}</a>
              <a href="#">{t('footer.link_terms')}</a>
              <a href="#">{t('footer.link_refund')}</a>
              <a href="#">{t('footer.gdpr')}</a>
              <a href="#">{t('footer.sla')}</a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>{t('footer.copy')}</p>
        </div>
      </footer>

      {/* Book Demo Modal */}
      {isDemoModalOpen && (
        <div className="demo-modal-overlay" onClick={(e) => e.target === e.currentTarget && setIsDemoModalOpen(false)}>
          <div className="demo-modal">
            <button className="demo-modal-close" onClick={() => setIsDemoModalOpen(false)} aria-label="Close">
              <X size={20} />
            </button>

            {demoSubmitted ? (
              <div className="demo-success">
                <div className="demo-success-icon">
                  <CheckCircle2 size={48} className="text-green-500" />
                </div>
                <h3>Request Received!</h3>
                <p>Our team will reach out within 24 hours to schedule your personalized demo.</p>
              </div>
            ) : (
              <>
                <div className="demo-modal-header">
                  <h2>Schedule a Personalized Demo</h2>
                  <p>See how Digimabble AI automates your workflows, streamlines operations, and drives growth — tailored to your business.</p>
                </div>

                <form className="demo-form" onSubmit={handleDemoSubmit}>
                  <div className="demo-form-row">
                    <div className="demo-form-group">
                      <label htmlFor="demo-name">Full Name <span className="demo-required">*</span></label>
                      <input id="demo-name" name="name" type="text" required placeholder="Jane Smith" value={demoForm.name} onChange={handleDemoInput} />
                    </div>
                    <div className="demo-form-group">
                      <label htmlFor="demo-email">Work Email <span className="demo-required">*</span></label>
                      <input id="demo-email" name="email" type="email" required placeholder="jane@company.com" value={demoForm.email} onChange={handleDemoInput} />
                    </div>
                  </div>

                  <div className="demo-form-row">
                    <div className="demo-form-group">
                      <label htmlFor="demo-company">Company Name <span className="demo-required">*</span></label>
                      <input id="demo-company" name="company" type="text" required placeholder="Acme Corp" value={demoForm.company} onChange={handleDemoInput} />
                    </div>
                    <div className="demo-form-group">
                      <label htmlFor="demo-role">Role / Position</label>
                      <input id="demo-role" name="role" type="text" placeholder="Operations Manager" value={demoForm.role} onChange={handleDemoInput} />
                    </div>
                  </div>

                  <div className="demo-form-row">
                    <div className="demo-form-group demo-form-full" style={{gridColumn:'1/-1'}}>
                      <label htmlFor="demo-interest">AI Product of Interest <span className="demo-required">*</span></label>
                      <select id="demo-interest" name="interest" required value={demoForm.interest} onChange={handleDemoInput}>
                        <option value="" disabled>Select a product...</option>
                        <option value="crm">AI Powered CRM Automation</option>
                        <option value="chatbots">AI Chatbots &amp; Cross-Channel Bots</option>
                        <option value="email">AI Email Management</option>
                        <option value="small-biz">AI Solutions for Small Business</option>
                        <option value="meetings">Intelligent AI Meeting Agents</option>
                        <option value="social">AI Social Content &amp; Campaign Ops</option>
                        <option value="enterprise">Enterprise AI SaaS &amp; Custom Pipelines</option>
                        <option value="voice">Conversational AI Voice Bots</option>
                        <option value="bookings">Universal AI Appointment &amp; Bookings</option>
                        <option value="whatsapp">AI WhatsApp &amp; Telegram Bots</option>
                        <option value="multiple">Multiple Products</option>
                      </select>
                    </div>
                  </div>

                  <div className="demo-form-group demo-form-full">
                    <label htmlFor="demo-message">Tell us about your automation needs</label>
                    <textarea id="demo-message" name="message" rows="3" placeholder="Describe the workflow or operational challenge you want to solve..." value={demoForm.message} onChange={handleDemoInput}></textarea>
                  </div>

                  <button type="submit" className="demo-submit-btn">Book My Demo →</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
