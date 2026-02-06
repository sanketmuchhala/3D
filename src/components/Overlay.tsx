import { useEffect, useRef } from 'react'
import type { OverlayId } from '../App'

/* ── Portfolio Data ───────────────────────────────── */

const aboutData = {
  summary: "AI/ML Engineer with 3+ years of experience specializing in generative AI, LLMs, and NLP. I build agentic systems, document intelligence workflows, and ML pipelines — with a focus on automation and data-backed insights across insurance, esports, and enterprise analytics.",
  highlights: [
    "Generative AI & LLM specialist",
    "Cloud architecture (AWS / Azure)",
    "Full-stack ML pipeline development",
    "Automation-first engineering mindset",
  ],
  certs: [
    "AWS Machine Learning Specialty",
    "Microsoft Azure AI Fundamentals",
    "Google Data Analytics Professional",
    "Generative AI with LLMs (DeepLearning.AI)",
  ]
}

const projectsData = [
  {
    name: "AI Learning Assistant",
    desc: "Intelligent study scheduler with adaptive learning and interview prep capabilities. Improved study efficiency by 40% for beta users.",
    tech: ["Python", "NLP", "TensorFlow", "FastAPI"],
  },
  {
    name: "Job Application Automation",
    desc: "DeepSeek AI-powered semantic matching system. Reduced application time by 80% at $0.14/1M tokens.",
    tech: ["DeepSeek API", "Python", "NLP", "Automation"],
  },
  {
    name: "AWS Serverless Geospatial",
    desc: "Scalable geospatial pipeline with S3/Lambda and OpenStreetMap integration. 99% uptime, 10M+ queries/month.",
    tech: ["AWS Lambda", "S3", "OpenStreetMap", "API Gateway"],
  },
  {
    name: "AI vs Human Brain Analysis",
    desc: "Deep-dive research into AI cognition differences. 10K+ readers, featured in AI research communities.",
    tech: ["Research", "Technical Writing", "Data Viz"],
  },
]

const skillsData: Record<string, string[]> = {
  "AI / ML": ["Generative AI", "LLMs", "NLP", "Document Intelligence", "Agentic Systems", "Deep Learning", "Computer Vision"],
  "Cloud": ["AWS", "Azure", "Serverless", "Lambda", "API Gateway", "S3", "CloudFormation"],
  "Languages & Frameworks": ["Python", "JavaScript", "TensorFlow", "PyTorch", "FastAPI", "React", "Node.js", "SQL"],
  "Specialties": ["Automation", "Data Analytics", "ML Deployment", "ETL Pipelines", "API Development", "System Architecture"],
}

const contactData = {
  email: "sanket.muchhala@example.com",
  github: "https://github.com/sanketmuchhala",
  linkedin: "https://linkedin.com/in/sanketmuchhala",
  website: "https://sanketmuchhala.github.io",
}

/* ── Panel Components ───────────────────────────────── */

function AboutPanel() {
  return (
    <div className="panel-content">
      <p className="panel-summary">{aboutData.summary}</p>
      <div className="panel-grid two-col">
        <div>
          <h3>Highlights</h3>
          <ul className="tag-list">
            {aboutData.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>
        <div>
          <h3>Certifications</h3>
          <ul className="tag-list muted">
            {aboutData.certs.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

function ProjectsPanel() {
  return (
    <div className="panel-content">
      <div className="projects-grid">
        {projectsData.map((p, i) => (
          <div key={i} className="project-card">
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <div className="tech-tags">
              {p.tech.map((t, j) => <span key={j} className="tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SkillsPanel() {
  return (
    <div className="panel-content">
      <div className="skills-categories">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div key={category} className="skill-category">
            <h3>{category}</h3>
            <div className="tech-tags">
              {skills.map((s, i) => <span key={i} className="tag">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactPanel() {
  return (
    <div className="panel-content contact-panel">
      <p className="panel-summary">Let's build something together. Reach out through any of the channels below.</p>
      <div className="contact-links">
        <a href={`mailto:${contactData.email}`} className="contact-link">
          <span className="contact-icon">@</span>
          <span>{contactData.email}</span>
        </a>
        <a href={contactData.github} target="_blank" rel="noopener noreferrer" className="contact-link">
          <span className="contact-icon">GH</span>
          <span>GitHub</span>
        </a>
        <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
          <span className="contact-icon">in</span>
          <span>LinkedIn</span>
        </a>
        <a href={contactData.website} target="_blank" rel="noopener noreferrer" className="contact-link">
          <span className="contact-icon">W</span>
          <span>Website</span>
        </a>
      </div>
    </div>
  )
}

/* ── Overlay Container ───────────────────────────── */

const panels: Record<string, { title: string; Component: () => JSX.Element }> = {
  about: { title: 'About Me', Component: AboutPanel },
  projects: { title: 'Projects', Component: ProjectsPanel },
  skills: { title: 'Skills & Tech', Component: SkillsPanel },
  contact: { title: 'Get In Touch', Component: ContactPanel },
}

export default function Overlay({ activeId, onClose }: { activeId: OverlayId; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (activeId) {
      window.addEventListener('keydown', handleKey)
      return () => window.removeEventListener('keydown', handleKey)
    }
  }, [activeId, onClose])

  if (!activeId) return null
  const { title, Component } = panels[activeId]

  return (
    <>
      <div className="overlay-backdrop" onClick={onClose} />
      <div className="overlay-panel" ref={panelRef}>
        <div className="overlay-header">
          <h2>{title}</h2>
          <button className="overlay-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <Component />
      </div>
    </>
  )
}
