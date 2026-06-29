import React, { useState, useEffect, useRef } from 'react';
import { translations } from './translations.js';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // ScrollSpy
      const sections = ['platform', 'products', 'usecases', 'faq', 'testimonials', 'contact'];
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
  const [activeProductTab, setActiveProductTab] = useState('prod-chatbot');
  const [activeUseCaseTab, setActiveUseCaseTab] = useState('uc-finance');
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

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
    company: '',
    product: '',
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
        success: `Thank you, ${formData.name}. Your request for "${formData.product}" evaluation has been received. Our Enterprise Solutions Team will contact you at ${formData.email} within 24 hours.`
      },
      fr: {
        processing: 'Traitement de la demande...',
        submitted: 'Demande envoyée',
        success: `Merci, ${formData.name}. Votre demande d'évaluation de "${formData.product}" a été reçue. Notre équipe de solutions d'entreprise vous contactera à ${formData.email} dans les 24 heures.`
      },
      nl: {
        processing: 'Aanvraag verwerken...',
        submitted: 'Aanvraag verzonden',
        success: `Dank je, ${formData.name}. Je aanvraag voor "${formData.product}"-evaluatie is ontvangen. Ons Enterprise Solutions-team neemt binnen 24 uur contact met je op via ${formData.email}.`
      },
      es: {
        processing: 'Procesando solicitud...',
        submitted: 'Solicitud enviada',
        success: `Gracias, ${formData.name}. Su solicitud de evaluación de "${formData.product}" ha sido recibida. Nuestro equipo de soluciones empresariales se comunicará con usted en ${formData.email} dentro de las 24 horas.`
      },
      pl: {
        processing: 'Przetwarzanie zapytania...',
        submitted: 'Zapytanie wysłane',
        success: `Dziękujemy, ${formData.name}. Twoje zgłoszenie o ocenę "${formData.product}" zostało odebrane. Nasz zespół Enterprise Solutions skontaktuje się z Tobą pod adresem ${formData.email} w ciągu 24 godzin.`
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
        company: '',
        product: '',
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
            <a href="#platform" className={`nav-link ${activeSection === 'platform' ? 'active' : ''}`} onClick={() => { setActiveSection('platform'); setIsMobileMenuOpen(false); }}>{t('nav.platform')}</a>
            <a href="#products" className={`nav-link ${activeSection === 'products' ? 'active' : ''}`} onClick={() => { setActiveSection('products'); setIsMobileMenuOpen(false); }}>{t('nav.products')}</a>
            <a href="#usecases" className={`nav-link ${activeSection === 'usecases' ? 'active' : ''}`} onClick={() => { setActiveSection('usecases'); setIsMobileMenuOpen(false); }}>{t('nav.usecases')}</a>
            <a href="#faq" className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`} onClick={() => { setActiveSection('faq'); setIsMobileMenuOpen(false); }}>{t('nav.faq')}</a>
            <a href="#testimonials" className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`} onClick={() => { setActiveSection('testimonials'); setIsMobileMenuOpen(false); }}>{t('nav.trust')}</a>
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
            <a href="#contact" className="btn btn-primary nav-btn">{t('nav.call')}</a>
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
              <a href="#contact" className="btn btn-primary">{t('hero.cta_call')}</a>
              <a href="#products" className="btn btn-secondary">{t('hero.cta_products')}</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="mockup-container">
              <div className="mockup-header">
                <span className="dot-red"></span>
                <span className="dot-yellow"></span>
                <span className="dot-green"></span>
                <div className="mockup-address">{t('hero.terminal_title')}</div>
              </div>
              <div className="mockup-body" ref={terminalBodyRef}>
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
              <div className="capability-icon">🤖</div>
              <h3 className="capability-title">{t('platform.card1_title')}</h3>
              <p className="capability-desc">{t('platform.card1_desc')}</p>
            </div>
            <div className="card">
              <div className="capability-icon">⚙️</div>
              <h3 className="capability-title">{t('platform.card2_title')}</h3>
              <p className="capability-desc">{t('platform.card2_desc')}</p>
            </div>
            <div className="card">
              <div className="capability-icon">🧠</div>
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
              <div className={`prod-tab ${activeProductTab === 'prod-chatbot' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-chatbot')}>
                <span className="prod-tab-title">{t('products.tab1')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
              <div className={`prod-tab ${activeProductTab === 'prod-voice' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-voice')}>
                <span className="prod-tab-title">{t('products.tab2')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
              <div className={`prod-tab ${activeProductTab === 'prod-crm' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-crm')}>
                <span className="prod-tab-title">{t('products.tab3')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
              <div className={`prod-tab ${activeProductTab === 'prod-email' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-email')}>
                <span className="prod-tab-title">{t('products.tab4')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
              <div className={`prod-tab ${activeProductTab === 'prod-social' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-social')}>
                <span className="prod-tab-title">{t('products.tab5')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
              <div className={`prod-tab ${activeProductTab === 'prod-saas' ? 'active' : ''}`} onClick={() => setActiveProductTab('prod-saas')}>
                <span className="prod-tab-title">{t('products.tab6')}</span>
                <span className="prod-tab-arrow">→</span>
              </div>
            </div>

            <div className="products-content">
              {/* Chatbots */}
              <div className={`prod-view ${activeProductTab === 'prod-chatbot' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon">💬</div>
                  <h3 className="prod-view-title">{t('products.view1_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view1_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check">✓</span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view1_feat1')}</h5>
                      <p>{t('products.view1_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check">✓</span>
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
                    <a href="#contact" className="btn btn-primary">{t('products.view_cta')}</a>
                  </div>
                </div>
              </div>

              {/* Voice */}
              <div className={`prod-view ${activeProductTab === 'prod-voice' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon">🎙️</div>
                  <h3 className="prod-view-title">{t('products.view2_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view2_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check">✓</span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view2_feat1')}</h5>
                      <p>{t('products.view2_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check">✓</span>
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
                    <a href="#contact" className="btn btn-primary">{t('products.view_cta')}</a>
                  </div>
                </div>
              </div>

              {/* CRM */}
              <div className={`prod-view ${activeProductTab === 'prod-crm' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon">🎯</div>
                  <h3 className="prod-view-title">{t('products.view3_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view3_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check">✓</span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view3_feat1')}</h5>
                      <p>{t('products.view3_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check">✓</span>
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
                    <a href="#platform" className="btn btn-secondary">{t('products.view_more')}</a>
                    <a href="#contact" className="btn btn-primary">{t('products.view_cta')}</a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className={`prod-view ${activeProductTab === 'prod-email' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon">✉️</div>
                  <h3 className="prod-view-title">{t('products.view4_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view4_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check">✓</span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view4_feat1')}</h5>
                      <p>{t('products.view4_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check">✓</span>
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
                    <a href="#contact" className="btn btn-primary">{t('products.view_cta')}</a>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className={`prod-view ${activeProductTab === 'prod-social' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon">📣</div>
                  <h3 className="prod-view-title">{t('products.view5_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view5_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check">✓</span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view5_feat1')}</h5>
                      <p>{t('products.view5_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check">✓</span>
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
                    <a href="#contact" className="btn btn-primary">{t('products.view_cta')}</a>
                  </div>
                </div>
              </div>

              {/* SaaS */}
              <div className={`prod-view ${activeProductTab === 'prod-saas' ? 'active' : ''}`}>
                <div className="prod-view-header">
                  <div className="prod-view-icon">🚀</div>
                  <h3 className="prod-view-title">{t('products.view6_title')}</h3>
                </div>
                <p className="prod-view-desc">{t('products.view6_desc')}</p>
                <div className="prod-view-details">
                  <div className="prod-detail-item">
                    <span className="prod-detail-check">✓</span>
                    <div className="prod-detail-text">
                      <h5>{t('products.view6_feat1')}</h5>
                      <p>{t('products.view6_feat1_desc')}</p>
                    </div>
                  </div>
                  <div className="prod-detail-item">
                    <span className="prod-detail-check">✓</span>
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
                    <a href="#contact" className="btn btn-primary">{t('products.view_cta')}</a>
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
      <section className="section section-alt">
        <div className="container">
          <div className="metrics-row">
            <div className="metric-card">
              <div className="metric-val"><span>↓</span> 60-80%</div>
              <div className="metric-lbl">{t('metrics.val1')}</div>
            </div>
            <div className="metric-card">
              <div className="metric-val"><span>⚡</span> 3x</div>
              <div className="metric-lbl">{t('metrics.val2')}</div>
            </div>
            <div className="metric-card">
              <div className="metric-val"><span>💰</span> 40%</div>
              <div className="metric-lbl">{t('metrics.val3')}</div>
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

            <div className="info-list">
              <div className="info-row">
                <div className="info-icon">✉️</div>
                <div>
                  <div className="info-label">{t('contact.inquiry')}</div>
                  <div className="info-val">support@digimabbleai.com</div>
                </div>
              </div>
              <div className="info-row">
                <div className="info-icon">🛡️</div>
                <div>
                  <div className="info-label">{t('contact.standards')}</div>
                  <div className="info-val">{t('contact.standards_val')}</div>
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
                  <label className="form-label" htmlFor="cf-product">{t('contact.label_product')}</label>
                  <select 
                    className="form-select" 
                    id="cf-product" 
                    required
                    value={formData.product}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>{t('contact.opt_select')}</option>
                    <option value="AI Chatbots">{t('contact.opt1')}</option>
                    <option value="AI Voice Bots">{t('contact.opt2')}</option>
                    <option value="AI CRM Integrations">{t('contact.opt3')}</option>
                    <option value="AI Email Management">{t('contact.opt4')}</option>
                    <option value="Custom SaaS Pipelines">{t('contact.opt5')}</option>
                  </select>
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
            <p>{t('footer.desc')}</p>
            <div className="social-links">
              <a href="#" className="social-icon">In</a>
              <a href="#" className="social-icon">X</a>
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
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>{t('footer.copy')}</p>
          <div className="footer-legal">
            <a href="#">{t('footer.gdpr')}</a>
            <a href="#">{t('footer.sla')}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
