import { useState } from 'react';
import { profile } from './profile.js';
import PortfolioPage from './PortfolioPage.jsx';

function ThemeIcon({ dark }) {
  return dark ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.3 15.2A8.7 8.7 0 0 1 8.8 3.7a.65.65 0 0 0-.78-.9A9.6 9.6 0 1 0 21.2 15.98a.65.65 0 0 0-.9-.78Z" />
    </svg>
  );
}

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function CompanyText({ text, company, url }) {
  const index = company ? text.indexOf(company) : -1;
  if (index === -1 || !url) return text;
  return <>
    {text.slice(0, index)}
    <a className="company-link" href={url} target="_blank" rel="noopener noreferrer">{company}</a>
    {text.slice(index + company.length)}
  </>;
}

function GitHubIcon() {
  return <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>;
}

function SectionHeading({ number, children, id }) {
  return <div className="section-heading"><span className="section-number" aria-hidden="true">{number}</span><h2 id={id}>{children}</h2></div>;
}

function LinkCard({ href, title, description, type }) {
  const external = !href.startsWith('/') || type === 'resume';
  return <a className={`link-card ${type}`} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
    <div className="card-art" aria-hidden="true">
      {type === 'portfolio' ? <div className="mini-browser">
        <div className="browser-bar"><i /><i /><i /></div>
        <div className="browser-page"><div className="mini-sidebar"><span /><span /><span /></div><div className="mini-content"><div className="mini-title" /><div className="mini-line" /><div className="mini-tiles"><i /><i /><i /></div></div></div>
      </div> : <div className="mini-document"><div className="document-heading" /><div className="document-line short" /><div className="document-rule" /><div className="document-line" /><div className="document-line" /><div className="document-line short" /></div>}
    </div>
    <div className="card-body"><div className="card-title"><h3>{title}</h3><Arrow /></div><p>{description}</p></div>
  </a>;
}

export default function App() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark');

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try { localStorage.setItem('personal-site-theme', next ? 'dark' : 'light'); } catch { /* Storage may be disabled. */ }
  }

  const themeToggle = <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`} title={`Switch to ${dark ? 'light' : 'dark'} mode`}>
    <ThemeIcon dark={dark} />
  </button>;

  if (/^\/portfolio(?:\/|$)/.test(window.location.pathname)) {
    return <PortfolioPage themeToggle={themeToggle} />;
  }

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <main id="main" className="profile">
      <section className="introduction" aria-labelledby="intro-heading">
        {/* <p className="eyebrow">A LITTLE CORNER OF THE INTERNET</p> */}
        <div className="intro-header">
          <h1 id="intro-heading">Hi, I’m {profile.name}<span className="accent">.</span></h1>
          {themeToggle}
        </div>
        <p className="bio">{profile.bio}</p>
        <p className="currently"><span className="status-dot" aria-hidden="true" /><span><CompanyText text={profile.current} company={profile.currentCompany} url={profile.currentCompanyUrl} /></span></p>
        {profile.incoming && <p className="currently upcoming"><span className="status-dot" aria-hidden="true" /><span><CompanyText text={profile.incoming} company={profile.incomingCompany} url={profile.incomingCompanyUrl} /></span></p>}
      </section>
      <section className="work-section" aria-labelledby="work-heading">
        <SectionHeading number="01" id="work-heading">Resume & portfolio</SectionHeading>
        <div className="work-grid">
          <LinkCard href={profile.resumeUrl} title="Resume" description="A little more about my background." type="resume" />
          <LinkCard href={profile.portfolioUrl} title={profile.portfolioTitle || 'Portfolio'} description={profile.portfolioDescription || 'Selected work, projects & experiments.'} type="portfolio" />
        </div>
      </section>
      <section className="elsewhere-section" aria-labelledby="elsewhere-heading">
        <SectionHeading number="02" id="elsewhere-heading">Elsewhere</SectionHeading>
        <div className="social-links">
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer"><span className="link-icon" aria-hidden="true"><GitHubIcon /></span><span className="social-name">GitHub<span className="social-detail">{profile.githubLabel}</span></span><Arrow /></a>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer"><span className="link-icon linkedin-icon" aria-hidden="true">in</span><span className="social-name">LinkedIn<span className="social-detail">Let’s connect</span></span><Arrow /></a>
        </div>
      </section>
      <section className="contact-section" aria-labelledby="contact-heading">
        <SectionHeading number="03" id="contact-heading">Say hello</SectionHeading>
        <div className="contact-content"><p>Want to get in touch?</p><div className="contact-links"><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<Arrow /></a>
          {profile.secondaryEmail && <a className="email-link secondary-email" href={`mailto:${profile.secondaryEmail}`}>{profile.secondaryEmail}<Arrow /></a>}
          {profile.phone && <a className="phone-link" href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}>{profile.phone}</a>}
        </div></div>
      </section>
    </main>
  </>;
}
