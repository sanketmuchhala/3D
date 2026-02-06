import { useEffect, useRef } from 'react'
import type { OverlayId } from '../App'

const aboutData = {
  summary: "AI/ML specialist with 3+ years developing scalable solutions in generative AI, LLMs, NLP, agentic systems, and document intelligence. Deployed production systems across insurance, esports, and enterprise analytics.",
  education: [
    { degree: "M.S. Data Science", school: "Indiana University Bloomington", years: "2022–2024" },
    { degree: "B.Tech Information Technology", school: "Thakur College of Engineering, India", years: "2018–2022" },
  ],
  certs: [
    "AWS Machine Learning Engineer Associate",
    "Azure AI Fundamentals (AI-900)",
    "Databricks Generative AI Foundations",
    "Google Data Analytics Professional",
  ],
}

const experienceData = [
  {
    role: "AI Engineer",
    company: "Progressive Insurance",
    period: "May 2024 – Present",
    highlights: [
      "Built custom NLP/CV models with TensorFlow & PyTorch for claims processing",
      "BERT-based NER and sentiment analysis via Hugging Face Transformers",
      "ML pipelines with Apache Airflow & Azure Data Factory",
      "35% reduction in manual processing, 25% fraud detection improvement",
    ],
  },
  {
    role: "Research Assistant (Generative AI)",
    company: "Indiana University",
    period: "Dec 2023 – May 2024",
    highlights: [
      "GPT-4 RAG pipeline for esports video transcription (200+ hrs)",
      "18pp accuracy improvement, 40% chat latency reduction",
    ],
  },
  {
    role: "Data Analyst",
    company: "IBM",
    period: "Sep 2020 – Jun 2022",
    highlights: [
      "Churn prediction model: 20% customer attrition reduction",
      "Azure Data Lake ETL optimization, 15% processing speedup",
    ],
  },
]

const projectsData = [
  {
    name: "Project Green Lantern",
    desc: "Minimalist chat UI for cloud & local LLMs with built-in Prompt Analytics dashboard.",
    tech: ["TypeScript", "React", "Node.js", "Ollama", "IndexedDB"],
  },
  {
    name: "AI Study Buddy",
    desc: "Intelligent learning assistant with spaced repetition, adaptive recommendations, and interview coaching.",
    tech: ["React", "TypeScript", "Vite", "TailwindCSS", "AI/ML"],
  },
  {
    name: "AI Job Application Agent",
    desc: "DeepSeek AI semantic matching for automated job applications. ~$0.01-0.03 per application.",
    tech: ["Python", "DeepSeek AI", "MCP Protocol", "Claude Desktop"],
  },
  {
    name: "AI System Design Generator",
    desc: "AI-powered architecture diagrams and technical docs. 90% reduction in manual diagram creation.",
    tech: ["Python", "AI/ML", "Diagram Generation"],
  },
  {
    name: "Location-Based File Sharing",
    desc: "Serverless AWS geospatial file sharing with proximity-based access control. 99.5% accuracy.",
    tech: ["AWS Lambda", "S3", "PostGIS", "Leaflet.js"],
  },
  {
    name: "RAG Chatbot",
    desc: "Retrieval-Augmented Generation chatbot using Deepseek for intelligent document Q&A.",
    tech: ["Python", "DeepSeek", "RAG", "Vector DB"],
  },
]

const skillsData: Record<string, string[]> = {
  "AI / ML": ["Generative AI", "LLMs", "NLP", "RAG Systems", "Agentic AI", "Deep Learning", "Computer Vision", "BERT", "GPT-4"],
  "Frameworks": ["TensorFlow", "PyTorch", "LangChain", "Hugging Face", "FastAPI", "Scikit-learn", "SpaCy", "MLflow"],
  "Cloud & Data": ["AWS", "Azure", "PySpark", "Apache Airflow", "Docker", "Kubernetes", "FAISS"],
  "Languages": ["Python", "SQL", "R", "JavaScript", "TypeScript"],
  "Visualization": ["Tableau", "Power BI", "R Shiny"],
}

const contactData = {
  email: "sanketmuchhala1@gmail.com",
  github: "https://github.com/sanketmuchhala",
  linkedin: "https://linkedin.com/in/sanketmuchhala",
  website: "https://sanketmuchhala.github.io",
  leetcode: "https://leetcode.com/sanketmuchhala",
}

function AboutPanel() {
  return (
    <div className="panel-content">
      <p className="panel-summary">{aboutData.summary}</p>
      <div className="panel-grid two-col">
        <div>
          <h3>Education</h3>
          <ul className="tag-list">
            {aboutData.education.map((e, i) => (
              <li key={i}><strong>{e.degree}</strong><br/><span style={{opacity:0.6,fontSize:'12px'}}>{e.school} ({e.years})</span></li>
            ))}
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

function ExperiencePanel() {
  return (
    <div className="panel-content">
      <div className="experience-list">
        {experienceData.map((exp, i) => (
          <div key={i} className="experience-item">
            <div className="exp-header">
              <h3 style={{fontSize:'14px',fontWeight:600,color:'#f0ebe3',textTransform:'none',letterSpacing:'-0.01em'}}>{exp.role}</h3>
              <span style={{fontSize:'12px',opacity:0.5}}>{exp.period}</span>
            </div>
            <p style={{fontSize:'13px',opacity:0.6,marginBottom:'8px'}}>{exp.company}</p>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'4px'}}>
              {exp.highlights.map((h, j) => (
                <li key={j} style={{fontSize:'12px',color:'rgba(245,240,235,0.65)',paddingLeft:'12px',position:'relative'}}>
                  <span style={{position:'absolute',left:0,opacity:0.3}}>-</span>{h}
                </li>
              ))}
            </ul>
          </div>
        ))}
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
      <p className="panel-summary">Let's build something together. Reach out through any channel below.</p>
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
          <span>Portfolio</span>
        </a>
        <a href={contactData.leetcode} target="_blank" rel="noopener noreferrer" className="contact-link">
          <span className="contact-icon">LC</span>
          <span>LeetCode</span>
        </a>
      </div>
    </div>
  )
}

const panels: Record<string, { title: string; Component: () => JSX.Element }> = {
  about: { title: 'About Me', Component: AboutPanel },
  experience: { title: 'Experience', Component: ExperiencePanel },
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
  const panel = panels[activeId]
  if (!panel) return null
  const { title, Component } = panel

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
