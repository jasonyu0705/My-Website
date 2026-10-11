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

function HighlightLink({ href, children, external = true }) {
  return <a className="highlight" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>;
}

function Row({ label, className = '', children }) {
  return <section className={`profile-row ${className}`} aria-label={label}>
    <h2>{label}</h2>
    <div className="row-content">{children}</div>
  </section>;
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
      <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`} title={`Switch to ${dark ? 'light' : 'dark'} mode`}>
        <ThemeIcon dark={dark} />
      </button>
    </header>
    <main id="main" className="profile">
      <Row label="Intro" className="intro-row">
        <h1>Hey, I’m {profile.name}.</h1>
        <p>{profile.bio}</p>
        <p>{profile.current}{' '}<HighlightLink href={profile.portfolioUrl}>{profile.currentLabel}</HighlightLink></p>
      </Row>
      <Row label="Resume"><HighlightLink href={profile.resumeUrl}>Resume <span className="arrow" aria-hidden="true">↗</span></HighlightLink></Row>
      <Row label="Portfolio"><HighlightLink href={profile.portfolioUrl}>Selected work <span className="arrow" aria-hidden="true">↗</span></HighlightLink></Row>
      <Row label="GitHub"><HighlightLink href={profile.githubUrl}>{profile.githubLabel} <span className="arrow" aria-hidden="true">↗</span></HighlightLink></Row>
      <Row label="Contact" className="contact-row">
        <p><HighlightLink href={profile.linkedinUrl}>LinkedIn <span className="arrow" aria-hidden="true">↗</span></HighlightLink></p>
        <p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}</a></p>
        {profile.secondaryEmail && <p><a className="email-link" href={`mailto:${profile.secondaryEmail}`}>{profile.secondaryEmail}</a></p>}
      </Row>
    </main>
    <footer className="site-footer" aria-label="End of page">
      <svg width="34" height="26" viewBox="0 0 34 26" fill="none" aria-hidden="true">
        <path d="M13 3h18v20H13" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="13" cy="13" r="10" stroke="currentColor" strokeWidth="1.7" />
        <path d="M13 3v20" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    </footer>
  </>;
}
