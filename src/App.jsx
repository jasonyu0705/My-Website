import { useEffect, useState } from 'react';
import { profile } from './profile.js';

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

function SectionHeading({ number, children, id }) {
  return <div className="section-heading"><span className="section-number" aria-hidden="true">{number}</span><h2 id={id}>{children}</h2></div>;
}

function LinkCard({ href, title, description, type }) {
  return <a className={`link-card ${type}`} href={href} target="_blank" rel="noopener noreferrer">
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

  useEffect(() => { document.title = `${profile.name} — Personal website`; }, [profile.name]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try { localStorage.setItem('personal-site-theme', next ? 'dark' : 'light'); } catch { /* Storage may be disabled. */ }
  }

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="identity" href="#main" aria-label="Back to introduction"><span className="monogram" aria-hidden="true">{profile.name.split(/\s+/).filter(Boolean).map(word => word[0]).slice(0, 2).join('')}</span><span>Personal space</span></a>
      <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`} title={`Switch to ${dark ? 'light' : 'dark'} mode`}>
        <ThemeIcon dark={dark} />
      </button>
    </header>
    <main id="main" className="profile">
      <section className="introduction" aria-labelledby="intro-heading">
        <p className="eyebrow">A LITTLE CORNER OF THE INTERNET</p>
        <h1 id="intro-heading">Hi, I’m {profile.name}<span className="accent">.</span></h1>
        <p className="bio">{profile.bio}</p>
        <p className="currently"><span className="status-dot" aria-hidden="true" />{profile.current}</p>
      </section>
      <section className="work-section" aria-labelledby="work-heading">
        <SectionHeading number="01" id="work-heading">Work & a little more</SectionHeading>
        <div className="work-grid">
          <LinkCard href={profile.portfolioUrl} title="Portfolio" description="Selected work, projects & experiments." type="portfolio" />
          <LinkCard href={profile.resumeUrl} title="Resume" description="A little more about my background." type="resume" />
        </div>
      </section>
      <section className="elsewhere-section" aria-labelledby="elsewhere-heading">
        <SectionHeading number="02" id="elsewhere-heading">Elsewhere</SectionHeading>
        <div className="social-links">
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer"><span className="link-icon" aria-hidden="true">{'</>'}</span><span className="social-name">GitHub<span className="social-detail">{profile.githubLabel}</span></span><Arrow /></a>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer"><span className="link-icon linkedin-icon" aria-hidden="true">in</span><span className="social-name">LinkedIn<span className="social-detail">Let’s connect</span></span><Arrow /></a>
        </div>
      </section>
      <section className="contact-section" aria-labelledby="contact-heading">
        <SectionHeading number="03" id="contact-heading">Say hello</SectionHeading>
        <div className="contact-content"><p>Have something in mind? I’d love to hear it.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<Arrow /></a>
          {profile.secondaryEmail && <a className="email-link secondary-email" href={`mailto:${profile.secondaryEmail}`}>{profile.secondaryEmail}<Arrow /></a>}
        </div>
      </section>
    </main>
    <footer className="site-footer"><span>{profile.name}</span><span>A work in progress <span className="footer-spark" aria-hidden="true">✳</span></span></footer>
  </>;
}
