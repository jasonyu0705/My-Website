import { profile } from './profile.js';
import { projects, workExperience } from './portfolio.js';

function Skills({ items }) {
  if (!items.length) return null;
  return <ul className="skill-list" aria-label="Technologies and skills">
    {items.map(skill => <li key={skill}>{skill}</li>)}
  </ul>;
}

function Highlights({ items }) {
  if (!items.length) return null;
  return <ul className="highlights">
    {items.map(item => <li key={item}>{item}</li>)}
  </ul>;
}

export default function PortfolioPage({ themeToggle }) {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <main id="main" className="profile portfolio-page">
      <nav className="portfolio-topbar" aria-label="Page navigation">
        <a className="back-link" href="/"><span aria-hidden="true">←</span> Back home</a>
        {themeToggle}
      </nav>
      <header className="portfolio-intro">
        <p className="eyebrow">{profile.name} / Portfolio</p>
        <h1>Experience & projects<span className="accent">.</span></h1>
        <p className="bio">My work across embedded systems, software, and the hardware that brings it all together.</p>
        <nav className="portfolio-jump-links" aria-label="Portfolio sections">
          <a href="#experience">Work experience <span aria-hidden="true">↓</span></a>
          <a href="#projects">Projects <span aria-hidden="true">↓</span></a>
          <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">Resume <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="portfolio-section" aria-labelledby="experience">
        <div className="section-heading"><span className="section-number" aria-hidden="true">01</span><h2 id="experience">Work experience</h2></div>
        <div className="experience-list">
          {workExperience.map(job => <article className="experience-entry" key={job.id} aria-labelledby={`${job.id}-heading`}>
            <div className="experience-meta">
              <p className="entry-date">{job.dates}</p>
              {job.location && <p className="entry-location">{job.location}</p>}
              {job.current && <span className="current-badge"><span className="status-dot" aria-hidden="true" />Current</span>}
            </div>
            <div className="experience-detail">
              <h3 id={`${job.id}-heading`}>{job.role}</h3>
              <p className="entry-company">{job.companyUrl ? <a className="company-link" href={job.companyUrl} target="_blank" rel="noopener noreferrer">{job.company}</a> : job.company}</p>
              <Skills items={job.skills} />
              <Highlights items={job.highlights} />
              {job.projectUrl && <p className="experience-project"><a className="company-link" href={job.projectUrl} target="_blank" rel="noopener noreferrer">{job.projectLabel || 'View project'} <span aria-hidden="true">↗</span></a></p>}
            </div>
          </article>)}
        </div>
      </section>

      <section className="portfolio-section" aria-labelledby="projects">
        <div className="section-heading"><span className="section-number" aria-hidden="true">02</span><h2 id="projects">Projects</h2></div>
        <div className="project-grid">
          {projects.map((project, index) => <article className={`project-entry${index === 0 ? ' featured-project' : ''}`} key={project.id} aria-labelledby={`${project.id}-heading`}>
            <div className="project-meta"><span className="project-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><p className="entry-date">{project.dates}</p></div>
            <h3 id={`${project.id}-heading`}>{project.title}</h3>
            <Skills items={project.skills} />
            <Highlights items={project.highlights} />
          </article>)}
        </div>
      </section>

      <div className="portfolio-end">
        <a className="back-link" href="/"><span aria-hidden="true">←</span> Back home</a>
        <a className="company-link" href={`mailto:${profile.email}`}>Get in touch <span aria-hidden="true">↗</span></a>
      </div>
    </main>
  </>;
}
