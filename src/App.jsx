import React, { useState, useEffect, useRef } from 'react';
import { translations } from './translations.js';
import {
  Bot, Sliders, Brain, Target, MessageSquare, Mail, Store,
  Calendar, Megaphone, Rocket, Mic, CalendarDays, Smartphone,
  Check, CheckCircle2, MapPin, Phone, X, ArrowUp
} from 'lucide-react';

export default function App() {
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
    let current = translations[lang];
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
    if (translations[lang]?.seo?.title) {
      document.title = translations[lang].seo.title;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && translations[lang]?.seo?.desc) {
      metaDesc.setAttribute('content', translations[lang].seo.desc);
    }
    try {
      localStorage.setItem('lang', lang);
    } catch (e) {
      // Ignore localStorage block
    }
  }, [lang]);


  // --- Scroll State & ScrollSpy ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 300);

      // ScrollSpy
      const sections = ['about', 'platform', 'products', 'usecases', 'faq', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 180; // Offset for header threshold

      if (window.scrollY < 100) {
        setActiveSection('');
        return;
      }

      let currentSection = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Mobile Drawer Menu ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const spansStyle = isMobileMenuOpen ? [
    { transform: 'rotate(45deg) translate(5px, 5px)' },
    { opacity: '0' },
    { transform: 'rotate(-45deg) translate(5px, -5px)' }
  ] : [{}, {}, {}];

  // --- Interactive Switchers ---
  const [activeProductTab, setActiveProductTab] = useState('prod-crm');
  const [activeUseCaseTab, setActiveUseCaseTab] = useState('uc-finance');
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  // --- Book Demo Modal ---
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({
    name: '', email: '', company: '', role: '', interest: '', employees: '', message: ''
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const handleDemoInput = (e) => {
    setDemoForm({ ...demoForm, [e.target.name]: e.target.value });
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setIsDemoModalOpen(false);
      setDemoSubmitted(false);
      setDemoForm({ name: '', email: '', company: '', role: '', interest: '', employees: '', message: '' });
    }, 2000);
  };

  // --- Terminal Simulation ---
  const logs = [
    { text: 'Initialising Digimabble Core Engine v2.4.0-enterprise...', type: 'info' },
    { text: 'Establishing secure connections to enterprise APIs...', type: 'info' },
    { text: 'Connection verified: CRM, Slack, Hubspot, Stripe [GDPR Compliant]', type: 'success' },
    { text: 'Starting workflow monitor: "Lead Capture & Onboarding"', type: 'info' },
    { text: 'Listening for webhook pulses on port 443...', type: 'info' },
    { text: '>> INBOUND WEBHOOK: New Enterprise Signup (Acme Corp, Tier: Enterprise)', type: 'warning' },
    { text: 'Triggering AI Agent "Agent-Leads-01" for routing...', type: 'info' },
    { text: 'Agent executing workflow: Fetch enrichment data...', type: 'info' },
    { text: 'Agent action: Enriched contact information via LinkedIn Graph API', type: 'success' },
    { text: 'Agent action: Classifying sector -> Healthcare. Priority -> High.', type: 'success' },
    { text: 'Agent action: Creating Hubspot Deal ID #92837...', type: 'success' },
    { text: 'Agent action: Dispatching Slack alert with customized pitch notes...', type: 'success' },
    { text: 'Agent action: Creating Calendar sync for solutions team onboarding...', type: 'success' },
    { text: 'Workflow completed. Manual steps replaced: 6. Duration: 1.84s.', type: 'success' },
    { text: 'System status: IDLE | Awaiting events...', type: 'info' }
  ];

  const [activeLogs, setActiveLogs] = useState([]);
  const terminalBodyRef = useRef(null);

  useEffect(() => {
    // Start with the first 5 logs
    setActiveLogs(logs.slice(0, 5));
    let currentLogIndex = 5;

    let timeoutId;
    const runTerminalSim = () => {
      const nextLog = logs[currentLogIndex];
      setActiveLogs(prev => {
        const updated = [...prev, nextLog];
        if (updated.length > 20) {
          updated.shift();
        }
        return updated;
      });

      currentLogIndex = (currentLogIndex + 1) % logs.length;

      let interval = 1200;
      if (nextLog.text.startsWith('>>') || nextLog.text.includes('Workflow completed')) {
        interval = 3000;
      } else if (nextLog.type === 'success') {
        interval = 800;
      }
      timeoutId = setTimeout(runTerminalSim, interval);
    };

    timeoutId = setTimeout(runTerminalSim, 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [activeLogs]);

  // --- Contact Form ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    submitting: false,
    submitted: false,
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id.replace('cf-', '')]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus({ submitting: true, submitted: false, message: '' });

    const msgMap = {
      en: {
        processing: 'Processing request...',
        submitted: 'Request Submitted',
        success: `Thank you, ${formData.name}. Your request has been received. Our Enterprise Solutions Team will contact you at ${formData.email} within 24 hours.`
      },
      fr: {
        processing: 'Traitement de la demande...',
        submitted: 'Demande envoyée',
        success: `Merci, ${formData.name}. Votre demande a été reçue. Notre équipe vous contactera à ${formData.email} dans les 24 heures.`
      },
      nl: {
        processing: 'Aanvraag verwerken...',
        submitted: 'Aanvraag verzonden',
        success: `Dank je, ${formData.name}. Je aanvraag is ontvangen. Ons team neemt binnen 24 uur contact met je op via ${formData.email}.`
      },
      es: {
        processing: 'Procesando solicitud...',
        submitted: 'Solicitud enviada',
        success: `Gracias, ${formData.name}. Su solicitud ha sido recibida. Nuestro equipo se comunicará con usted en ${formData.email} dentro de las 24 horas.`
      },
      pl: {
        processing: 'Przetwarzanie zapytania...',
        submitted: 'Zapytanie wysłane',
        success: `Dziękujemy, ${formData.name}. Twoje zgłoszenie zostało odebrane. Nasz zespół skontaktuje się z Tobą pod adresem ${formData.email} w ciągu 24 godzin.`
      }
    };

    const langMsgs = msgMap[lang] || msgMap.en;

    setTimeout(() => {
      setSubmitStatus({
        submitting: false,
        submitted: true,
        message: langMsgs.success
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    }, 1500);
  };

  const getSubmitButtonText = () => {
    const msgMap = {
      en: { processing: 'Processing request...', submitted: 'Request Submitted', default: 'Submit Inquiry' },
      fr: { processing: 'Traitement de la demande...', submitted: 'Demande envoyée', default: 'Soumettre la demande' },
      nl: { processing: 'Aanvraag verwerken...', submitted: 'Aanvraag verzonden', default: 'Verzoek indienen' },
      es: { processing: 'Procesando solicitud...', submitted: 'Solicitud enviada', default: 'Enviar consulta' },
      pl: { processing: 'Przetwarzanie zapytania...', submitted: 'Zapytanie wysłane', default: 'Prześlij zapytanie' }
    };
    const langMsgs = msgMap[lang] || msgMap.en;
    if (submitStatus.submitting) return langMsgs.processing;
    if (submitStatus.submitted) return langMsgs.submitted;
    return t('contact.submit') || langMsgs.default;
  };

  return (
    <>
      {/* Decorative Visual Redesign Elements */}
      <div className="grid-overlay"></div>
      <div className="glow-blob blob-1"></div>
      <div className="glow-blob blob-2"></div>
      <div className="glow-blob blob-3"></div>

      {/* HEADER */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#" className="logo" onClick={() => setActiveSection('')}>
            <img src="/assets/logo-colored.png" alt="DIGI MABBLE Logo" className="logo-img logo-colored" />
            <img src="/assets/logo-white.png" alt="DIGI MABBLE Logo" className="logo-img logo-white" />
          </a>

          <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <a href="#" className={`nav-link ${activeSection === 'home' || activeSection === '' ? 'active' : ''}`} onClick={() => { setActiveSection('home'); setIsMobileMenuOpen(false); }}>{t('nav.home')}</a>
            <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => { setActiveSection('about'); setIsMobileMenuOpen(false); }}>{t('nav.about')}</a>
            <a href="#platform" className={`nav-link ${activeSection === 'platform' ? 'active' : ''}`} onClick={() => { setActiveSection('platform'); setIsMobileMenuOpen(false); }}>{t('nav.platform')}</a>
            <a href="#products" className={`nav-link ${activeSection === 'products' ? 'active' : ''}`} onClick={() => { setActiveSection('products'); setIsMobileMenuOpen(false); }}>{t('nav.products')}</a>
            <a href="#usecases" className={`nav-link ${activeSection === 'usecases' ? 'active' : ''}`} onClick={() => { setActiveSection('usecases'); setIsMobileMenuOpen(false); }}>{t('nav.usecases')}</a>
            <a href="#testimonials" className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`} onClick={() => { setActiveSection('testimonials'); setIsMobileMenuOpen(false); }}>{t('nav.trust')}</a>
            <a href="#faq" className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`} onClick={() => { setActiveSection('faq'); setIsMobileMenuOpen(false); }}>{t('nav.faq')}</a>
            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => { setActiveSection('contact'); setIsMobileMenuOpen(false); }}>{t('nav.contact')}</a>
            
            <div className="nav-actions-mobile">
              <a href="#contact" className="btn btn-primary nav-btn" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.call')}</a>
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

      {/* MOBILE NAV OVERLAY */}
      <div className={`nav-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="section-tag">{t('hero.tag')}</span>
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.desc')}</p>
            <div className="hero-btns">
              <button className="btn btn-primary" onClick={() => setIsDemoModalOpen(true)}>{t('hero.cta_call')}</button>
              <a href="#products" className="btn btn-secondary">{t('hero.cta_products')}</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="mockup-container">
              <div className="mockup-terminal-header">
                <span className="dot-red"></span>
                <span className="dot-yellow"></span>
                <span className="dot-green"></span>
                <div className="mockup-address">{t('hero.terminal_title')}</div>
              </div>
              <div className="mockup-terminal-body" ref={terminalBodyRef}>
                {activeLogs.map((log, index) => (
                  <div className="terminal-line" key={index}>
                    <span className="terminal-prompt">$</span>
                    <span className={log.type === 'success' ? 'terminal-success' : log.type === 'warning' ? 'terminal-warning' : ''}>
                      {log.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP / TECH STACK */}
      <section className="trust-strip">
        <div className="container trust-content">
          <span className="trust-text">{t('tech.tag')}</span>
          <h2 className="tech-title">{t('tech.title')}</h2>

          <div className="marquee-container">
            {/* Row 1 (Scrolls Left) */}
            <div className="marquee-track track-1">
              <div className="marquee-item perplexity-item"><img src="/assets/perplexity.png" alt="Perplexity" /></div>
              <div className="marquee-item n8n-item"><img src="/assets/n8n-logo.png" alt="n8n" /></div>
              <div className="marquee-item elevenlabs-item"><img src="/assets/elevenlabs.png" alt="ElevenLabs" /></div>
              <div className="marquee-item whatsapp-item"><img src="/assets/whatsapp.png" alt="WhatsApp" /></div>
              <div className="marquee-item apify-item"><img src="/assets/apify-logo.png" alt="Apify" /></div>
              <div className="marquee-item chatgpt-item"><img src="/assets/chatgpt.png" alt="ChatGPT" /></div>
              <div className="marquee-item claude-item"><img src="/assets/claude.png" alt="Claude" /></div>
              <div className="marquee-item gemini-item"><img src="/assets/gemini.png" alt="Gemini" /></div>
              <div className="marquee-item copilot-item"><img src="/assets/copilot.png" alt="Microsoft Copilot" /></div>

              {/* Duplicates */}
              <div className="marquee-item perplexity-item"><img src="/assets/perplexity.png" alt="Perplexity" /></div>
              <div className="marquee-item n8n-item"><img src="/assets/n8n-logo.png" alt="n8n" /></div>
              <div className="marquee-item elevenlabs-item"><img src="/assets/elevenlabs.png" alt="ElevenLabs" /></div>
              <div className="marquee-item whatsapp-item"><img src="/assets/whatsapp.png" alt="WhatsApp" /></div>
              <div className="marquee-item apify-item"><img src="/assets/apify-logo.png" alt="Apify" /></div>
              <div className="marquee-item chatgpt-item"><img src="/assets/chatgpt.png" alt="ChatGPT" /></div>
              <div className="marquee-item claude-item"><img src="/assets/claude.png" alt="Claude" /></div>
              <div className="marquee-item gemini-item"><img src="/assets/gemini.png" alt="Gemini" /></div>
              <div className="marquee-item copilot-item"><img src="/assets/copilot.png" alt="Microsoft Copilot" /></div>
            </div>

            {/* Row 2 (Scrolls Right) */}
            <div className="marquee-track track-2">
              <div className="marquee-item figma-item"><img src="/assets/figma.png" alt="Figma" /></div>
              <div className="marquee-item canva-item"><img src="/assets/canva-ai.png" alt="Canva AI" /></div>
              <div className="marquee-item adobe-item"><img src="/assets/adobe-firefly.png" alt="Adobe Firefly" /></div>
              <div className="marquee-item midjourney-item"><img src="/assets/midjourney.png" alt="Midjourney" /></div>
              <div className="marquee-item retell-item"><img src="/assets/retell-ai.png" alt="Retell AI" /></div>
              <div className="marquee-item topaz-item"><img src="/assets/topaz.png" alt="Topaz Labs" /></div>
              <div className="marquee-item airtable-item"><img src="/assets/airtable.png" alt="Airtable" /></div>
              <div className="marquee-item remini-item"><img src="/assets/remini.png" alt="Remini" /></div>
              <div className="marquee-item trello-item"><img src="/assets/trello.png" alt="Trello" /></div>

              {/* Duplicates */}
              <div className="marquee-item figma-item"><img src="/assets/figma.png" alt="Figma" /></div>
              <div className="marquee-item canva-item"><img src="/assets/canva-ai.png" alt="Canva AI" /></div>
              <div className="marquee-item adobe-item"><img src="/assets/adobe-firefly.png" alt="Adobe Firefly" /></div>
              <div className="marquee-item midjourney-item"><img src="/assets/midjourney.png" alt="Midjourney" /></div>
              <div className="marquee-item retell-item"><img src="/assets/retell-ai.png" alt="Retell AI" /></div>
              <div className="marquee-item topaz-item"><img src="/assets/topaz.png" alt="Topaz Labs" /></div>
              <div className="marquee-item airtable-item"><img src="/assets/airtable.png" alt="Airtable" /></div>
              <div className="marquee-item remini-item"><img src="/assets/remini.png" alt="Remini" /></div>
              <div className="marquee-item trello-item"><img src="/assets/trello.png" alt="Trello" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="section section-alt">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag">{t('about.tag')}</span>
            <h2 className="section-title">{t('about.title')}</h2>
            <p className="section-subtitle">
              {t('about.subtitle1')}
              <br className="desktop-br" />
              {t('about.subtitle2')}
            </p>
          </div>

          <div className="about-visual-container">
            <div className="about-image-wrapper">
              <img src="/assets/team-photo.png" alt="Digi Mabble Team" className="about-team-img" />
            </div>

            <div className="about-actions-wrapper">
              <a 
                href="/about.html" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary about-view-more-btn"
                style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
              >
                {t('about.btn_more')}
              </a>
            </div>
          </div>

          <div className="about-stats-grid">
            <div className="about-stat-card">
              <div className="about-stat-num">{t('about.stat1_num')}</div>
              <div className="about-stat-lbl">{t('about.stat1_lbl')}</div>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-num">{t('about.stat2_num')}</div>
              <div className="about-stat-lbl">{t('about.stat2_lbl')}</div>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-num">{t('about.stat3_num')}</div>
              <div className="about-stat-lbl">{t('about.stat3_lbl')}</div>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-num">{t('about.stat4_num')}</div>
              <div className="about-stat-lbl">{t('about.stat4_lbl')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section id="platform" className="section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag">{t('platform.tag')}</span>
            <h2 className="section-title">{t('platform.title')}</h2>
            <p className="section-subtitle">{t('platform.subtitle')}</p>
          </div>

          <div className="capabilities-grid">
            <div className="card">
              <div className="capability-icon"><Bot size={28} /></div>
              <h3 className="capability-title">{t('platform.card1_title')}</h3>
              <p className="capability-desc">{t('platform.card1_desc')}</p>
            </div>
            <div className="card">
              <div className="capability-icon"><Sliders size={28} /></div>
              <h3 className="capability-title">{t('platform.card2_title')}</h3>
              <p className="capability-desc">{t('platform.card2_desc')}</p>
            </div>
            <div className="card">
              <div className="capability-icon"><Brain size={28} /></div>
              <h3 className="capability-title">{t('platform.card3_title')}</h3>
              <p className="capability-desc">{t('platform.card3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS DIRECTORY */}
      <section id="products" className="section section-alt">
        <div className="container">
          <div className="text-center mb-4">
            <span className="section-tag">{t('products.tag')}</span>
            <h2 className="section-title">{t('products.title')}</h2>
            <p className="section-subtitle">{t('products.subtitle')}</p>
          </div>

          <div className="products-layout">
                        <div className="products-nav">
              <div className={`prod-tab ${activeProductTab === 'prod-crm' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-crm')}>
                <span className="prod-tab-title">{t('products.tab1')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
              <div className={`prod-tab ${activeProductTab === 'prod-chatbot' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-chatbot')}>
                <span className="prod-tab-title">{t('products.tab2')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
              <div className={`prod-tab ${activeProductTab === 'prod-email' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-email')}>
                <span className="prod-tab-title">{t('products.tab3')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
              <div className={`prod-tab ${activeProductTab === 'prod-smallbiz' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-smallbiz')}>
                <span className="prod-tab-title">{t('products.tab4')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
              <div className={`prod-tab ${activeProductTab === 'prod-meeting' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-meeting')}>
                <span className="prod-tab-title">{t('products.tab5')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
              <div className={`prod-tab ${activeProductTab === 'prod-social' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-social')}>
                <span className="prod-tab-title">{t('products.tab6')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
              <div className={`prod-tab ${activeProductTab === 'prod-saas' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-saas')}>
                <span className="prod-tab-title">{t('products.tab7')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
              <div className={`prod-tab ${activeProductTab === 'prod-voice' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-voice')}>
                <span className="prod-tab-title">{t('products.tab8')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
              <div className={`prod-tab ${activeProductTab === 'prod-booking' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-booking')}>
                <span className="prod-tab-title">{t('products.tab9')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
              <div className={`prod-tab ${activeProductTab === 'prod-whatstele' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-whatstele')}>
                <span className="prod-tab-title">{t('products.tab10')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
            </div>

            <div className="products-content">
              {/* CRM */}
              <div className={`prod-view ${activeProductTab === 'prod-crm' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon"><Target size={24} /></div>
                  <h3 className="prod-view-title">{t('products.view1_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view1_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view1_feat1')}</h5>
                      <p>{t('products.view1_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view1_feat2')}</h5>
                      <p>{t('products.view1_feat2_desc')}</p>
                    </div>
                  </div>
                </div>
                <div className="prod-view-footer">
                  <div className="prod-view-meta">
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view1_stat1_num')}</div>
                      <div className="prod-meta-label">{t('products.view1_stat1_label')}</div>
                    </div>
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view1_stat2_num')}</div>
                      <div className="prod-meta-label">{t('products.view1_stat2_label')}</div>
                    </div>
                  </div>
                  <div className="prod-view-actions">
                    <a href="#platform" className="btn btn-secondary">{t('products.view_more')}</a>
                    <button className="btn btn-primary" onClick={() => setIsDemoModalOpen(true)}>{t('products.view_cta')}</button>
                  </div>
                </div>
              </div>

              {/* Chatbots */}
              <div className={`prod-view ${activeProductTab === 'prod-chatbot' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon"><MessageSquare size={24} /></div>
                  <h3 className="prod-view-title">{t('products.view2_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view2_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view2_feat1')}</h5>
                      <p>{t('products.view2_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view2_feat2')}</h5>
                      <p>{t('products.view2_feat2_desc')}</p>
                    </div>
                  </div>
                </div>
                <div className="prod-view-footer">
                  <div className="prod-view-meta">
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view2_stat1_num')}</div>
                      <div className="prod-meta-label">{t('products.view2_stat1_label')}</div>
                    </div>
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view2_stat2_num')}</div>
                      <div className="prod-meta-label">{t('products.view2_stat2_label')}</div>
                    </div>
                  </div>
                  <div className="prod-view-actions">
                    <a href="#platform" className="btn btn-secondary">{t('products.view_more')}</a>
                    <button className="btn btn-primary" onClick={() => setIsDemoModalOpen(true)}>{t('products.view_cta')}</button>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className={`prod-view ${activeProductTab === 'prod-email' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon"><Mail size={24} /></div>
                  <h3 className="prod-view-title">{t('products.view3_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view3_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view3_feat1')}</h5>
                      <p>{t('products.view3_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view3_feat2')}</h5>
                      <p>{t('products.view3_feat2_desc')}</p>
                    </div>
                  </div>
                </div>
                <div className="prod-view-footer">
                  <div className="prod-view-meta">
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view3_stat1_num')}</div>
                      <div className="prod-meta-label">{t('products.view3_stat1_label')}</div>
                    </div>
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view3_stat2_num')}</div>
                      <div className="prod-meta-label">{t('products.view3_stat2_label')}</div>
                    </div>
                  </div>
                  <div className="prod-view-actions">
                    <a href="/ai-email-management.html" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">{t('products.view_more')}</a>
                    <button className="btn btn-primary" onClick={() => setIsDemoModalOpen(true)}>{t('products.view_cta')}</button>
                  </div>
                </div>
              </div>

              {/* Small Business */}
              <div className={`prod-view ${activeProductTab === 'prod-smallbiz' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon"><Store size={24} /></div>
                  <h3 className="prod-view-title">{t('products.view4_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view4_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view4_feat1')}</h5>
                      <p>{t('products.view4_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view4_feat2')}</h5>
                      <p>{t('products.view4_feat2_desc')}</p>
                    </div>
                  </div>
                </div>
                <div className="prod-view-footer">
                  <div className="prod-view-meta">
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view4_stat1_num')}</div>
                      <div className="prod-meta-label">{t('products.view4_stat1_label')}</div>
                    </div>
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view4_stat2_num')}</div>
                      <div className="prod-meta-label">{t('products.view4_stat2_label')}</div>
                    </div>
                  </div>
                  <div className="prod-view-actions">
                    <a href="#platform" className="btn btn-secondary">{t('products.view_more')}</a>
                    <button className="btn btn-primary" onClick={() => setIsDemoModalOpen(true)}>{t('products.view_cta')}</button>
                  </div>
                </div>
              </div>

              {/* Meeting */}
              <div className={`prod-view ${activeProductTab === 'prod-meeting' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon"><Calendar size={24} /></div>
                  <h3 className="prod-view-title">{t('products.view5_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view5_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view5_feat1')}</h5>
                      <p>{t('products.view5_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view5_feat2')}</h5>
                      <p>{t('products.view5_feat2_desc')}</p>
                    </div>
                  </div>
                </div>
                <div className="prod-view-footer">
                  <div className="prod-view-meta">
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view5_stat1_num')}</div>
                      <div className="prod-meta-label">{t('products.view5_stat1_label')}</div>
                    </div>
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view5_stat2_num')}</div>
                      <div className="prod-meta-label">{t('products.view5_stat2_label')}</div>
                    </div>
                  </div>
                  <div className="prod-view-actions">
                    <a href="#platform" className="btn btn-secondary">{t('products.view_more')}</a>
                    <button className="btn btn-primary" onClick={() => setIsDemoModalOpen(true)}>{t('products.view_cta')}</button>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className={`prod-view ${activeProductTab === 'prod-social' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon"><Megaphone size={24} /></div>
                  <h3 className="prod-view-title">{t('products.view6_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view6_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view6_feat1')}</h5>
                      <p>{t('products.view6_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view6_feat2')}</h5>
                      <p>{t('products.view6_feat2_desc')}</p>
                    </div>
                  </div>
                </div>
                <div className="prod-view-footer">
                  <div className="prod-view-meta">
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view6_stat1_num')}</div>
                      <div className="prod-meta-label">{t('products.view6_stat1_label')}</div>
                    </div>
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view6_stat2_num')}</div>
                      <div className="prod-meta-label">{t('products.view6_stat2_label')}</div>
                    </div>
                  </div>
                  <div className="prod-view-actions">
                    <a href="#platform" className="btn btn-secondary">{t('products.view_more')}</a>
                    <button className="btn btn-primary" onClick={() => setIsDemoModalOpen(true)}>{t('products.view_cta')}</button>
                  </div>
                </div>
              </div>

              {/* SaaS */}
              <div className={`prod-view ${activeProductTab === 'prod-saas' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon"><Rocket size={24} /></div>
                  <h3 className="prod-view-title">{t('products.view7_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view7_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view7_feat1')}</h5>
                      <p>{t('products.view7_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view7_feat2')}</h5>
                      <p>{t('products.view7_feat2_desc')}</p>
                    </div>
                  </div>
                </div>
                <div className="prod-view-footer">
                  <div className="prod-view-meta">
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view7_stat1_num')}</div>
                      <div className="prod-meta-label">{t('products.view7_stat1_label')}</div>
                    </div>
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view7_stat2_num')}</div>
                      <div className="prod-meta-label">{t('products.view7_stat2_label')}</div>
                    </div>
                  </div>
                  <div className="prod-view-actions">
                    <a href="#platform" className="btn btn-secondary">{t('products.view_more')}</a>
                    <button className="btn btn-primary" onClick={() => setIsDemoModalOpen(true)}>{t('products.view_cta')}</button>
                  </div>
                </div>
              </div>

              {/* Voice */}
              <div className={`prod-view ${activeProductTab === 'prod-voice' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon"><Mic size={24} /></div>
                  <h3 className="prod-view-title">{t('products.view8_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view8_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view8_feat1')}</h5>
                      <p>{t('products.view8_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view8_feat2')}</h5>
                      <p>{t('products.view8_feat2_desc')}</p>
                    </div>
                  </div>
                </div>
                <div className="prod-view-footer">
                  <div className="prod-view-meta">
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view8_stat1_num')}</div>
                      <div className="prod-meta-label">{t('products.view8_stat1_label')}</div>
                    </div>
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view8_stat2_num')}</div>
                      <div className="prod-meta-label">{t('products.view8_stat2_label')}</div>
                    </div>
                  </div>
                  <div className="prod-view-actions">
                    <a href="#platform" className="btn btn-secondary">{t('products.view_more')}</a>
                    <button className="btn btn-primary" onClick={() => setIsDemoModalOpen(true)}>{t('products.view_cta')}</button>
                  </div>
                </div>
              </div>

              {/* Booking */}
              <div className={`prod-view ${activeProductTab === 'prod-booking' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon"><CalendarDays size={24} /></div>
                  <h3 className="prod-view-title">{t('products.view9_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view9_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view9_feat1')}</h5>
                      <p>{t('products.view9_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view9_feat2')}</h5>
                      <p>{t('products.view9_feat2_desc')}</p>
                    </div>
                  </div>
                </div>
                <div className="prod-view-footer">
                  <div className="prod-view-meta">
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view9_stat1_num')}</div>
                      <div className="prod-meta-label">{t('products.view9_stat1_label')}</div>
                    </div>
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view9_stat2_num')}</div>
                      <div className="prod-meta-label">{t('products.view9_stat2_label')}</div>
                    </div>
                  </div>
                  <div className="prod-view-actions">
                    <a href="#platform" className="btn btn-secondary">{t('products.view_more')}</a>
                    <button className="btn btn-primary" onClick={() => setIsDemoModalOpen(true)}>{t('products.view_cta')}</button>
                  </div>
                </div>
              </div>

              {/* Whatsapp & Telegram Bot */}
              <div className={`prod-view ${activeProductTab === 'prod-whatstele' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon"><Smartphone size={24} /></div>
                  <h3 className="prod-view-title">{t('products.view10_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view10_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view10_feat1')}</h5>
                      <p>{t('products.view10_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check"><Check size={16} /></span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view10_feat2')}</h5>
                      <p>{t('products.view10_feat2_desc')}</p>
                    </div>
                  </div>
                </div>
                <div className="prod-view-footer">
                  <div className="prod-view-meta">
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view10_stat1_num')}</div>
                      <div className="prod-meta-label">{t('products.view10_stat1_label')}</div>
                    </div>
                    <div className="prod-meta-stat">
                      <div className="prod-meta-num">{t('products.view10_stat2_num')}</div>
                      <div className="prod-meta-label">{t('products.view10_stat2_label')}</div>
                    </div>
                  </div>
                  <div className="prod-view-actions">
                    <a href="#platform" className="btn btn-secondary">{t('products.view_more')}</a>
                    <button className="btn btn-primary" onClick={() => setIsDemoModalOpen(true)}>{t('products.view_cta')}</button>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* USE CASES SECTION */}
      <section id="usecases" className="section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag">{t('usecases.tag')}</span>
            <h2 className="section-title">{t('usecases.title')}</h2>
            <p className="section-subtitle">{t('usecases.subtitle')}</p>
          </div>

          <div className="usecases-tabs-wrapper">
            <div className="usecases-tabs">
              <button className={`uc-tab ${activeUseCaseTab === 'uc-finance' ? 'active' : ''}`} onClick={() => setActiveUseCaseTab('uc-finance')}>{t('usecases.tab1')}</button>
              <button className={`uc-tab ${activeUseCaseTab === 'uc-health' ? 'active' : ''}`} onClick={() => setActiveUseCaseTab('uc-health')}>{t('usecases.tab2')}</button>
              <button className={`uc-tab ${activeUseCaseTab === 'uc-commerce' ? 'active' : ''}`} onClick={() => setActiveUseCaseTab('uc-commerce')}>{t('usecases.tab3')}</button>
              <button className={`uc-tab ${activeUseCaseTab === 'uc-ops' ? 'active' : ''}`} onClick={() => setActiveUseCaseTab('uc-ops')}>{t('usecases.tab4')}</button>
            </div>
          </div>

          <div className="usecases-container">
            {/* Finance */}
            <div className={`uc-view ${activeUseCaseTab === 'uc-finance' ? 'active' : ''}`}>
              <div className="uc-content">
                <h3>{t('usecases.finance_title')}</h3>
                <p>{t('usecases.finance_desc')}</p>
                <div className="uc-metric-highlight">{t('usecases.finance_metric')}</div>
                <a href="#contact" className="btn btn-secondary">{t('usecases.cta')}</a>
              </div>
              <div className="uc-visual">
                <div className="workflow-flow">
                  <div className="flow-node completed">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.finance_node1')}</span>
                  </div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node completed">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.finance_node2')}</span>
                  </div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node running">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.finance_node3')}</span>
                  </div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.finance_node4')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Healthcare */}
            <div className={`uc-view ${activeUseCaseTab === 'uc-health' ? 'active' : ''}`}>
              <div className="uc-content">
                <h3>{t('usecases.health_title')}</h3>
                <p>{t('usecases.health_desc')}</p>
                <div className="uc-metric-highlight">{t('usecases.health_metric')}</div>
                <a href="#contact" className="btn btn-secondary">{t('usecases.cta')}</a>
              </div>
              <div className="uc-visual">
                <div className="workflow-flow">
                  <div className="flow-node completed">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.health_node1')}</span>
                  </div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node completed">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.health_node2')}</span>
                  </div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node running">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.health_node3')}</span>
                  </div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.health_node4')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* E-Commerce */}
            <div className={`uc-view ${activeUseCaseTab === 'uc-commerce' ? 'active' : ''}`}>
              <div className="uc-content">
                <h3>{t('usecases.commerce_title')}</h3>
                <p>{t('usecases.commerce_desc')}</p>
                <div className="uc-metric-highlight">{t('usecases.commerce_metric')}</div>
                <a href="#contact" className="btn btn-secondary">{t('usecases.cta')}</a>
              </div>
              <div className="uc-visual">
                <div className="workflow-flow">
                  <div className="flow-node completed">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.commerce_node1')}</span>
                  </div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node completed">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.commerce_node2')}</span>
                  </div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node running">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.commerce_node3')}</span>
                  </div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.commerce_node4')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Operations */}
            <div className={`uc-view ${activeUseCaseTab === 'uc-ops' ? 'active' : ''}`}>
              <div className="uc-content">
                <h3>{t('usecases.ops_title')}</h3>
                <p>{t('usecases.ops_desc')}</p>
                <div className="uc-metric-highlight">{t('usecases.ops_metric')}</div>
                <a href="#contact" className="btn btn-secondary">{t('usecases.cta')}</a>
              </div>
              <div className="uc-visual">
                <div className="workflow-flow">
                  <div className="flow-node completed">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.ops_node1')}</span>
                  </div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node completed">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.ops_node2')}</span>
                  </div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node running">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.ops_node3')}</span>
                  </div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-node">
                    <span className="flow-node-status"></span>
                    <span>{t('usecases.ops_node4')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS SECTION */}
      <section id="metrics-section" className="section section-alt">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag">{t('metrics.tag')}</span>
            <h2 className="section-title">{t('metrics.title')}</h2>
            <p className="section-subtitle">{t('metrics.subtitle')}</p>
          </div>
          <div className="metrics-row">
            <div className="metric-card">
              <div className="metric-val"><span>↓</span> 60-80%</div>
              <div className="metric-lbl">{t('metrics.val1')}</div>
              <p className="metric-desc">{t('metrics.desc1')}</p>
            </div>
            <div className="metric-card">
              <div className="metric-val"><span>⚡</span> 3x</div>
              <div className="metric-lbl">{t('metrics.val2')}</div>
              <p className="metric-desc">{t('metrics.desc2')}</p>
            </div>
            <div className="metric-card">
              <div className="metric-val"><span>💰</span> 40%</div>
              <div className="metric-lbl">{t('metrics.val3')}</div>
              <p className="metric-desc">{t('metrics.desc3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag">{t('trust.tag')}</span>
            <h2 className="section-title">{t('trust.title')}</h2>
          </div>
          
          <div className="trust-grid">
            <div className="trust-interactive-card">
              <div className="trust-image-wrapper logo-wrapper">
                <img src="/assets/venue-amore-logo.png" alt="Venue Amore Integration" />
              </div>
              <div className="trust-content-wrapper">
                <h3>{t('trust.card1_name')}</h3>
                <p>{t('trust.card1_quote')}</p>
              </div>
            </div>

            <div className="trust-interactive-card">
              <div className="trust-image-wrapper">
                <img src="/assets/trust_abstract_cool_1781364072363.png" alt="Enterprise Analytics" />
              </div>
              <div className="trust-content-wrapper">
                <h3>{t('trust.card2_name')}</h3>
                <p>{t('trust.card2_quote')}</p>
              </div>
            </div>

            <div className="trust-interactive-card">
              <div className="trust-image-wrapper">
                <img src="/assets/trust_abstract_dynamic_1781364086355.png" alt="Customer Experience" />
              </div>
              <div className="trust-content-wrapper">
                <h3>{t('trust.card3_name')}</h3>
                <p>{t('trust.card3_quote')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS & PARTNERS */}
      <section className="partners-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="partners-title">{t('partners.title')}</h2>
            <p className="partners-subtitle">{t('partners.subtitle')}</p>
          </div>

          <div className="partners-marquee-container">
            <div className="partners-marquee-track">
              <div className="partner-card"><img src="/assets/anima_corpus.png" alt="Anima Corpus" /></div>
              <div className="partner-card"><img src="/assets/3m.png" alt="3M Invest" /></div>
              <div className="partner-card"><img src="/assets/client.png" alt="Agoria" /></div>
              <div className="partner-card"><img src="/assets/madello-logo.png" alt="Madello" /></div>
              <div className="partner-card"><img src="/assets/BECI-.png" alt="Beci" /></div>

              {/* Duplicates */}
              <div className="partner-card"><img src="/assets/anima_corpus.png" alt="Anima Corpus" /></div>
              <div className="partner-card"><img src="/assets/3m.png" alt="3M Invest" /></div>
              <div className="partner-card"><img src="/assets/client.png" alt="Agoria" /></div>
              <div className="partner-card"><img src="/assets/madello-logo.png" alt="Madello" /></div>
              <div className="partner-card"><img src="/assets/BECI-.png" alt="Beci" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="section section-alt">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag">{t('faq.tag')}</span>
            <h2 className="section-title">{t('faq.title')}</h2>
            <p className="section-subtitle">{t('faq.subtitle')}</p>
          </div>

          <div className="faq-list">
            {[0, 1, 2, 3, 4].map((index) => (
              <div className={`faq-item ${activeFaqIndex === index ? 'active' : ''}`} key={index}>
                <div className="faq-header" onClick={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)}>
                  <h3 className="faq-question">{t(`faq.q${index + 1}`)}</h3>
                  <span className="faq-icon">{activeFaqIndex === index ? '-' : '+'}</span>
                </div>
                <div 
                  className="faq-body" 
                  style={{ 
                    maxHeight: activeFaqIndex === index ? '250px' : '0px',
                    transition: 'max-height 0.35s ease'
                  }}
                >
                  <div className="faq-content">
                    {t(`faq.a${index + 1}`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / LEAD FORM */}
      <section id="contact" className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="section-tag">{t('contact.tag')}</span>
            <h3>{t('contact.title')}</h3>
            <p>{t('contact.desc')}</p>

            <div className="contact-details-groups">
              {/* Address Group */}
              <div className="contact-detail-group">
                <h4 className="contact-group-title">{t('contact.group_address')}</h4>
                <div className="contact-group-items">
                  <div className="contact-detail-item">
                    <span className="contact-item-icon">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
                      </svg>
                    </span>
                    <span className="contact-item-text">Avenue Eiffel 8, 1300 Wavre, Belgium.</span>
                  </div>
                  <div className="contact-detail-item">
                    <span className="contact-item-icon">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
                      </svg>
                    </span>
                    <span className="contact-item-text">Tartu mnt 67/1, 10115 Tallinn, Estonia.</span>
                  </div>
                </div>
              </div>

              {/* Development Centre Group */}
              <div className="contact-detail-group">
                <h4 className="contact-group-title">{t('contact.group_dev_centre')}</h4>
                <div className="contact-group-items">
                  <div className="contact-detail-item">
                    <span className="contact-item-icon">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
                      </svg>
                    </span>
                    <span className="contact-item-text">2nd floor, Deepa building, road, near VIT, Vellore 632014, India</span>
                  </div>
                </div>
              </div>

              {/* Send us an email Group */}
              <div className="contact-detail-group">
                <h4 className="contact-group-title">{t('contact.group_email')}</h4>
                <div className="contact-group-items">
                  <div className="contact-detail-item">
                    <span className="contact-item-icon">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 153.4-113 4.2-3.3 6.6-8.2 6.6-13.5V112c0-26.5-21.5-48-48-48H48c-26.5 0-48 21.5-48 48v40.1c0 5.3 2.4 10.2 6.6 13.5 10.7 8.3 20.7 16.8 153.4 113 16.8 12.2 50.2 41.8 73.4 41.4z"/>
                      </svg>
                    </span>
                    <span className="contact-item-text">info@digimabble.com</span>
                  </div>
                </div>
              </div>

              {/* Give us a call Group */}
              <div className="contact-detail-group">
                <h4 className="contact-group-title">{t('contact.group_phone')}</h4>
                <div className="contact-group-items">
                  <div className="contact-detail-item">
                    <span className="contact-item-icon">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M493.4 345.6l-93.9-47c-11.7-5.9-25.6-3.8-35.1 5.3l-46.2 46.2C247.9 313.7 198.3 264.1 162 193.8l46.2-46.2c9.1-9.5 11.2-23.4 5.3-35.1l-47-93.9C160.7 5.2 148.6 0 135.3 0H50.2C22.5 0 0 22.5 0 50.2c0 254.8 207 461.8 461.8 461.8 27.7 0 50.2-22.5 50.2-50.2V376.7c0-13.3-5.2-25.4-18.6-31.1z"/>
                      </svg>
                    </span>
                    <span className="contact-item-text">+32 467 85 99 60</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <form id="corporate-contact-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
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
              </div>
              <div className="form-row">
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
              </div>
              <div className="form-group form-group-full">
                <label className="form-label" htmlFor="cf-message">{t('contact.label_message')}</label>
                <textarea 
                  className="form-textarea" 
                  id="cf-message" 
                  placeholder={t('contact.ph_msg')}
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>{getSubmitButtonText()}</button>
              <div className={`form-status ${submitStatus.submitted ? 'success' : ''}`} style={{ display: submitStatus.submitted ? 'block' : 'none' }}>
                {submitStatus.message}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="#" className="logo mb-2">
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
              <a href="#platform">{t('footer.link_capabilities')}</a>
              <a href="#products">{t('footer.link_products')}</a>
              <a href="#usecases">{t('footer.link_usecases')}</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t('footer.col2')}</h4>
            <div className="footer-links">
              <a href="#faq">{t('footer.link_faq')}</a>
              <a href="#testimonials">{t('footer.link_clients')}</a>
              <a href="#contact">{t('footer.link_contact')}</a>
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
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {demoSubmitted ? (
              <div className="demo-success">
                <div className="demo-success-icon">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
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

      {/* Floating Action Buttons */}
      <div className="floating-actions">
        {showScrollTop && (
          <button 
            className="floating-btn scroll-top-btn" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          </button>
        )}
        <a 
          href="#contact" 
          className="floating-btn chatbot-btn" 
          aria-label="Contact Chatbot"
        >
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </a>
      </div>
    </>
  );
}
