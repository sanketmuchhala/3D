const portfolioData = {
    personal: {
        name: "Sanket Muchhala",
        title: "AI/ML Engineer",
        summary: "AI/ML Engineer with 3+ years of experience specializing in generative AI, LLMs, and NLP. Expert in agentic systems, document intelligence workflows, ML pipelines with focus on automation and data-backed insights across insurance, esports, enterprise analytics.",
        email: "sanket.muchhala@example.com",
        github: "https://github.com/sanketmuchhala",
        linkedin: "https://linkedin.com/in/sanketmuchhala",
        website: "https://sanketmuchhala.github.io"
    },

    projects: [
        {
            id: "ai-learning-assistant",
            name: "AI Learning Assistant",
            description: "Intelligent study scheduler with adaptive learning and interview prep capabilities. Uses advanced algorithms to personalize learning paths and optimize study sessions.",
            tech: ["Python", "NLP", "Machine Learning", "TensorFlow", "FastAPI"],
            github: "#",
            demo: "#",
            details: "Built an AI-powered learning assistant that adapts to individual learning patterns and schedules study sessions for maximum retention. Features include spaced repetition, difficulty adjustment, and interview preparation modules.",
            impact: "Improved study efficiency by 40% for beta users"
        },
        {
            id: "job-automation-tool",
            name: "Job Application Automation Tool",
            description: "DeepSeek AI-powered semantic matching system for automated job applications with cost-effective token usage.",
            tech: ["DeepSeek API", "Python", "Automation", "Web Scraping", "NLP"],
            cost: "$0.14 per 1M tokens",
            github: "#",
            demo: "#",
            details: "Developed an intelligent job application system that uses semantic matching to identify relevant opportunities and automatically customize applications. Leverages DeepSeek's cost-effective API for high-volume processing.",
            impact: "Reduced job application time by 80% while maintaining personalization"
        },
        {
            id: "aws-geospatial",
            name: "AWS Serverless Geospatial Solution",
            description: "Serverless architecture using S3/Lambda with OpenStreetMap integration, achieving 99% uptime for geospatial data processing.",
            tech: ["AWS Lambda", "S3", "OpenStreetMap", "JavaScript", "API Gateway"],
            github: "#",
            demo: "#",
            details: "Built a scalable geospatial data processing pipeline using AWS serverless architecture. Processes location data, performs spatial analysis, and provides real-time mapping services.",
            impact: "99% uptime, processing 10M+ geospatial queries monthly"
        },
        {
            id: "ai-brain-blog",
            name: "AI vs Human Brain Analysis",
            description: "Comprehensive analysis and blog series exploring the fundamental differences between artificial intelligence and human cognition.",
            tech: ["Research", "Technical Writing", "Data Visualization", "Cognitive Science"],
            github: "#",
            demo: "#",
            details: "Deep dive research into AI cognition differences, exploring neural networks vs biological neurons, learning mechanisms, and consciousness implications.",
            impact: "10K+ readers, featured in AI research communities"
        }
    ],

    skills: {
        ai_ml: [
            "Generative AI",
            "Large Language Models (LLMs)",
            "Natural Language Processing",
            "Document Intelligence",
            "Agentic Systems",
            "Machine Learning Pipelines",
            "Deep Learning",
            "Computer Vision"
        ],
        cloud_tech: [
            "Amazon Web Services (AWS)",
            "Microsoft Azure",
            "Serverless Architecture",
            "Lambda Functions",
            "API Gateway",
            "S3 Storage",
            "CloudFormation"
        ],
        programming: [
            "Python",
            "JavaScript",
            "TensorFlow",
            "PyTorch",
            "FastAPI",
            "React",
            "Node.js",
            "SQL"
        ],
        specialties: [
            "Automation Systems",
            "Data Analytics",
            "ML Model Deployment",
            "ETL Pipelines",
            "API Development",
            "System Architecture"
        ]
    },

    experience: {
        years: "3+",
        industries: [
            "Insurance Technology",
            "Esports Analytics",
            "Enterprise Analytics",
            "Financial Services"
        ],
        specializations: [
            "Generative AI Implementation",
            "Document Processing Workflows",
            "Automated Decision Systems",
            "Scalable ML Infrastructure"
        ]
    },

    certifications: [
        {
            name: "AWS Machine Learning Specialty",
            provider: "Amazon Web Services",
            year: "2024",
            credential: "AWS-MLS-2024"
        },
        {
            name: "Microsoft Azure AI Fundamentals",
            provider: "Microsoft",
            year: "2024",
            credential: "AZ-900-AI"
        },
        {
            name: "Google Data Analytics Professional",
            provider: "Google",
            year: "2023",
            credential: "GDA-PRO-2023"
        },
        {
            name: "Generative AI with Large Language Models",
            provider: "DeepLearning.AI",
            year: "2024",
            credential: "GAILLM-2024"
        }
    ],

    interests: [
        {
            category: "Photography",
            description: "Landscape and street photography with focus on urban architecture and natural lighting",
            images: [
                "city-skyline.jpg",
                "mountain-vista.jpg",
                "street-scene.jpg",
                "architecture-detail.jpg"
            ]
        },
        {
            category: "AI Research",
            description: "Stay current with latest developments in artificial intelligence, contribute to open-source projects",
            projects: ["Contributing to Hugging Face transformers", "AI ethics research"]
        },
        {
            category: "Technology",
            description: "Building scalable solutions, exploring emerging tech trends, hardware tinkering",
            activities: ["Arduino projects", "Home automation", "3D printing"]
        }
    ],

    testimonials: [
        {
            author: "Sarah Chen",
            role: "Senior Data Scientist",
            company: "TechCorp",
            text: "Sanket's expertise in ML pipeline automation saved our team countless hours and improved model deployment efficiency by 60%."
        },
        {
            author: "Michael Rodriguez",
            role: "CTO",
            company: "InsureTech Solutions",
            text: "His innovative approach to document intelligence transformed our claims processing workflow. Exceptional problem-solving skills."
        }
    ]
};

