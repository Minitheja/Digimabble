import { translations } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
  
  // --- Translation Engine ---
  const getTranslation = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const setLanguage = (lang) => {
    if (!translations[lang]) return;

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update SEO title
    if (translations[lang].seo && translations[lang].seo.title) {
      document.title = translations[lang].seo.title;
    }

    // Update SEO description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && translations[lang].seo && translations[lang].seo.desc) {
      metaDesc.setAttribute('content', translations[lang].seo.desc);
    }

    // Translate standard text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = getTranslation(translations[lang], key);
      if (translation !== undefined) {
        el.textContent = translation;
      }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = getTranslation(translations[lang], key);
      if (translation !== undefined) {
        el.setAttribute('placeholder', translation);
      }
    });

    // Sync dropdowns
    document.querySelectorAll('.lang-select').forEach(select => {
      select.value = lang;
    });

    // Persist language
    localStorage.setItem('lang', lang);
  };

  // Bind change event to all language selectors
  document.querySelectorAll('.lang-select').forEach(select => {
    select.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  });

  // Determine initial language
  const savedLang = localStorage.getItem('lang');
  let defaultLang = 'en';
  if (savedLang) {
    defaultLang = savedLang;
  } else {
    const browserLang = navigator.language.slice(0, 2);
    if (translations[browserLang]) {
      defaultLang = browserLang;
    }
  }
  setLanguage(defaultLang);

  // --- Header Scroll Effect ---
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial run

  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    // Create mobile menu overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    const toggleScrollLock = (shouldLock) => {
      if (shouldLock) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    };

    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      overlay.classList.toggle('active');
      const spans = menuToggle.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        toggleScrollLock(true);
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        toggleScrollLock(false);
      }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        overlay.classList.remove('active');
        toggleScrollLock(false);
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });

    // Close menu when overlay is clicked
    overlay.addEventListener('click', () => {
      navMenu.classList.remove('open');
      overlay.classList.remove('active');
      toggleScrollLock(false);
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  }

  // --- Product Tabs Switcher ---
  const prodTabs = document.querySelectorAll('.prod-tab');
  const prodViews = document.querySelectorAll('.prod-view');

  prodTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      
      // Update active tabs
      prodTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active views
      prodViews.forEach(view => {
        if (view.id === target) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });
    });
  });

  // --- Use Cases Tabs Switcher ---
  const ucTabs = document.querySelectorAll('.uc-tab');
  const ucViews = document.querySelectorAll('.uc-view');

  ucTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');

      // Update active tabs
      ucTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active views
      ucViews.forEach(view => {
        if (view.id === target) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });
    });
  });

  // --- FAQ Accordion ---
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.faq-body');
      const isActive = item.classList.contains('active');

      // Close all other FAQs
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-body').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // --- Hero Terminal Logging Simulation ---
  const terminalBody = document.querySelector('.hero-visual .mockup-body');
  if (terminalBody) {
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

    let currentLogIndex = 0;

    const addTerminalLine = (log) => {
      const line = document.createElement('div');
      line.className = 'terminal-line';
      
      const prompt = document.createElement('span');
      prompt.className = 'terminal-prompt';
      prompt.textContent = '$';
      
      const content = document.createElement('span');
      content.textContent = log.text;
      if (log.type === 'success') {
        content.className = 'terminal-success';
      } else if (log.type === 'warning') {
        content.className = 'terminal-warning';
      }
      
      line.appendChild(prompt);
      line.appendChild(content);
      terminalBody.appendChild(line);
      
      // Auto scroll
      terminalBody.scrollTop = terminalBody.scrollHeight;

      // Limit log history length in browser to prevent memory leak
      if (terminalBody.children.length > 20) {
        terminalBody.removeChild(terminalBody.firstChild);
      }
    };

    // Run typewriter logger loop
    const runTerminalSim = () => {
      const nextLog = logs[currentLogIndex];
      addTerminalLine(nextLog);
      
      currentLogIndex = (currentLogIndex + 1) % logs.length;
      
      // Variable interval for organic-looking execution
      let interval = 1200;
      if (nextLog.text.startsWith('>>') || nextLog.text.includes('Workflow completed')) {
        interval = 3000; // Pause longer on events
      } else if (nextLog.type === 'success') {
        interval = 800; // Run successive actions faster
      }
      
      setTimeout(runTerminalSim, interval);
    };

    // Run initial logs instantly
    for (let i = 0; i < 5; i++) {
      addTerminalLine(logs[i]);
      currentLogIndex++;
    }
    
    setTimeout(runTerminalSim, 1500);
  }

  // --- Contact Form Submission ---
  const contactForm = document.getElementById('corporate-contact-form');
  const formStatus = document.getElementById('form-status-message');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Gather data
      const name = document.getElementById('cf-name').value;
      const email = document.getElementById('cf-email').value;
      const productSelect = document.getElementById('cf-product');
      const product = productSelect.options[productSelect.selectedIndex].text;
      
      // Simple client-side feedback transition
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      const currentLang = document.documentElement.lang || 'en';
      const msgMap = {
        en: {
          processing: 'Processing request...',
          submitted: 'Request Submitted',
          success: `Thank you, ${name}. Your request for "${product}" evaluation has been received. Our Enterprise Solutions Team will contact you at ${email} within 24 hours.`
        },
        fr: {
          processing: 'Traitement de la demande...',
          submitted: 'Demande envoyée',
          success: `Merci, ${name}. Votre demande d'évaluation de "${product}" a été reçue. Notre équipe de solutions d'entreprise vous contactera à ${email} dans les 24 heures.`
        },
        nl: {
          processing: 'Aanvraag verwerken...',
          submitted: 'Aanvraag verzonden',
          success: `Dank je, ${name}. Je aanvraag voor "${product}"-evaluatie is ontvangen. Ons Enterprise Solutions-team neemt binnen 24 uur contact met je op via ${email}.`
        },
        es: {
          processing: 'Procesando solicitud...',
          submitted: 'Solicitud enviada',
          success: `Gracias, ${name}. Su solicitud de evaluación de "${product}" ha sido recibida. Nuestro equipo de soluciones empresariales se comunicará con usted en ${email} dentro de las 24 horas.`
        },
        pl: {
          processing: 'Przetwarzanie zapytania...',
          submitted: 'Zapytanie wysłane',
          success: `Dziękujemy, ${name}. Twoje zgłoszenie o ocenę "${product}" zostało odebrane. Nasz zespół Enterprise Solutions skontaktuje się z Tobą pod adresem ${email} w ciągu 24 godzin.`
        }
      };
      const langMsgs = msgMap[currentLang] || msgMap.en;

      submitBtn.textContent = langMsgs.processing;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = langMsgs.submitted;
        formStatus.className = 'form-status success';
        formStatus.textContent = langMsgs.success;
        contactForm.reset();
      }, 1500);
    });
  }
});
