import React from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, Github, Mail, Sparkles } from "lucide-react";
import "./styles.css";

const projects = [
  {
    title: "Anna",
    description: "Personal tooling, experiments, and product ideas in motion.",
    tag: "Workspace",
  },
  {
    title: "Field Notes",
    description: "Short writing on software, systems, and things worth keeping.",
    tag: "Writing",
  },
  {
    title: "Lab",
    description: "Small interactive features as the site grows.",
    tag: "Experiments",
  },
];

function App() {
  return (
    <main className="site-shell">
      <header className="topbar" aria-label="Primary navigation">
        <a className="brand" href="/">
          Nick Woods
        </a>
        <nav>
          <a href="#work">Work</a>
          <a href="#notes">Notes</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="intro-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            Personal site, projects, and experiments
          </p>
          <h1 id="intro-title">Nick Woods</h1>
          <p className="lede">
            Building a compact home for work, writing, prototypes, and whatever
            useful things this turns into next.
          </p>
          <div className="actions" aria-label="Primary links">
            <a className="button primary" href="#work">
              Explore work
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="button secondary" href="https://github.com/nickwoods1">
              <Github size={18} aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>

        <div className="signal-panel" aria-hidden="true">
          <div className="terminal-bar">
            <span />
            <span />
            <span />
          </div>
          <pre>{`~/repos/nickwoods1.github.io
> npm run dev
> ship small, iterate often`}</pre>
        </div>
      </section>

      <section className="section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">Work</p>
          <h2 id="work-title">Starting points</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <span>{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section" id="notes" aria-labelledby="notes-title">
        <div>
          <p className="eyebrow">Notes</p>
          <h2 id="notes-title">A quiet place to collect thoughts.</h2>
        </div>
        <p>
          This section is intentionally simple for now. It can become a blog,
          changelog, reading list, project journal, or something stranger as the
          site grows.
        </p>
      </section>

      <footer className="footer" id="contact">
        <span>Nick Woods</span>
        <a href="mailto:nickw9000@gmail.com">
          <Mail size={16} aria-hidden="true" />
          Email
        </a>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