const modalTemplates = {
    projects: (projects) => `
        <div class="modal-header">
            <h2>Featured Projects</h2>
            <p>AI/ML Engineering Portfolio</p>
        </div>
        <div class="projects-grid">
            ${projects.map(project => `
                <div class="project-card">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="tech-tags">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <p class="project-details">${project.details}</p>
                    ${project.impact ? `<p class="project-impact"><strong>Impact:</strong> ${project.impact}</p>` : ''}
                    ${project.cost ? `<p class="project-cost"><strong>Cost Efficiency:</strong> ${project.cost}</p>` : ''}
                    <div class="project-links">
                        <a href="${project.github}" class="project-link" target="_blank">GitHub</a>
                        <a href="${project.demo}" class="project-link" target="_blank">Demo</a>
                    </div>
                </div>
            `).join('')}
        </div>
    `,

    skills: (skills) => `
        <div class="modal-header">
            <h2>Technical Skills</h2>
            <p>AI/ML Engineering Expertise</p>
        </div>
        <div class="skills-section">
            <div class="skills-category">
                <h4>AI & Machine Learning</h4>
                <div class="skills-list">
                    ${skills.ai_ml.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="skills-category">
                <h4>Cloud & Infrastructure</h4>
                <div class="skills-list">
                    ${skills.cloud_tech.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="skills-category">
                <h4>Programming & Frameworks</h4>
                <div class="skills-list">
                    ${skills.programming.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="skills-category">
                <h4>Specializations</h4>
                <div class="skills-list">
                    ${skills.specialties.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                </div>
            </div>
        </div>
    `,

    certifications: (certs) => `
        <div class="modal-header">
            <h2>Certifications & Credentials</h2>
            <p>Professional Development & Recognition</p>
        </div>
        <ul class="certifications-list">
            ${certs.map(cert => `
                <li>
                    <strong>${cert.name}</strong><br>
                    ${cert.provider} • ${cert.year}<br>
                    <small>Credential ID: ${cert.credential}</small>
                </li>
            `).join('')}
        </ul>
    `,

    about: (personal) => `
        <div class="modal-header">
            <h2>About ${personal.name}</h2>
            <p>${personal.title}</p>
        </div>
        <p style="line-height: 1.6; margin-bottom: 2rem; color: rgba(255,255,255,0.9);">
            ${personal.summary}
        </p>
        <div class="contact-info">
            <div class="contact-links">
                <a href="mailto:${personal.email}" class="contact-link">📧 Email</a>
                <a href="${personal.github}" class="contact-link" target="_blank">💻 GitHub</a>
                <a href="${personal.linkedin}" class="contact-link" target="_blank">🔗 LinkedIn</a>
                <a href="${personal.website}" class="contact-link" target="_blank">🌐 Website</a>
            </div>
        </div>
    `,

    photography: (interests) => {
        const photoInterest = interests.find(i => i.category === 'Photography');
        return `
            <div class="modal-header">
                <h2>Photography Portfolio</h2>
                <p>Capturing moments through technology and art</p>
            </div>
            <p style="line-height: 1.6; margin-bottom: 2rem; color: rgba(255,255,255,0.9);">
                ${photoInterest.description}
            </p>
            <div class="photo-gallery">
                ${photoInterest.images.map(img => `
                    <img src="./assets/images/${img}" alt="Photography sample" class="gallery-image">
                `).join('')}
            </div>
        `;
    },

    resume: () => `
        <div class="modal-header">
            <h2>Resume & CV</h2>
            <p>Professional Experience & Qualifications</p>
        </div>
        <div style="text-align: center; padding: 2rem;">
            <p style="margin-bottom: 2rem; color: rgba(255,255,255,0.9);">
                Download my complete resume with detailed experience, projects, and technical skills.
            </p>
            <a href="./assets/Sanket_Muchhala_Resume.pdf" class="project-link" download style="display: inline-block; margin: 1rem;">
                📄 Download Resume (PDF)
            </a>
            <a href="${portfolioData.personal.linkedin}" class="project-link" target="_blank" style="display: inline-block; margin: 1rem;">
                🔗 View LinkedIn Profile
            </a>
        </div>
    `
};