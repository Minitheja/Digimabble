import React, { useEffect } from 'react';
import './crm-style.css';

export default function AiCrm({ setCurrentPage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "AI CRM - digimabbleai.com";
  }, []);

  const handleCtaClick = (e) => {
    if (e) e.preventDefault();
    setCurrentPage('home');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // SVGs from original site
  const checkIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="crm-check-svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.52032 4.14585C8.292 4.08427 9.02459 3.78082 9.61379 3.2787C10.9888 2.10697 13.011 2.10697 14.386 3.2787C14.9752 3.78082 15.7078 4.08427 16.4795 4.14585C18.2803 4.28955 19.7103 5.71953 19.854 7.52032C19.9155 8.292 20.219 9.02459 20.7211 9.61379C21.8928 10.9888 21.8928 13.011 20.7211 14.386C20.219 14.9752 19.9155 15.7078 19.854 16.4795C19.7103 18.2803 18.2803 19.7103 16.4795 19.854C15.7078 19.9155 14.9752 20.219 14.386 20.7211C13.011 21.8928 10.9888 21.8928 9.61379 20.7211C9.02459 20.219 8.292 19.9155 7.52032 19.854C5.71953 19.7103 4.28955 18.2803 4.14585 16.4795C4.08427 15.7078 3.78082 14.9752 3.2787 14.386C2.10697 13.011 2.10697 10.9888 3.2787 9.61379C3.78082 9.02459 4.08427 8.292 4.14585 7.52032C4.28955 5.71953 5.71953 4.28955 7.52032 4.14585ZM16.4484 10.4484C16.9171 9.9798 16.9171 9.22 16.4484 8.75137C15.9798 8.28275 15.22 8.28275 14.7514 8.75137L10.7999 12.7028L9.24843 11.1514C8.7798 10.6827 8.02 10.6827 7.55137 11.1514C7.08275 11.62 7.08275 12.3798 7.55137 12.8484L9.95137 15.2484C10.42 15.7171 11.1798 15.7171 11.6484 15.2484L16.4484 10.4484Z" fill="currentColor"></path>
    </svg>
  );

  const svgConnect = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 70 70" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M35 8.70058L23.3333 0V23.3333H0L8.70058 35L1.01993e-06 46.6665H23.3333V23.3333H46.6665V0L35 8.70058ZM61.2994 35L70 23.3334H46.6665V46.6665H23.3333V70L35 61.2994L46.6665 70V46.6665H70L61.2994 35Z" fill="currentColor"></path>
    </svg>
  );

  const svgTrain = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 70 70" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 55.4417C16.155 50.3359 19.6652 53.8457 14.5591 70C23.9937 53.8457 46.0065 53.8457 55.441 70C50.3384 53.8457 53.8489 50.3359 70 55.4417C53.8489 46.0075 53.8489 23.9961 70 14.5621C53.8489 19.6641 50.3384 16.1541 55.441 0C46.0065 16.1541 23.9937 16.1541 14.5591 0C19.6652 16.1541 16.155 19.6641 0 14.5621C16.155 23.9961 16.155 46.0075 0 55.4417ZM35 47.95C42.1522 47.95 47.95 42.1522 47.95 35C47.95 27.8479 42.1522 22.05 35 22.05C27.8479 22.05 22.05 27.8479 22.05 35C22.05 42.1522 27.8479 47.95 35 47.95Z" fill="currentColor"></path>
    </svg>
  );

  const svgOptimize = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 70 70" fill="none">
      <g clipPath="url(#clip0_1_3373)">
        <path d="M54.6224 50.3776L39.2444 35L54.6224 19.6223L70 35L54.6224 50.3776ZM15.3777 50.3776L0 35L15.3777 19.6223L30.7555 35L15.3777 50.3776ZM35 70L19.6223 54.6224L35 39.2444L50.3776 54.6224L35 70ZM35 30.7555L19.6223 15.3777L35 0L50.3776 15.3777L35 30.7555Z" fill="currentColor"></path>
      </g>
      <defs>
        <clipPath id="clip0_1_3373">
          <rect width="70" height="70" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div className="crm-page-wrapper">
      {/* 1. HERO SECTION */}
      <section className="crm-hero-section">
        <div className="crm-container crm-hero-grid">
          <div className="crm-hero-content">
            <h1 className="crm-hero-title">
              Transform Customer Relationships with AI Powered CRM Automation
            </h1>
            <p className="crm-hero-subtitle">
              Empower your CRM with AI to streamline leads, enhance engagement, and boost customer retention, all on a unified, data driven platform.
            </p>
            <div className="crm-hero-actions">
              <a href="#contact" className="crm-btn crm-btn-primary" onClick={handleCtaClick}>
                Talk to an Expert
              </a>
            </div>
          </div>
          <div className="crm-hero-visual">
            <div className="crm-mockup-frame">
              <img 
                src="/assets/hero-dashboard.png" 
                alt="AI CRM Dashboard Mockup" 
                className="crm-mockup-img" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. GAME CHANGER SECTION */}
      <section className="crm-section crm-bg-sand">
        <div className="crm-container">
          <div className="crm-section-header crm-max-w-medium">
            <h2 className="crm-section-title">Why AI Powered CRM is a Game Changer</h2>
            <p className="crm-section-desc">
              In today’s fast-paced business environment, customer expectations are constantly evolving. Traditional CRM systems, relying on manual processes and static records, struggle to keep up. That’s where AI makes the difference. By integrating machine learning, predictive analytics, and automation directly into your CRM workflow, your organization can:
            </p>
          </div>
          <div className="crm-checklist-grid">
            <div className="crm-checklist-item">
              <div className="crm-checklist-icon">{checkIcon}</div>
              <div>
                <h4 className="crm-checklist-title">Anticipate Customer Needs</h4>
                <p className="crm-checklist-text">Predict behaviors and preferences instead of just reacting to them.</p>
              </div>
            </div>
            <div className="crm-checklist-item">
              <div className="crm-checklist-icon">{checkIcon}</div>
              <div>
                <h4 className="crm-checklist-title">Automate Routine Tasks</h4>
                <p className="crm-checklist-text">Free your team from repetitive work, allowing focus on strategic initiatives.</p>
              </div>
            </div>
            <div className="crm-checklist-item">
              <div className="crm-checklist-icon">{checkIcon}</div>
              <div>
                <h4 className="crm-checklist-title">Gain Real-Time Insights</h4>
                <p className="crm-checklist-text">Access a complete 360° view across sales, service, and marketing.</p>
              </div>
            </div>
            <div className="crm-checklist-item">
              <div className="crm-checklist-icon">{checkIcon}</div>
              <div>
                <h4 className="crm-checklist-title">Boost Conversions and Loyalty</h4>
                <p className="crm-checklist-text">Drive deeper engagement, stronger conversions, and superior customer relationships.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES GRID SECTION */}
      <section className="crm-section">
        <div className="crm-container">
          <div className="crm-section-header">
            <h2 className="crm-section-title">Intelligent CRM to Transform Your Customer Experience</h2>
            <p className="crm-section-desc">
              Our platform combines advanced AI with a robust CRM infrastructure, delivering a scalable, secure, and high-performance enterprise solution.
            </p>
          </div>

          <div className="crm-cards-grid">
            {/* Card 1 */}
            <div className="crm-feature-card">
              <div className="crm-card-num">01</div>
              <h3 className="crm-card-title">Predictive Lead Scoring & Prioritisation</h3>
              <p className="crm-card-text">
                Using AI models trained on real time and historical data, we automatically score your leads. This ensures your sales team focuses only on the highest value opportunities, maximizing efficiency and deal closure rates.
              </p>
            </div>
            {/* Card 2 */}
            <div className="crm-feature-card">
              <div className="crm-card-num">02</div>
              <h3 className="crm-card-title">Enterprise Security & Compliance</h3>
              <p className="crm-card-text">
                Built to meet strict data protection standards, our solution keeps your customer data secure. We handle information ethically at every step, giving you peace of mind and compliance confidence.
              </p>
            </div>
            {/* Card 3 */}
            <div className="crm-feature-card">
              <div className="crm-card-num">03</div>
              <h3 className="crm-card-title">Automated Engagement & Follow up</h3>
              <p className="crm-card-text">
                Triggered workflows respond to events like emails, chat messages, calls, or website visits. They act instantly to engage every interaction. This ensures no lead or customer is ever missed. Maximize follow ups.
              </p>
            </div>
            {/* Card 4 */}
            <div className="crm-feature-card">
              <div className="crm-card-num">04</div>
              <h3 className="crm-card-title">Seamless Integrations & Scalability</h3>
              <p className="crm-card-text">
                Our CRM seamlessly connects with your existing systems and tools. Enable a smooth transition to next-generation operations. No disruptions, downtime, or workflow interruptions.
              </p>
            </div>
            {/* Card 5 */}
            <div className="crm-feature-card">
              <div className="crm-card-num">05</div>
              <h3 className="crm-card-title">360° Customer Profile & Journey Mapping</h3>
              <p className="crm-card-text">
                Unified data from all touchpoints sales, marketing, and service provides a complete view of every client. Track interactions and engagement across the entire lifecycle. Make informed decisions to boost retention and growth.
              </p>
            </div>
            {/* Card 6 */}
            <div className="crm-feature-card">
              <div className="crm-card-num">06</div>
              <h3 className="crm-card-title">Personalised Customer Interactions</h3>
              <p className="crm-card-text">
                Intelligent segmentation and content-recommendation engines tailor every outreach to each prospect. Make your communications more relevant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BENEFITS & WHO IT'S FOR SPLIT SECTION */}
      <section className="crm-section crm-bg-sand">
        <div className="crm-container crm-split-grid">
          {/* Left Column: Business Benefits */}
          <div className="crm-split-col">
            <h2 className="crm-split-title">Business Benefits</h2>
            <p className="crm-split-subtitle">By deploying an AI-powered CRM, organizations can typically realize:</p>
            <ul className="crm-bullet-list">
              <li>
                <span className="crm-list-bullet">{checkIcon}</span>
                <span><strong>Faster Deal Cycles & Conversions:</strong> Close deals more quickly with smarter lead management.</span>
              </li>
              <li>
                <span className="crm-list-bullet">{checkIcon}</span>
                <span><strong>Reduced Operational Overhead:</strong> Automate manual tasks to save time and resources.</span>
              </li>
              <li>
                <span className="crm-list-bullet">{checkIcon}</span>
                <span><strong>Enhanced Customer Satisfaction:</strong> Engage proactively to build loyalty and improve experiences.</span>
              </li>
              <li>
                <span className="crm-list-bullet">{checkIcon}</span>
                <span><strong>Better Team Alignment:</strong> Connect sales, marketing, and service teams for seamless collaboration.</span>
              </li>
              <li>
                <span className="crm-list-bullet">{checkIcon}</span>
                <span><strong>Accurate Forecasting & Insights:</strong> Make smarter strategic decisions with reliable data.</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Who It's For */}
          <div className="crm-split-col">
            <h2 className="crm-split-title">Who It’s For</h2>
            <p className="crm-split-subtitle">Our solution is ideal for businesses that:</p>
            <ul className="crm-bullet-list">
              <li>
                <span className="crm-list-bullet">{checkIcon}</span>
                <span><strong>Manage High Volumes of Interactions:</strong> Handle large numbers of leads and contacts efficiently.</span>
              </li>
              <li>
                <span className="crm-list-bullet">{checkIcon}</span>
                <span><strong>Operate Across Multiple Channels:</strong> Require unified data across web, email, chat, and phone.</span>
              </li>
              <li>
                <span className="crm-list-bullet">{checkIcon}</span>
                <span><strong>Aim for Proactive Engagement:</strong> Move from reactive client management to insight-driven triggers.</span>
              </li>
              <li>
                <span className="crm-list-bullet">{checkIcon}</span>
                <span><strong>Need Enterprise-Grade Reliability:</strong> Demand top-tier security, compliance, and dependability.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION (TIMELINE CARDS) */}
      <section className="crm-section">
        <div className="crm-container">
          <div className="crm-section-header crm-center-header">
            <h2 className="crm-section-title">How It Works</h2>
            <p className="crm-section-desc">
              We guide you through onboarding, customization, and continuous tuning for optimal workflow performance.
            </p>
          </div>
          <div className="crm-timeline-row">
            {/* Step 1 */}
            <div className="crm-timeline-card">
              <div className="crm-timeline-icon-box">{svgConnect}</div>
              <h3 className="crm-timeline-title">Connect & Onboard</h3>
              <p className="crm-timeline-text">
                We integrate your existing data sources and CRM systems. Map complete customer journeys and data flows. Gain a clear, unified view of every interaction.
              </p>
            </div>
            {/* Step 2 */}
            <div className="crm-timeline-card">
              <div className="crm-timeline-icon-box crm-color-orange">{svgTrain}</div>
              <h3 className="crm-timeline-title">Train & Configure</h3>
              <p className="crm-timeline-text">
                Customize workflows, lead-scoring models, and engagement triggers. Align them with your business logic and objectives.
              </p>
            </div>
            {/* Step 3 */}
            <div className="crm-timeline-card">
              <div className="crm-timeline-icon-box">{svgOptimize}</div>
              <h3 className="crm-timeline-title">Activate & Optimise</h3>
              <p className="crm-timeline-text">
                Launch intelligent, AI-driven processes and workflows. Monitor performance closely in real time using interactive dashboards. Continuously refine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER SECTION */}
      <section className="crm-cta-banner">
        <div className="crm-container crm-cta-inner">
          <h2 className="crm-cta-title">Experience AI CRM Today</h2>
          <p className="crm-cta-text">
            Transform your CRM with AI. Schedule a personalized demo today to improve customer engagement, streamline operations, and boost growth.
          </p>
          <a href="#contact" className="crm-btn crm-btn-secondary" onClick={handleCtaClick}>
            Talk to an Expert
          </a>
        </div>
      </section>
    </div>
  );
}
